import { Link } from "react-router-dom";

import { guides } from "../data/guides";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Guides = () => {
  return (
    <>
      <Navbar />

      <main className="books-page">
        <section className="books-page-header">
          <p className="book-page-eyebrow">
            BUSINESS PLAYBOOK
          </p>

          <h1>
            Practical Guides for Confidence,
            Focus & Personal Growth
          </h1>

          <p>
            Explore practical guides covering
            social confidence, digital distractions,
            focus, concentration and personal growth.
          </p>
        </section>

        <section className="books-page-grid">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="books-page-card"
            >
              <p className="book-page-eyebrow">
                {guide.primaryTopic}
              </p>

              <h2>
                <Link
                  to={`/guides/${guide.slug}`}
                >
                  {guide.title}
                </Link>
              </h2>

              <p>
                {guide.description}
              </p>

              <Link
                to={`/guides/${guide.slug}`}
              >
                Read Guide
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Guides;