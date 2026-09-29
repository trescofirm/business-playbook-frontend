import { Link } from "react-router-dom";
import { books } from "../data/content";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Books = () => {
  return (
    <>
      <Navbar />

      <main className="books-page">

        <section className="books-page-header">
          <p className="book-page-eyebrow">
            BUSINESS PLAYBOOK
          </p>

          <h1>Business Playbook Books</h1>

          <p>
            Practical books for confidence, focus, habits,
            productivity and personal growth.
          </p>
        </section>

        <section className="books-page-grid">
          {books.map((book) => (
            <article key={book.id} className="books-page-card">

              <Link to={`/books/${book.id}`}>
                <img
                  src={book.images?.cover}
                  alt={`${book.title} book cover`}
                  width="270"
                  height="395"
                />
              </Link>

              <h2>
                <Link to={`/books/${book.id}`}>
                  {book.title}
                </Link>
              </h2>

              <p>{book.description}</p>

              <Link to={`/books/${book.id}`}>
                View Book
              </Link>

            </article>
          ))}
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Books;