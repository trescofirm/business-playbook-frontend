import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { books } from "../data/content";
import { useCart } from "../context/CartContext";
import { trackViewItem } from "../utils/analytics";


import ProductSchema from "../components/ProductSchema";
import BookSEO from "../components/BookSEO";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Breadcrumbs from "../components/Breadcrumbs";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

import NotFound from "./NotFound";

const BookPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const book = books.find((item) => item.id === slug);


  // ADDED FOR THE POINT 6
  useEffect(() => {
    if (!book) return;

    trackViewItem(book);
  }, [book]);


  const { addToCart } = useCart();
/*
  if (!book) {
    return (
      <>
        <Navbar />
  
        <main className="book-page-not-found">
          <section>
            <p className="book-page-eyebrow">
              BUSINESS PLAYBOOK
            </p>
  
            <h1>Book Not Found</h1>
  
            <p>
              The book you're looking for could not be found.
            </p>
  
            <Link to="/books">
              Browse All Books
            </Link>
          </section>
        </main>
  
        <Footer />
      </>
    );
  }
*/
    if (!book) {
      return <NotFound />;
    }

  const handleBuyNow = () => {
    if (!book.available) return;

    addToCart(book);
    trackAddToCart(book);
    navigate("/checkout");
  };

  return (
    <>
      <BookSEO book={book} />

      <ProductSchema book={book} />
      <BreadcrumbSchema book={book} />

      <Navbar />

      <main className="book-page">
        <Breadcrumbs book={book} />

        {/* ================================
            BOOK HERO
        ================================= */}

        <section className="book-page-hero">

          <div className="book-page-image">

            <img
              src={book.images?.cover}
              alt={`${book.title} book cover`}
              width="270"
              height="395"
            />

          </div>


          <div className="book-page-content">

            <p className="book-page-label">
              BUSINESS PLAYBOOK
            </p>


            <h1>
              {book.title}
            </h1>


            <p className="book-page-description">
              {book.description}
            </p>


            {book.author && (
              <p className="book-page-author">
                By {book.author}
              </p>
            )}


            <div className="book-page-price">

              {book.oldPrice && (
                <span className="book-page-old-price">
                  ${Number(book.oldPrice).toFixed(2)}
                </span>
              )}

              <strong className="book-page-current-price">
                ${Number(book.price).toFixed(2)}
              </strong>

            </div>


            <p className="book-page-availability">
              {book.available
                ? "Available"
                : "Currently unavailable"}
            </p>

            <div className="book-page-format">
              <strong>Format:</strong> PDF, instant download
            </div>

            {book.features?.length > 0 && (
              <ul className="book-page-features">
                {book.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!book.available}
              className="book-page-buy-button"
            >
              {book.available
                ? "Buy Now"
                : "Currently Unavailable"}
            </button>

          </div>

        </section>

        <section className="book-page-details">

          <div className="book-page-section">
            <p className="book-page-eyebrow">
              ABOUT THIS BOOK
            </p>

            <h2>About {book.title}</h2>

            <p>{book.about}</p>
          </div>

          {book.seoContent?.problem?.paragraphs?.length > 0 && (
              <div className="book-page-section">
                <p className="book-page-eyebrow">
                  UNDERSTANDING THE PROBLEM
                </p>
                    
                <h2>
                  {book.seoContent.problem.heading}
                </h2>
                    
                {book.seoContent.problem.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

          <div className="book-page-section">
            <p className="book-page-eyebrow">
              WHAT YOU'LL LEARN
            </p>

            <h2>What You'll Learn in {book.title}</h2>

            <ul className="book-page-list">
              {book.learn?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="book-page-section">
            <p className="book-page-eyebrow">
              WHO THIS BOOK IS FOR
            </p>
          
            <h2>Who Is {book.title} For?</h2>
          
            <ul className="book-page-list">
              {book.audience?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="book-page-section">
            <p className="book-page-eyebrow">
              WHAT'S INCLUDED
            </p>
          
            <h2>What's Inside {book.title}</h2>
          
            <ul className="book-page-list">
              {book.included?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {book.seoContent?.outcome?.paragraphs?.length > 0 && (
              <div className="book-page-section">
                <p className="book-page-eyebrow">
                  WHAT YOU CAN EXPECT
                </p>

                <h2>
                  {book.seoContent.outcome.heading}
                </h2>

                {book.seoContent.outcome.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          
          {book.extraSection && (
            <div className="book-page-section">
              <p className="book-page-eyebrow">
                BUSINESS PLAYBOOK
              </p>
        
              <h2>{book.extraSection.title}</h2>
        
              <p>{book.extraSection.intro}</p>
        
              <div className="book-page-feature-grid">
                {book.extraSection.items.map((item) => (
                  <article
                    key={item.title}
                    className="book-page-feature"
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>


        {/* FAQ OF BOOKS */}
        <section className="book-page-faq">
          <div className="book-page-section">
            <p className="book-page-eyebrow">
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2>Questions About {book.title}</h2>

            <div className="book-faq-list">
              {book.faqs?.map((faq) => (
                <details
                  key={faq.question}
                  className="book-faq-item"
                >
                  <summary>{faq.question}</summary>
            
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>



        {/* ================================
            RELATED BOOKS
        ================================= */}

        <section className="related-books">

          <div className="related-books-header">

            <p>
              BUSINESS PLAYBOOK
            </p>

            <h2>
              Explore More Books
            </h2>

          </div>


          <div className="related-books-grid">

            {books
              .filter((item) => item.id !== book.id)
              .map((item) => (

                <Link
                  key={item.id}
                  to={`/books/${item.id}`}
                  className="related-book-card"
                >

                  <img
                    src={item.images?.cover}
                    alt={`${item.title} book cover`}
                  />

                  <h3>
                    {item.title}
                  </h3>

                  <span>
                    View Book
                  </span>

                </Link>

              ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default BookPage;