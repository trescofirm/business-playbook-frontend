import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, ShieldCheck, RotateCcw, TabletSmartphone, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/books-hero.css";

import OptimizedImage from "../components/OptimizedImage";

const formatPrice = (price) =>
  Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/** Full-width Books page hero using the approved still-life background. */
export default function BooksHero({ books = [], onAddToCart }) {
  const featuredBooks = useMemo(
    () => books.filter((book) => book && book.images?.cover).slice(0, 3),
    [books]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBook = featuredBooks[activeIndex];

  if (!activeBook) return null;

  const nextBook = () => setActiveIndex((index) => (index + 1) % featuredBooks.length);
  const previousBook = () => setActiveIndex((index) => (index - 1 + featuredBooks.length) % featuredBooks.length);

  return (
    <section className="books-hero" aria-labelledby="books-hero-title">
      <div className="books-hero-background" aria-hidden="true" />
      <div className="books-hero-wash" aria-hidden="true" />

      <div className="books-hero-content">
        <div className="books-hero-copy">
          <p className="books-hero-eyebrow">NEW COLLECTION</p>
          <h1 id="books-hero-title">
            Books that
            <br />
            Inspire a
            <br />
            <em>Better You.</em>
          </h1>
          <p className="books-hero-description">
            Explore practical digital books to improve focus, build better habits, and create a more meaningful life.
          </p>
          <a className="books-hero-explore" href="#all-books-heading">
            Explore Books <ArrowRight size={21} aria-hidden="true" />
          </a>

          <div className="books-hero-benefits" aria-label="Shopping benefits">
            <div className="books-hero-benefit">
              <span className="books-hero-benefit-icon"><BookOpen size={25} /></span>
              <strong>Instant Access</strong>
              <span>Get your book immediately after payment.</span>
            </div>
            <div className="books-hero-benefit">
              <span className="books-hero-benefit-icon"><ShieldCheck size={25} /></span>
              <strong>Secure Payment</strong>
              <span>Encrypted and safe checkout.</span>
            </div>
            <div className="books-hero-benefit">
              <span className="books-hero-benefit-icon"><TabletSmartphone size={25} /></span>
              <strong>Read Anywhere</strong>
              <span>Works on phone, tablet and computer.</span>
            </div>
          </div>
        </div>

        <article className="books-hero-product" aria-live="polite">
          <button className="books-hero-product-heart" type="button" aria-label="Featured book" tabIndex={-1}>
            <Heart size={27} aria-hidden="true" />
          </button>
          <Link
            to={`/books/${activeBook.id}`}
            className="books-hero-product-cover-link"
            aria-label={`View ${activeBook.title}`}
          >
            
          <OptimizedImage
            className="books-hero-product-cover"
            src={activeBook.images.cover}
            alt={`${activeBook.title} book cover`}
            width={240}
            height={340}
            sizes="(max-width: 600px) 45vw, 240px"
            loading="eager"
            fetchPriority="high"
          />

          </Link>
          <div className="books-hero-product-info">
            <h2><Link to={`/books/${activeBook.id}`}>{activeBook.title}</Link></h2>
            {activeBook.author && <p className="books-hero-product-author">{activeBook.author}</p>}
            <p className="books-hero-product-format">Digital book · Instant access</p>
            <p className="books-hero-product-price">
              {activeBook.price != null ? formatPrice(activeBook.price) : "Price coming soon"}
            </p>
            <button
              type="button"
              className="books-hero-add-button"
              onClick={() => onAddToCart?.(activeBook)}
              disabled={!activeBook.available || activeBook.price == null}
            >
              <span>{activeBook.available && activeBook.price != null ? "Add to Cart" : "Coming Soon"}</span>
              <ShoppingBag size={19} aria-hidden="true" />
            </button>
          </div>
          {featuredBooks.length > 1 && (
            <div className="books-hero-carousel-controls" aria-label="Featured books carousel">
              <button type="button" onClick={previousBook} className="books-hero-arrow" aria-label="Previous featured book">‹</button>
              <div className="books-hero-dots">
                {featuredBooks.map((book, index) => (
                  <button
                    key={book.id}
                    type="button"
                    className={`books-hero-dot${index === activeIndex ? " is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${book.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
              <button type="button" onClick={nextBook} className="books-hero-arrow" aria-label="Next featured book">›</button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
