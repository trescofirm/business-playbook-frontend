
import { motion } from "framer-motion";

import {
  ArrowRight,
  Zap,
  BookOpen,
  Globe,
  ShoppingBag,
  Download,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { books, collection } from "../data/content";

function Hero() {
  const { addToCart } = useCart();

  const collectionBooks = books.slice(0, 3);

  const handleBuyAllBooks = () => {
    collectionBooks.forEach((book) => {
      if (!book.available || book.price == null) {
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
    });

    window.setTimeout(() => {
      window.dispatchEvent(new Event("cart:open"));
    }, 150);
  };

  const scrollToBooks = () => {
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const bookPanels = [
    {
      book: collectionBooks[0],
      className: "hero-book-panel--one",
      fallback: "How to Attract Women book cover",
    },
    {
      book: collectionBooks[1],
      className: "hero-book-panel--two",
      fallback: "30 Day Dopamine Detox Workbook cover",
    },
    {
      book: collectionBooks[2],
      className: "hero-book-panel--three",
      fallback: "How to Unlock Your Focus book cover",
    },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-main">
          {/* LEFT: Existing homepage copy */}
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              <span>Self-Improvement</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">
                Build Confidence,
              </span>

              <span className="hero-title-line">
                Focus, Discipline &
              </span>

              <span className="hero-title-line hero-title-accent">
                Personal Growth.
              </span>
            </h1>

            <p className="hero-description">
              Build confidence. Take back your focus. Develop stronger
              habits and a better mindset. Three practical playbooks
              designed to be <strong>used</strong>, not just finished.
            </p>

            <div className="hero-buttons">
              <button
                className="hero-buy"
                onClick={handleBuyAllBooks}
                type="button"
              >
                <ShoppingBag size={17} strokeWidth={1.8} />

                <span>
                  GET ALL 3 BOOKS — $
                  {Number(collection?.price ?? 45).toFixed(0)}
                </span>

                <del>
                  $
                  {Number(
                    collection?.individualTotal ?? 51.97
                  ).toFixed(2)}
                </del>

                <ArrowRight size={17} strokeWidth={1.8} />
              </button>

              <button
                className="hero-explore"
                onClick={scrollToBooks}
                type="button"
              >
                <span>EXPLORE THE BOOKS</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </button>
            </div>

            <div className="hero-inline-benefits">
              <span>
                <Zap size={14} />
                Instant delivery
              </span>

              <span>
                <BookOpen size={14} />
                PDF + Digital
              </span>

              <span>
                <Globe size={14} />
                Available worldwide
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Real book covers inside warm display panels */}
          <motion.div
            className="hero-books"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
            aria-label="Explore the three Business Playbook books"
          >
            {bookPanels.map(({ book, className, fallback }, index) => (
              <motion.div
                className={`hero-book-panel ${className}`}
                key={book?.id ?? className}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + index * 0.12,
                  ease: "easeOut",
                }}
              >
                <div className="hero-book-panel-shape" />

                {book?.images?.cover ? (
                  <img
                    className="hero-book-image"
                    src={book.images.cover}
                    alt={book.title ? `${book.title} book cover` : fallback}
                    width="300"
                    height="430"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    draggable="false"
                  />
                ) : (
                  <div className="hero-book-placeholder" aria-hidden="true">
                    <BookOpen size={38} strokeWidth={1.2} />
                    <span>Business Playbook</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM: Three benefits across the hero */}
        <div className="hero-benefit-strip">
          <div className="hero-benefit-item">
            <span className="hero-benefit-icon">
              <BookOpen size={21} strokeWidth={1.7} />
            </span>

            <span className="hero-benefit-copy">
              <strong>THREE PRACTICAL BOOKS</strong>
              <span>Actionable ideas for real life</span>
            </span>
          </div>

          <div className="hero-benefit-item">
            <span className="hero-benefit-icon">
              <Download size={21} strokeWidth={1.7} />
            </span>

            <span className="hero-benefit-copy">
              <strong>INSTANT DIGITAL ACCESS</strong>
              <span>Start reading immediately</span>
            </span>
          </div>

          <div className="hero-benefit-item">
            <span className="hero-benefit-icon">
              <ShieldCheck size={21} strokeWidth={1.7} />
            </span>

            <span className="hero-benefit-copy">
              <strong>SECURE CHECKOUT</strong>
              <span>Safe and reliable payments</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
