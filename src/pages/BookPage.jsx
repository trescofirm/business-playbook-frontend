import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Download,
  FileText,
  Globe2,
  LockKeyhole,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
  TabletSmartphone,
  Eye,
} from "lucide-react";

import { books } from "../data/content";
import { useCart } from "../context/CartContext";
import { trackViewItem, trackAddToCart } from "../utils/analytics";
import BookSEO from "../components/BookSEO";
import ProductSchema from "../components/ProductSchema";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import "../styles/books-page.css";

import OptimizedImage from "../components/OptimizedImage";

const BookPage = () => {
  const { slug } = useParams();
  const book = books.find((item) => item.id === slug);
  const { addToCart } = useCart();

  useEffect(() => {
    if (book) trackViewItem(book);
  }, [book]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [book?.id]);

  if (!book) return <NotFound />;

  // Add the product to the existing cart; the customer can continue from the navbar cart.
  const handleAddToCart = () => {
    if (!book.available) return;
    addToCart(book);
    trackAddToCart(book);
  };

  const scrollToAbout = () => {
    document.getElementById("about-this-book")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const cover = book.images?.cover;
  const features = book.features?.length
    ? book.features
    : [
        "Instant PDF delivery",
        "One-time purchase",
        "Works on phone, tablet and computer",
      ];

  return (
    <div className="book-detail-page">
      <BookSEO book={book} />
      <ProductSchema book={book} />
      <BreadcrumbSchema book={book} />
      <Navbar />

      <main className="book-detail-main">
        <div className="book-detail-breadcrumbs">
          <Breadcrumbs book={book} />
        </div>

        {/* Product hero */}
        <section className="bd-product-hero" aria-labelledby="book-title">
          <div className="bd-cover-column">
            <div className="bd-cover-stage">
              {cover ? (                
                <OptimizedImage
                  className="bd-book-cover"
                  src={cover}
                  alt={`${book.title} digital book cover`}
                  width={420}
                  height={610}
                  sizes="(max-width: 600px) 80vw, 420px"
                  loading="eager"
                  fetchPriority="high"
                />
              ) : (
                <div className="bd-cover-placeholder" aria-label="Book cover unavailable">
                  <BookOpen size={56} strokeWidth={1.2} />
                  <span>{book.title}</span>
                </div>
              )}
            </div>

            <div className="bd-cover-actions">
              <button type="button" className="bd-secondary-button" onClick={scrollToAbout}>
                <Eye size={19} strokeWidth={1.8} />
                View Book Details
              </button>
              {cover && (
                <a
                  className="bd-secondary-button"
                  href={cover}
                  download
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Save the ${book.title} cover image`}
                >
                  <Download size={19} strokeWidth={1.8} />
                  Save Cover
                </a>
              )}
            </div>
          </div>

          <div className="bd-product-copy">
            <p className="bd-eyebrow">BUSINESS PLAYBOOK</p>
            <h1 id="book-title">{book.title}</h1>

            {book.subtitle && <p className="bd-subtitle">{book.subtitle}</p>}

            {book.seoContent?.intro && (
              <p className="bd-seo-intro">{book.seoContent.intro}</p>
            )}

            <p className="bd-description">{book.description}</p>

            {book.author && (
              <p className="bd-author">
                By <span>{book.author}</span>
              </p>
            )}

            <div className="bd-price-row">
              <strong className="bd-current-price">
                ${Number(book.price).toFixed(2)}
              </strong>
              {book.oldPrice != null && (
                <del className="bd-old-price">
                  ${Number(book.oldPrice).toFixed(2)}
                </del>
              )}
            </div>
                
            <div className="book-price-section">
              <div className="book-price-top-row">
                <div className="book-price-group">
                  {/* Keep your existing price and original price markup here */}
                </div>

                {/* <div
                  className="book-rating-summary"
                  aria-label={`Rated ${book.rating} out of 5`}
                >
                  <span className="book-rating-value">
                    {book.rating.toFixed(1)}
                  </span>

                  
                <span
                  className="book-rating-stars"
                  role="img"
                  aria-label={`${book.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    const fill = Math.max(0, Math.min(1, book.rating - index));
                  
                    return (
                      <span className="book-rating-star" key={index}>
                        <span className="book-rating-star-empty">★</span>
                        <span
                          className="book-rating-star-fill"
                          style={{ width: `${fill * 100}%` }}
                        >
                          ★
                        </span>
                      </span>
                    );
                  })}
                </span>


                  <span className="book-rating-count">
                    ({book.purchaseCount})
                  </span>
                </div> */}
              </div>

              <div className="book-availability">
                {/* Keep your existing availability indicator here */}
              </div>
            </div>


            <p className={`bd-availability ${book.available ? "is-available" : "is-unavailable"}`}>
              <span aria-hidden="true" />
              {book.available ? "Available" : "Currently unavailable"}
            </p>

            <div className="bd-trust-grid" aria-label="Product details">
              <div className="bd-trust-item">
                <FileText aria-hidden="true" />
                <span><strong>Format</strong><small>PDF, instant download</small></span>
              </div>
              <div className="bd-trust-item">
                <TabletSmartphone aria-hidden="true" />
                <span><strong>Digital PDF</strong><small>Read on your devices</small></span>
              </div>
              <div className="bd-trust-item">
                <ArrowDownToLine aria-hidden="true" />
                <span><strong>{features[0] || "Instant PDF delivery"}</strong><small>After successful payment</small></span>
              </div>
              <div className="bd-trust-item">
                <ShieldCheck aria-hidden="true" />
                <span><strong>{features[1] || "One-time purchase"}</strong><small>No recurring subscription</small></span>
              </div>
              <div className="bd-trust-item">
                <LockKeyhole aria-hidden="true" />
                <span><strong>Refund policy</strong><small><Link to="/refund">View policy</Link></small></span>
              </div>
              <div className="bd-trust-item">
                <MonitorSmartphone aria-hidden="true" />
                <span><strong>{features[2] || "Works on phone, tablet and computer"}</strong><small>Phone, tablet and computer</small></span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!book.available}
              className="bd-buy-button"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              <span>{book.available ? "ADD TO CART" : "CURRENTLY UNAVAILABLE"}</span>
              {book.available && <strong>${Number(book.price).toFixed(2)}</strong>}
              <ArrowRight className="bd-buy-arrow" size={20} />
            </button>
            <p className="bd-purchase-note">Secure checkout · Instant digital delivery</p>
          </div>
        </section>

        {/* What the customer receives */}
        <section className="bd-panel bd-receive-panel" aria-labelledby="bd-receive-title">
          <h2 id="bd-receive-title">What You’ll Receive</h2>
          <div className="bd-receive-grid">
            <article className="bd-receive-item">
              <FileText aria-hidden="true" />
              <h3>Digital PDF book</h3>
              <p>Instant access after successful payment</p>
            </article>
            <article className="bd-receive-item">
              <TabletSmartphone aria-hidden="true" />
              <h3>Read on phone, tablet or computer</h3>
              <p>One-time purchase</p>
            </article>
            <article className="bd-receive-item">
              <Download aria-hidden="true" />
              <h3>Instant PDF delivery</h3>
              <p>Access after successful payment</p>
            </article>
            <article className="bd-receive-item">
              <Check aria-hidden="true" />
              <h3>Works across your devices</h3>
              <p>Phone, tablet and computer</p>
            </article>
          </div>
        </section>

        {/* Existing book copy remains sourced from content.js */}
        <section id="about-this-book" className="bd-panel bd-about-panel">
          <h2>About This Book</h2>
          <p className="bd-about-copy">{book.about}</p>
          <div className="bd-facts-row">
            <div className="bd-fact"><FileText aria-hidden="true" /><span><small>Format</small><strong>Digital PDF</strong></span></div>
            <div className="bd-fact"><Download aria-hidden="true" /><span><small>Delivery</small><strong>Instant access</strong></span></div>
            <div className="bd-fact"><Clock3 aria-hidden="true" /><span><small>Purchase</small><strong>One-time</strong></span></div>
            <div className="bd-fact"><Globe2 aria-hidden="true" /><span><small>Compatibility</small><strong>Phone, tablet, computer</strong></span></div>
          </div>
        </section>

        {book.seoContent?.problem?.paragraphs?.length > 0 && (
          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">UNDERSTANDING THE PROBLEM</p>
            <h2>{book.seoContent.problem.heading}</h2>
            {book.seoContent.problem.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        )}

        <div className="bd-two-column-content">
          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">WHAT YOU’LL LEARN</p>
            <h2>What You’ll Learn in {book.title}</h2>
            <ul className="bd-check-list">
              {book.learn?.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </section>

          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">WHO THIS BOOK IS FOR</p>
            <h2>Who Is {book.title} For?</h2>
            <ul className="bd-check-list">
              {book.audience?.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </section>
        </div>

        <section className="bd-panel bd-content-panel">
          <p className="bd-section-kicker">WHAT’S INCLUDED</p>
          <h2>What’s Inside {book.title}</h2>
          <ul className="bd-check-list bd-check-list--columns">
            {book.included?.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
        </section>

        {book.seoContent?.outcome?.paragraphs?.length > 0 && (
          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">WHAT YOU CAN EXPECT</p>
            <h2>{book.seoContent.outcome.heading}</h2>
            {book.seoContent.outcome.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        )}

        {book.seo?.secondaryTopics?.length > 0 && (
          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">TOPICS COVERED</p>
            <h2>Topics Covered in {book.title}</h2>
            <ul className="bd-topic-list">{book.seo.secondaryTopics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
          </section>
        )}

        {book.relatedContent?.length > 0 && (
          <section className="bd-panel bd-content-panel bd-contextual-links">
            <p className="bd-section-kicker">CONTINUE EXPLORING</p>
            {book.relatedContent.map((item) => {
              const relatedBook = books.find((related) => related.id === item.target);
              if (!relatedBook) return null;
              return <p key={item.target}>{item.before}<Link to={`/books/${relatedBook.id}`}>{relatedBook.title}</Link>{item.after}</p>;
            })}
          </section>
        )}

        {book.relatedGuides?.length > 0 && (
          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">RELATED GUIDES</p>
            <h2>Continue Learning</h2>
            <ul className="bd-topic-list">{book.relatedGuides.map((guide) => <li key={guide.slug}><Link to={`/guides/${guide.slug}`}>{guide.title}</Link></li>)}</ul>
          </section>
        )}

        {book.extraSection && (
          <section className="bd-panel bd-content-panel">
            <p className="bd-section-kicker">BUSINESS PLAYBOOK</p>
            <h2>{book.extraSection.title}</h2>
            <p>{book.extraSection.intro}</p>
            <div className="bd-extra-grid">
              {book.extraSection.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
            </div>
          </section>
        )}

        {/* Keep every existing FAQ entry; no FAQ copy is hardcoded here. */}
        {book.faqs?.length > 0 && (
          <section className="bd-panel bd-faq-panel">
            <p className="bd-section-kicker">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Questions About {book.title}</h2>
            <div className="bd-faq-list">
              {book.faqs.map((faq) => (
                <details key={faq.question} className="bd-faq-item">
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="bd-related-books">
          <div className="bd-related-heading">
            <p className="bd-section-kicker">BUSINESS PLAYBOOK</p>
            <h2>Explore More Books</h2>
          </div>
          <div className="bd-related-grid">
            {books.filter((item) => item.id !== book.id).map((item) => (
              <Link key={item.id} to={`/books/${item.id}`} className="bd-related-card">
                {item.images?.cover && <img src={item.images.cover} alt={`${item.title} book cover`} loading="lazy" />}
                <div><h3>{item.title}</h3><span>View Book <ArrowRight size={15} /></span></div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookPage;
