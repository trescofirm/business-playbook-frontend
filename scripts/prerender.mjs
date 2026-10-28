// =========================================================
// scripts/prerender.mjs  (v2 — works WITH the existing backend app.js)
//
// Runs AFTER `vite build`. Your backend (app.js) already injects the
// <title>, meta tags, canonical and Product/Breadcrumb JSON-LD for each
// route. What it does NOT do is put any page text into the HTML, so Google's
// first crawl sees an empty <div id="root">.
//
// This script writes dist/seo-snapshots.json:
//
//   "/books/unlock-focus": {
//      title, description, productDescription,   // from src/data (single source of truth)
//      body                                       // static HTML for #root (H1, text, FAQs, links)
//   }
//
// app.js reads that file and injects `body` into <div id="root"> (React replaces
// it as soon as the app loads) and uses title/description/productDescription so
// the backend never drifts from the frontend copy.
// =========================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { books } from "../src/data/content.js";
import { guides } from "../src/data/guides.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (items = []) =>
  items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";

const paras = (arr = []) => arr.map((p) => `<p>${esc(p)}</p>`).join("");

const nav = `<nav aria-label="Main"><a href="/">Home</a> · <a href="/books">Books</a> · <a href="/guides">Guides</a></nav>`;

const bookBody = (book) => {
  const sc = book.seoContent || {};
  return [
    nav,
    "<main>",
    "<p>Business Playbook</p>",
    `<h1>${esc(book.title)}</h1>`,
    book.subtitle ? `<p>${esc(book.subtitle)}</p>` : "",
    sc.intro ? `<p>${esc(sc.intro)}</p>` : "",
    `<p>${esc(book.description)}</p>`,
    book.author ? `<p>By ${esc(book.author)}</p>` : "",
    `<p>Price: $${Number(book.price).toFixed(2)} · Digital PDF · Instant delivery</p>`,
    `<h2>About This Book</h2><p>${esc(book.about)}</p>`,
    sc.problem ? `<h2>${esc(sc.problem.heading)}</h2>${paras(sc.problem.paragraphs)}` : "",
    book.learn ? `<h2>What You’ll Learn in ${esc(book.title)}</h2>${list(book.learn)}` : "",
    book.audience ? `<h2>Who Is ${esc(book.title)} For?</h2>${list(book.audience)}` : "",
    book.included ? `<h2>What’s Inside ${esc(book.title)}</h2>${list(book.included)}` : "",
    sc.outcome ? `<h2>${esc(sc.outcome.heading)}</h2>${paras(sc.outcome.paragraphs)}` : "",
    book.extraSection
      ? `<h2>${esc(book.extraSection.title)}</h2><p>${esc(book.extraSection.intro)}</p>${book.extraSection.items
          .map((i) => `<h3>${esc(i.title)}</h3><p>${esc(i.description)}</p>`)
          .join("")}`
      : "",
    book.faqs?.length
      ? `<h2>Questions About ${esc(book.title)}</h2>${book.faqs
          .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
          .join("")}`
      : "",
    book.relatedGuides?.length
      ? `<h2>Continue Learning</h2><ul>${book.relatedGuides
          .map((g) => `<li><a href="/guides/${esc(g.slug)}">${esc(g.title)}</a></li>`)
          .join("")}</ul>`
      : "",
    `<h2>More Books</h2><ul>${books
      .filter((b) => b.id !== book.id)
      .map((b) => `<li><a href="/books/${esc(b.id)}">${esc(b.title)}</a></li>`)
      .join("")}</ul>`,
    "</main>",
  ].join("\n");
};

const snapshots = {};

for (const book of books) {
  snapshots[`/books/${book.id}`] = {
    title: book.seo?.title,
    description: book.seo?.description,
    productDescription: book.description,
    body: bookBody(book),
  };
}

const bookLinks = books
  .map((b) => `<li><a href="/books/${esc(b.id)}">${esc(b.title)}</a> — ${esc(b.description)}</li>`)
  .join("");

snapshots["/"] = {
  body: `${nav}<main><h1>Books and Workbooks for Focus, Confidence &amp; Personal Growth</h1><p>Business Playbook publishes practical digital books and guides on concentration, dopamine detox, social confidence and better habits.</p><ul>${bookLinks}</ul></main>`,
};

snapshots["/books"] = {
  body: `${nav}<main><h1>Business Playbook eBooks</h1><p>Practical digital books and workbooks on focus, concentration, confidence and personal growth.</p><ul>${bookLinks}</ul></main>`,
};

snapshots["/guides"] = {
  body: `${nav}<main><h1>Guides on Focus, Confidence &amp; Habits</h1><ul>${guides
    .map((g) => `<li><a href="/guides/${esc(g.slug)}">${esc(g.title)}</a> — ${esc(g.description)}</li>`)
    .join("")}</ul></main>`,
};

for (const g of guides) {
  const related = books.find((b) => b.id === g.relatedBook);
  snapshots[`/guides/${g.slug}`] = {
    body: `${nav}<main><h1>${esc(g.title)}</h1><p>${esc(g.description)}</p>${
      related
        ? `<p>Related book: <a href="/books/${esc(related.id)}">${esc(related.title)}</a></p>`
        : ""
    }</main>`,
  };
}

fs.writeFileSync(path.join(DIST, "seo-snapshots.json"), JSON.stringify(snapshots));
console.log(`seo-snapshots.json written with ${Object.keys(snapshots).length} routes`);
