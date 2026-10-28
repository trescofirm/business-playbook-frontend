// import { Link } from "react-router-dom";
// import { books } from "../data/content";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import "../styles/books-page.css";

// const Books = () => {
//   return (
//     <>
//       <Navbar />

//       <main className="books-page">

//         <section className="books-page-header">
//           <p className="book-page-eyebrow">
//             BUSINESS PLAYBOOK
//           </p>

//           <h1>
//             Business Playbook Books
//           </h1>

//           <p>
//             Explore practical digital books for building
//             confidence, improving social skills, reducing
//             digital distractions, developing better habits,
//             and improving focus and productivity.
//           </p>
//         </section>

//         <section
//           className="books-page-topics"
//           aria-labelledby="books-topics-heading"
//         >
//           <div className="books-page-section-header">
//             <p className="book-page-eyebrow">
//               EXPLORE BY TOPIC
//             </p>

//             <h2 id="books-topics-heading">
//               Practical Books for Personal Growth
//             </h2>

//             <p>
//               Choose a practical guide based on the area you
//               want to improve — social confidence, digital
//               habits, focus, concentration, discipline or
//               personal growth.
//             </p>
//           </div>

//           <div className="books-page-topic-grid">
//             {books.map((book) => (
//               <Link
//                 key={book.id}
//                 to={`/books/${book.id}`}
//                 className="books-page-topic-card"
//               >
//                 <h3>
//                   {book.seo?.primaryTopic ||
//                     book.category}
//                 </h3>

//                 <p>
//                   {book.description}
//                 </p>

//                 <span>
//                   Explore Book
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </section>

//         <section
//           className="books-page-grid"
//           aria-labelledby="all-books-heading"
//         >
//           <div className="books-page-section-header">
//             <p className="book-page-eyebrow">
//               ALL BOOKS
//             </p>

//             <h2 id="all-books-heading">
//               Explore the Business Playbook Collection
//             </h2>
//           </div>

//           {books.map((book) => (
//             <article
//               key={book.id}
//               className="books-page-card"
//             >
//               <Link
//                 to={`/books/${book.id}`}
//               >
//                 <img
//                   src={book.images?.cover}
//                   alt={`${book.title} book cover`}
//                   width="270"
//                   height="395"
//                   loading="lazy"
//                 />
//               </Link>

//               <h2>
//                 <Link
//                   to={`/books/${book.id}`}
//                 >
//                   {book.title}
//                 </Link>
//               </h2>

//               <p>
//                 {book.description}
//               </p>

//               <Link
//                 to={`/books/${book.id}`}
//               >
//                 Explore {book.title}
//               </Link>
//             </article>
//           ))}
//         </section>

//       </main>

//       <Footer />
//     </>
//   );
// };

// export default Books;


import { Link } from "react-router-dom";
import { books, collection } from "../data/content";
import { useCart } from "../context/CartContext";
import { trackAddToCart } from "../utils/analytics";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/books-page.css";

import BooksHero from "../components/BooksHero";

import OptimizedImage from "../components/OptimizedImage";

