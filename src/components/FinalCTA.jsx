
import {
  ArrowUpRight,
  BookOpen,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Zap,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { books, collection } from "../data/content";

function FinalCTA() {
  const { addBooksToCart } = useCart();

  // Use the actual three books configured in the project.
  const threeBooks = books.slice(0, 3);

  // Calculate the regular combined price from the existing book data.
  const individualTotal = threeBooks.reduce(
    (total, book) => total + Number(book.price || 0),
    0
  );

  const bundlePrice = Number(collection.price || 45);

  // Preserve the existing cart functionality.
  const handleGetBooks = () => {
    addBooksToCart(threeBooks);

    setTimeout(() => {
      window.dispatchEvent(new Event("cart:open"));
    }, 150);
  };

  return (
    <section className="final-cta section">
      <div className="final-cta-inner">
        {/* Eyebrow */}
        <p className="eyebrow final-cta-eyebrow">
          <span aria-hidden="true" />
          START TODAY
          <span aria-hidden="true" />
        </p>

        {/* Main heading */}
        <h2>
          Your next chapter
          <br />
          <i>starts with one idea.</i>
        </h2>

        {/* Supporting description */}
        <p className="final-cta-text">
          Choose a book individually for focused, practical growth —
          <br className="final-cta-desktop-break" />
          or get all 3 books together for just{" "}
          <strong>${bundlePrice.toFixed(2)}.</strong>
        </p>

        {/* Benefits row */}
        <div className="final-cta-features">
          <div className="final-cta-feature">
            <BookOpen aria-hidden="true" />
            <span>
              Practical
              <br />
              Frameworks
            </span>
          </div>

          <div className="final-cta-feature">
            <Zap aria-hidden="true" />
            <span>
              Instant
              <br />
              Digital Access
            </span>
          </div>

          <div className="final-cta-feature">
            <ShieldCheck aria-hidden="true" />
            <span>
              Secure
              <br />
              Payments
            </span>
          </div>

          <div className="final-cta-feature">
            <Smartphone aria-hidden="true" />
            <span>
              Read
              <br />
              Anywhere
            </span>
          </div>
        </div>

        {/* Bundle CTA — existing cart action preserved */}
        <div className="cta-buttons">
          <button
            className="button light final-cta-button"
            onClick={handleGetBooks}
            type="button"
          >
            <ShoppingBag size={19} aria-hidden="true" />

            <span>GET ALL 3 BOOKS</span>

            <strong className="current-price">
              ${bundlePrice.toFixed(0)}
            </strong>

            <del className="original-price">
              ${individualTotal.toFixed(2)}
            </del>

            <ArrowUpRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
