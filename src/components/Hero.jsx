import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Zap,
  BookOpen,
  Globe,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { books, collection } from "../data/content";

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const { addToCart } = useCart();

  /* =========================================================
     SCROLL
  ========================================================= */

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =========================================================
     THREE BOOK COLLECTION

     Uses the SAME book data from content.js
  ========================================================= */

  const collectionBooks = books.slice(0, 3);

  /* =========================================================
     GET ALL THREE BOOKS
  ========================================================= */

  const handleBuyAllBooks = () => {
    collectionBooks.forEach((book) => {
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
    });

    setTimeout(() => {
      window.dispatchEvent(new Event("cart:open"));
    }, 150);
  };

  /* =========================================================
     BOOK DATA
  ========================================================= */

  const book1 = books[0];
  const book2 = books[1];
  const book3 = books[2];

  return (
    <section id="home" className="hero">
      <div className="hero-container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="hero-copy">

          {/* =================================================
              EYEBROW
          ================================================= */}

          <motion.div
            className="hero-eyebrow"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span className="eyebrow-line" />

            <span>
              THREE PRACTICAL BOOKS
            </span>

            <span className="hero-dot">
              •
            </span>

            <span>
              DIGITAL COLLECTION
            </span>
          </motion.div>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <motion.h1
            className="hero-title"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
            }}
          >
            <span>
              Three Books.
            </span>

            <em>
              One Complete
              <br />
              Life Upgrade.
            </em>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            Build confidence. Take back your focus.
            Develop stronger habits and a better mindset.
            Three practical playbooks designed to be{" "}
            <strong>used</strong>, not just finished.
          </motion.p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <motion.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
          >

            {/* =============================================
                BUY ALL THREE
            ============================================= */}

            <button
              className="hero-buy"
              onClick={handleBuyAllBooks}
              type="button"
            >
              <ShoppingBag size={17} />

              <span>
                GET ALL 3 BOOKS — $45
              </span>

              <del>
                $51.97
              </del>

              <ArrowUpRight size={17} />
            </button>

            {/* =============================================
                EXPLORE
            ============================================= */}

            <button
              className="hero-explore"
              onClick={() => scrollTo("pricing")}
              type="button"
            >
              <span>
                EXPLORE THE BOOKS
              </span>

              <ArrowUpRight size={17} />
            </button>

          </motion.div>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <motion.div
            className="hero-benefits"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
          >

            <div>
              <Zap size={15} />

              <span>
                Instant delivery
              </span>
            </div>

            <div>
              <BookOpen size={15} />

              <span>
                PDF + Digital
              </span>
            </div>

            <div>
              <Globe size={15} />

              <span>
                Available worldwide
              </span>
            </div>

          </motion.div>

        </div>

        {/* =================================================
            RIGHT SIDE — THREE BOOKS
        ================================================= */}

        <motion.div
          className="hero-books"
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
          }}
        >

          {/* =================================================
              BOOK 1
              IMPORTANT:
              Uses content.js image
          ================================================= */}

          <motion.div
            className="hero-book hero-book-1"
            initial={{
              opacity: 0,
              y: 35,
              rotate: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: -8,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
          >
            <img
              src={book1?.images?.cover}
              alt={book1?.title || "How to Attract Women"}
              draggable="false"
            />
          </motion.div>

          {/* =================================================
              BOOK 2 — CENTER
          ================================================= */}

          <motion.div
            className="hero-book hero-book-2"
            initial={{
              opacity: 0,
              y: 45,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.6,
            }}
          >
            <img
              src={book2?.images?.cover}
              alt={
                book2?.title ||
                "30 Day Dopamine Detox Workbook"
              }
              draggable="false"
            />
          </motion.div>

          {/* =================================================
              BOOK 3
          ================================================= */}

          <motion.div
            className="hero-book hero-book-3"
            initial={{
              opacity: 0,
              y: 35,
              rotate: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 8,
            }}
            transition={{
              duration: 0.8,
              delay: 0.75,
            }}
          >
            <img
              src={book3?.images?.cover}
              alt={
                book3?.title ||
                "How to Unlock Your Focus"
              }
              draggable="false"
            />
          </motion.div>

          {/* =================================================
              GOLD GLOW
          ================================================= */}

          <div className="hero-books-glow" />

          {/* =================================================
              COLLECTION LABEL
          ================================================= */}

          <motion.div
            className="hero-collection-badge"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 1,
            }}
          >
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;