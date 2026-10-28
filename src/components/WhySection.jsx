
import { motion } from "framer-motion";

/* =========================================================
   WHY THESE BOOKS — CONTENT
========================================================= */

const points = [
  {
    number: "01",
    title: "Think better",
    text: "Learn ideas that help you understand people, decisions and opportunities more clearly.",
    theme: "cream",
    bookStyle: "warm",
  },
  {
    number: "02",
    title: "Act faster",
    text: "Turn useful knowledge into practical actions instead of leaving it inside a finished book.",
    theme: "blue",
    bookStyle: "cool",
  },
  {
    number: "03",
    title: "Keep revisiting",
    text: "Short, practical lessons make it easy to return to the ideas whenever you need them.",
    theme: "green",
    bookStyle: "sage",
  },
  {
    number: "04",
    title: "Grow every day",
    text: "Simple and actionable insights to build confidence, focus, discipline and a better you.",
    theme: "pink",
    bookStyle: "rose",
  },
];

/* =========================================================
   PLACEHOLDER BOOK
========================================================= */

function BookPlaceholder({ bookStyle }) {
  return (
    <div className={`why-book-scene why-book-${bookStyle}`} aria-hidden="true">
      <div className="why-book-orbit" />

      <div className="why-book-stack">
        <div className="why-book-back" />
        <div className="why-book-cover">
          <span>LEARN</span>
          <span>&</span>
          <span>COMMUNICATE</span>
          <i />
        </div>
        <div className="why-book-pages" />
      </div>

      <div className="why-book-shadow" />
    </div>
  );
}

/* =========================================================
   WHY SECTION
========================================================= */

function WhySection() {
  return (
    <section className="why section" id="why-these-books">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="eyebrow">WHY THESE BOOKS</p>

        <h2>
          Knowledge is useful
          <br />
          when you <span className="why-heading-accent">use it.</span>
        </h2>
      </motion.div>

      <div className="why-grid">
        {points.map((item, index) => (
          <motion.article
            className={`why-card why-card-${item.theme}`}
            key={item.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: "easeOut",
            }}
          >
            <div className="why-card-copy">
              <span className="why-number">{item.number}</span>
              <span className="why-number-line" />

              <h3>{item.title}</h3>
              <p>{item.text}</p>

              <a className="why-learn-more" href="#books">
                LEARN MORE <span aria-hidden="true">→</span>
              </a>
            </div>

            <BookPlaceholder bookStyle={item.bookStyle} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default WhySection;