const formatPrice = (price) =>
  Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Books = () => {
  const { addToCart, addBooksToCart } = useCart();
  const featuredBook = books[0];

  const handleAddToCart = (book) => {
    if (!book.available || book.price == null) return;

    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      oldPrice: book.oldPrice,
      image: book.images?.cover || null,
      description: book.description,
    });

    trackAddToCart(book);
    window.dispatchEvent(new Event("cart:open"));
  };

  const handleAddCollection = () => {
    const availableBooks = books.filter(
      (book) => book.available && book.price != null
    );

    addBooksToCart(availableBooks);
    availableBooks.forEach((book) => trackAddToCart(book));
    window.dispatchEvent(new Event("cart:open"));
  };

  return (
    <>
      <Navbar />

      <main className="books-page">
        {/* Intro copy retained from the existing Books page. */}
        {/* <section className="books-page-header">
          <p className="book-page-eyebrow">BUSINESS PLAYBOOK</p>
          <h1>Business Playbook Books</h1>
          <p>
            Explore practical digital books for building confidence, improving
            social skills, reducing digital distractions, developing better
            habits, and improving focus and productivity.
          </p>
        </section> */}

        <BooksHero
          books={books}
          onAddToCart={handleAddToCart}
        />

        <section className="books-page-grid" aria-labelledby="all-books-heading">
          <div className="books-page-section-header">
            <p className="book-page-eyebrow">ALL BOOKS</p>
            <h2 id="all-books-heading">Explore the Business Playbook Collection</h2>
            <p>Practical digital guides for your next step forward.</p>
          </div>

          <div className="books-page-products">
            {books.map((book) => (
              
          <article
            key={book.id}
            className="books-page-card"
            onClick={(e) => {
              if (e.target.closest("button, a")) return;
              window.location.href = `/books/${book.id}`;
            }}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
            
              if (e.key === "Enter") {
                window.location.href = `/books/${book.id}`;
              }
            }}
          >
            <Link
              to={`/books/${book.id}`}
              className="books-page-card-image-link"
              aria-label={`View ${book.title}`}
            >
              <div className="books-page-card-image">                
                <OptimizedImage
                  src={book.images?.cover}
                  alt={`${book.title} book cover`}
                  width={270}
                  height={395}
                  sizes="(max-width: 600px) 110px, (max-width: 900px) 140px, 187px"
                  loading="lazy"
                />
              </div>
            </Link>
          
            {/* Existing book information */}
            <div className="books-page-card-content">
              <div className="books-page-card-meta">
                {book.type && (
                  <span className="books-page-card-type">{book.type}</span>
                )}
                {book.category && (
                  <span className="books-page-card-category">
                    {book.category}
                  </span>
                )}
              </div>
              
              <h3>
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </h3>
              
              {book.subtitle && (
                <p className="books-page-card-subtitle">{book.subtitle}</p>
              )}

              {book.author && (
                <p className="books-page-card-author">By {book.author}</p>
              )}

              <p className="books-page-card-description">
                {book.description}
              </p>
            </div>
            
            {/* Benefits column */}
            <div
              className="books-page-card-includes"
              aria-label="Included with purchase"
            >
              {(book.features || []).map((feature) => (
                <p key={feature}>
                  <span aria-hidden="true">✓</span>
                  {feature}
                </p>
              ))}
            </div>
            
            {/* Price and purchase column */}
            <div className="books-page-card-purchase">
              <div className="books-page-card-price" aria-label="Price">
                {book.price != null ? (
                  <>
                    <strong>{formatPrice(book.price)}</strong>
                    {book.oldPrice != null && (
                      <del>{formatPrice(book.oldPrice)}</del>
                    )}
                  </>
                ) : (
                  <span className="books-page-card-coming">
                    Price coming soon
                  </span>
                )}
              </div>
              
              <button
                className="books-page-card-cta"
                type="button"
                onClick={() => handleAddToCart(book)}
                disabled={!book.available || book.price == null}
              >
                {book.available && book.price != null
                  ? "Add to Cart"
                  : "Coming Soon"}
                <span aria-hidden="true">↗</span>
              </button>
                
              <Link
                className="books-page-card-details"
                to={`/books/${book.id}`}
              >
                View book details <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>

            ))}
          </div>
        </section>


        <section className="books-collection-banner" aria-label="Complete collection offer">
          <div className="books-collection-copy">
            <p className="book-page-eyebrow">COMPLETE COLLECTION</p>
            <h2>Get all 3 books for just <span>{formatPrice(collection.price)}</span></h2>
            <p>Unlock the full Business Playbook collection and save {formatPrice(collection.saving)}.</p>
          </div>
          <div className="books-collection-covers" aria-hidden="true">
            {books.slice(0, 3).map((book) => (
              <div className="books-collection-cover-frame" key={book.id}>
                <img
                  src={book.images?.cover}
                  alt=""
                  width="270"
                  height="395"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
            <span className="books-collection-save">
              SAVE<br />13%
            </span>
          </div>
          <div className="books-collection-action">
            <button type="button" onClick={handleAddCollection}>
              Add all 3 to cart <span aria-hidden="true">↗</span>
            </button>
            <p><del>{formatPrice(collection.individualTotal)}</del> <strong>{formatPrice(collection.price)}</strong></p>
          </div>
        </section>

                {/* Featured book: uses the first book's existing content and assets. */}
        {featuredBook && (
          <section className="books-featured" aria-labelledby="books-featured-title">
            <div className="books-featured-art">
              <span className="books-featured-ribbon">BEST OF THE MONTH</span>
              <div className="books-featured-orbit" aria-hidden="true" />
              <Link
                to={`/books/${featuredBook.id}`}
                className="books-featured-cover-link"
                aria-label={`View ${featuredBook.title}`}
              >                
                <OptimizedImage
                  className="books-featured-cover"
                  src={featuredBook.images?.cover}
                  alt={`${featuredBook.title} book cover`}
                  width={270}
                  height={395}
                  sizes="(max-width: 600px) 80vw, 270px"
                  loading="eager"
                  fetchPriority="high"
                />
              </Link>
            </div>

            <div className="books-featured-copy">
              <div className="books-page-card-meta">
                {featuredBook.type && (
                  <span className="books-page-card-type">{featuredBook.type}</span>
                )}
                {featuredBook.category && (
                  <span className="books-page-card-category">{featuredBook.category}</span>
                )}
              </div>
              <h2 id="books-featured-title">{featuredBook.title}</h2>
              {featuredBook.author && (
                <p className="books-featured-author">By {featuredBook.author}</p>
              )}
              {featuredBook.description && (
                <p className="books-featured-description">{featuredBook.description}</p>
              )}
              <Link className="books-featured-read-more" to={`/books/${featuredBook.id}`}>
                Read more <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="books-featured-benefits">
              {featuredBook.features?.map((feature) => (
                <p key={feature}><span aria-hidden="true">✓</span>{feature}</p>
              ))}
            </div>
          </section>
        )}

        {/* Existing topic content is retained below the collection layout. */}
        <section className="books-page-topics" aria-labelledby="books-topics-heading">
          <div className="books-page-section-header">
            <p className="book-page-eyebrow">EXPLORE BY TOPIC</p>
            <h2 id="books-topics-heading">Practical Books for Personal Growth</h2>
            <p>
              Choose a practical guide based on the area you want to improve —
              social confidence, digital habits, focus, concentration,
              discipline or personal growth.
            </p>
          </div>
          <div className="books-page-topic-grid">
            {books.map((book) => (
              <Link key={book.id} to={`/books/${book.id}`} className="books-page-topic-card">
                <h3>{book.seo?.primaryTopic || book.category}</h3>
                <p>{book.description}</p>
                <span>Explore Book <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Books;
