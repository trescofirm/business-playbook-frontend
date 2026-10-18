import {
  Check,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { trackAddToCart } from "../utils/analytics";


import { useCart } from "../context/CartContext";
import { books } from "../data/content";

import { Link } from "react-router-dom";
/* =========================================================
   PRICE FORMATTER
========================================================= */

const formatPrice = (price) => {
  return Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/* =========================================================
   PRICING
========================================================= */

function Pricing() {
  const { addToCart } = useCart();

  /* =======================================================
     ADD ONE BOOK
  ======================================================= */

  const handleAddToCart = (book) => {
    if (!book.available || book.price === null) {
      return;
    }

    addToCart({
      id: book.id,

      title: book.title,

      price: book.price,

      oldPrice: book.oldPrice,

      image: book.images?.cover || null,

      description: book.description,
    });

    trackAddToCart(book);

    /* Open cart drawer */

    window.dispatchEvent(
      new Event("cart:open")
    );
  };

  return (
    <section
      id="pricing"
      className="pricing section"
    >
      {/* =================================================
          SECTION HEADING
      ================================================= */}

      <div className="section-heading centered">

        <p className="eyebrow">
          OUR BOOKS
        </p>

        <h2>
          Choose your
          <br />
          <i>next read.</i>
        </h2>

        <p>
          Practical books designed to help you
          build better focus, discipline, confidence
          and mindset.
        </p>

      </div>

      {/* =================================================
          BOOK GRID
      ================================================= */}

      <div className="pricing-grid">

        {books.slice(0, 3).map(
          (book, index) => (

            <article
              className={`price-card ${
                index === 0
                  ? "featured"
                  : ""
              }`}
              key={book.id}
            >

              {/* =========================================
                  FEATURED LABEL
              ========================================= */}

              {index === 0 && (

                <div className="featured-label">
                  FEATURED
                </div>

              )}

              {/* =========================================
                    BOOK COVER
                ========================================= */}

                <div className="price-book-image">
                  <Link
                    to={`/books/${book.id}`}
                    aria-label={`View ${book.title}`}
                  >
                    <img
                      src={ index === 0 ? book.images?.cover : book.images?.mockup }
                      alt={ index === 0 ? `${book.title} book cover` : `${book.title} book mockup` }
                      width="280"
                      height="394"
                      loading="lazy"
                    />
                  </Link>
                </div>

              {/* =========================================
                  BOOK TYPE + CATEGORY
              ========================================= */}

              <div className="price-meta">

                <span className="price-tag">
                  {book.type}
                </span>

                <span className="price-category">
                  {book.category}
                </span>

              </div>

              {/* =========================================
                  BOOK TITLE
              ========================================= */}

              <h3>
                <Link
                  to={`/books/${book.id}`}
                  className="book-card-title-link"
                >
                  {book.title}
                </Link>
              </h3>

              {/* =========================================
                  SUBTITLE
              ========================================= */}

              {book.subtitle && (

                <p className="price-subtitle">
                  {book.subtitle}
                </p>

              )}

              {/* =========================================
                  AUTHOR
              ========================================= */}

              {book.author && (

                <p className="price-author">
                  By {book.author}
                </p>

              )}

              {/* =========================================
                  DESCRIPTION
              ========================================= */}

              <p className="price-description">
                {book.description}
              </p>

              {/* =========================================
                  FEATURES
              ========================================= */}

              <ul>

                <li>
                  <Check size={17} />

                  <span>
                    Digital access
                  </span>
                </li>

                <li>
                  <Check size={17} />

                  <span>
                    Instant delivery
                  </span>
                </li>

                <li>
                  <Check size={17} />

                  <span>
                    Phone, tablet & computer
                  </span>
                </li>

                <li>
                  <Check size={17} />

                  <span>
                    One-time purchase
                  </span>
                </li>

              </ul>

              {/* =========================================
                  PRICE
              ========================================= */}

              <div className="price">

                {book.price !== null ? (

                  <>

                    <span className="current-price">
                      $
                      {formatPrice(
                        book.price
                      )}
                    </span>

                    {book.oldPrice && (

                      <del>
                        $
                        {formatPrice(
                          book.oldPrice
                        )}
                      </del>

                    )}

                  </>

                ) : (

                  <span className="price-coming">
                    Price coming soon
                  </span>

                )}

              </div>

              {/* =========================================
                  ADD TO CART
              ========================================= */}

              <button
                className={`button full ${
                  index === 0
                    ? "light"
                    : "dark"
                }`}
                onClick={() =>
                  handleAddToCart(book)
                }
                type="button"
                disabled={
                  !book.available ||
                  book.price === null
                }
              >

                <ShoppingBag
                  size={17}
                />

                <span>
                  {book.available &&
                  book.price !== null
                    ? "ADD TO CART"
                    : "COMING SOON"}
                </span>

                <ArrowUpRight
                  size={18}
                />

              </button>

            </article>

          )
        )}

      </div>


      {/* PROMOTIONAL BANNERS — BELOW HOMEPAGE PRICING CARDS */}
      <div className="pricing-promotions">
        {/* OFFER 1: INDIVIDUAL BOOKS */}
        <article className="pricing-promo">
          <div className="pricing-promo__copy">
            <p className="pricing-promo__eyebrow">INDIVIDUAL BOOK OFFER</p>
            <h3>
              Flat <strong>20% OFF</strong>
              <span>on each book!</span>
            </h3>
            <a className="pricing-promo__link" href="/books">
              View details <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="pricing-promo__books" aria-hidden="true">
            {books.slice(0, 3).map((book, index) => (
              <img
                key={book.id}
                src={book.images?.cover}
                alt=""
                className={`pricing-promo__book pricing-promo__book--${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </article>
          
        {/* OFFER 2: COMPLETE BOOK COMBO */}
        <article className="pricing-promo">
          <div className="pricing-promo__copy">
            <p className="pricing-promo__eyebrow">COMPLETE BOOK COMBO</p>
            <h3>
              All 3 books for
              <span className="pricing-promo__price">$45!</span>
            </h3>
            <a className="pricing-promo__link" href="/books">
              View details <span aria-hidden="true">→</span>
            </a>
          </div>
          
          <div className="pricing-promo__books" aria-hidden="true">
            {books.slice(0, 3).map((book, index) => (
              <img
                key={book.id}
                src={book.images?.cover}
                alt=""
                className={`pricing-promo__book pricing-promo__book--${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </article>
          
        {/* OFFER 3: COLLECTION SAVINGS */}
        <article className="pricing-promo">
          <div className="pricing-promo__copy">
            <p className="pricing-promo__eyebrow">SPECIAL COLLECTION OFFER</p>
            <h3>
              Save with the
              <span className="pricing-promo__highlight">
                complete collection!
              </span>
            </h3>
            <a className="pricing-promo__link" href="/books">
              View details <span aria-hidden="true">→</span>
            </a>
          </div>
          
          <div className="pricing-promo__books" aria-hidden="true">
            {books.slice(0, 3).map((book, index) => (
              <img
                key={book.id}
                src={book.images?.cover}
                alt=""
                className={`pricing-promo__book pricing-promo__book--${index + 1}`}
                loading="lazy"
              />
            ))}

            <span className="pricing-promo__badge">$45</span>
          </div>
        </article>
      </div>


    </section>
  );
}

export default Pricing;