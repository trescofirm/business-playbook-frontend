import {
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function FinalCTA() {
  const { addBooksToCart } = useCart();

  const threeBooks = [
    {
      id: "how-to-attract-women",
      title: "How to Attract Women",
      price: 19.99,
      image: "/images/books/how-to-attract-women-cover.jpeg",
      description:
        "A practical guide focused on confidence, communication and self-development.",
    },
    {
      id: "dopamine-detox",
      title: "30 Day Dopamine Detox Workbook",
      price: 15.99,
      image: "/images/books/dopamine-detox.jpeg",
      description:
        "A 30-day workbook designed to help you build focus and reduce distractions.",
    },
    {
      id: "unlock-focus",
      title: "How to Unlock Your Focus",
      price: 15.99,
      image: "/images/books/unlock-focus-cover.jpeg",
      description:
        "A practical guide focused on concentration, reducing distractions and better focus.",
    },
  ];

  const individualTotal = threeBooks.reduce(
    (total, book) => total + book.price,
    0
  );

  const bundlePrice = 45.0;

  const handleGetBooks = () => {
    addBooksToCart(threeBooks);

    setTimeout(() => {
      window.dispatchEvent(new Event("cart:open"));
    }, 150);
  };

  return (
    <section className="final-cta section">
      <div className="final-cta-inner">
        <p className="eyebrow">START TODAY</p>

        <h2>
          Your next chapter
          <br />
          <i>starts with one idea.</i>
        </h2>

        <p className="final-cta-text">
          Choose a book individually for focused, practical growth — or get all
          3 books together for just <strong>$45.00</strong>.
        </p>

        <p className="final-cta-urgency">
          Only a few copies left. <span>Order now.</span>
        </p>

        <div className="cta-buttons">
          <button
            className="button light final-cta-button"
            onClick={handleGetBooks}
            type="button"
          >
            <ShoppingBag size={19} />

            <span>GET ALL 3 BOOKS</span>

            <strong className="current-price">$45</strong>

            <del className="original-price">
              ${individualTotal.toFixed(2)}
            </del>

            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;