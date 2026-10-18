import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function MyBooks() {
  const [searchParams] = useSearchParams();

  const accessToken =
    searchParams.get("access");

  const [books, setBooks] = useState([]);
  const [orderNumber, setOrderNumber] =
    useState("");
  const [expiresAt, setExpiresAt] =
    useState(null);

  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBooks() {
      if (!accessToken) {
        setError(
          "This book access link is missing or invalid."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/download/access/${encodeURIComponent(
            accessToken
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        let result = null;

        try {
          result = await response.json();
        } catch {
          result = null;
        }

        if (!response.ok || !result?.success) {
          throw new Error(
            result?.message ||
              "Unable to load your purchased books."
          );
        }

        if (cancelled) {
          return;
        }

        setBooks(
          Array.isArray(result.items)
            ? result.items
            : []
        );

        setOrderNumber(
          result.orderNumber || ""
        );

        setExpiresAt(
          result.expiresAt || null
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "My Books error:",
          err
        );

        setError(
          err?.message ||
            "Unable to load your purchased books. Please try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  function formatExpiryDate(value) {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ).format(date);
  }

  /* =========================================================
     NO ACCESS TOKEN
  ========================================================= */

  if (!accessToken && !loading) {
    return (
      <main className="my-books-page">
        <section className="my-books-container">
          <div className="my-books-message">
            <p className="my-books-eyebrow">
              MY BOOKS
            </p>

            <h1>
              Book access link required
            </h1>

            <p>
              Please open the secure book
              access link from your
              Business Playbook purchase
              email.
            </p>

            <Link
              to="/books"
              className="my-books-button"
            >
              Explore Books
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="my-books-page">
        <section className="my-books-container">
          <div className="my-books-message">
            <p className="my-books-eyebrow">
              BUSINESS PLAYBOOK
            </p>

            <h1>
              Your books are loading...
            </h1>

            <p>
              We're securely checking your
              purchase and preparing your
              books.
            </p>

            <div
              className="my-books-loader"
              aria-label="Loading"
            />
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <main className="my-books-page">
        <section className="my-books-container">
          <div className="my-books-message my-books-error">
            <p className="my-books-eyebrow">
              MY BOOKS
            </p>

            <h1>
              We couldn't open your books
            </h1>

            <p>
              {error}
            </p>

            <div className="my-books-actions">
              <Link
                to="/books"
                className="my-books-button"
              >
                View Books
              </Link>

              <Link
                to="/"
                className="my-books-secondary-button"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     EMPTY PURCHASE
  ========================================================= */

  if (!books.length) {
    return (
      <main className="my-books-page">
        <section className="my-books-container">
          <div className="my-books-message">
            <p className="my-books-eyebrow">
              MY BOOKS
            </p>

            <h1>
              No books found
            </h1>

            <p>
              We couldn't find any purchased
              books associated with this
              access link.
            </p>

            <Link
              to="/books"
              className="my-books-button"
            >
              Explore Books
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     SUCCESS
  ========================================================= */

  return (
    <main className="my-books-page">
      <section className="my-books-container">

        {/* -----------------------------------------------------
            HEADER
        ----------------------------------------------------- */}

        <header className="my-books-header">
          <p className="my-books-eyebrow">
            BUSINESS PLAYBOOK
          </p>

          <h1>
            Your Books
          </h1>

          <p className="my-books-intro">
            Your purchased books are ready.
            Download them securely whenever
            you need them while your access
            link remains valid.
          </p>

          {orderNumber && (
            <p className="my-books-order">
              Order{" "}
              <strong>
                {orderNumber}
              </strong>
            </p>
          )}

          {expiresAt && (
            <p className="my-books-expiry">
              Secure access available until{" "}
              <strong>
                {formatExpiryDate(
                  expiresAt
                )}
              </strong>
            </p>
          )}
        </header>

        {/* -----------------------------------------------------
            BOOK LIST
        ----------------------------------------------------- */}

        <div className="my-books-list">
          {books.map((book, index) => {
            const title =
              book.title ||
              book.name ||
              `Purchased Book ${index + 1}`;

            const image =
              book.image ||
              book.cover ||
              "";

            const downloadUrl =
              book.downloadUrl ||
              book.download_url ||
              "";

            return (
              <article
                key={
                  book.id ||
                  book.productId ||
                  `${title}-${index}`
                }
                className="my-book-card"
              >
                <div className="my-book-image-wrapper">
                  {image ? (
                    <img
                      src={image}
                      alt={`${title} book cover`}
                      className="my-book-image"
                    />
                  ) : (
                    <div
                      className="my-book-image-placeholder"
                      aria-hidden="true"
                    >
                      BOOK
                    </div>
                  )}
                </div>

                <div className="my-book-content">
                  <p className="my-book-label">
                    PURCHASED BOOK
                  </p>

                  <h2>
                    {title}
                  </h2>

                  {book.description && (
                    <p className="my-book-description">
                      {book.description}
                    </p>
                  )}

                  {downloadUrl ? (
                    <a
                      href={downloadUrl}
                      className="my-books-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <p className="my-book-unavailable">
                      Download is temporarily
                      unavailable. Please try
                      opening your secure access
                      link again.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* -----------------------------------------------------
            SECURITY INFORMATION
        ----------------------------------------------------- */}

        <div className="my-books-security">
          <p>
            Your books are delivered through
            secure, access-controlled download
            links. Do not share your private
            book access link with others.
          </p>
        </div>

        {/* -----------------------------------------------------
            FOOTER NAVIGATION
        ----------------------------------------------------- */}

        <div className="my-books-footer">
          <Link to="/books">
            Explore More Books
          </Link>

          <Link to="/">
            Back to Home
          </Link>
        </div>

      </section>
    </main>
  );
}

export default MyBooks;