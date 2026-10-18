import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  BookOpen,
  UserRound,
  CircleHelp,
  Star,
  FileText,
  ShieldCheck,
  RefreshCw,
  Mail,
} from "lucide-react";

function Footer() {
  const navigate = useNavigate();

  /* =========================================
     SCROLL TO HOME SECTION
  ========================================= */

  const scrollTo = (id) => {
    const goToSection = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Already on Home page
    if (window.location.pathname === "/") {
      goToSection();
      return;
    }

    // Go Home first, then scroll
    navigate("/");

    setTimeout(() => {
      goToSection();
    }, 150);
  };

  /* =========================================
     HOME
  ========================================= */

  const goHome = () => {
    navigate("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /* =========================================
     LEGAL PAGES
  ========================================= */

  const goToLegalPage = (path) => {
    navigate(path);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /* =========================================
     EMAIL
  ========================================= */

  const sendEmail = () => {
    window.location.href =
      "mailto:lakshaymittal1805@gmail.com";
  };

  /* =========================================
     INSTAGRAM
  ========================================= */

  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/psychologyinreal/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     EXPLORE BOOKS
  ========================================= */

  const handleExploreBooks = () => {
    scrollTo("pricing");
  };

  return (
    <footer className="footer footer-dark-redesign">

      {/* =====================================
          MAIN FOOTER
      ===================================== */}

      <div className="footer-main">

        {/* ===================================
            BRAND
        =================================== */}

        <div className="footer-brand">

          <button
            className="footer-brand-button"
            onClick={goHome}
            type="button"
            aria-label="Go to Business Playbook home"
          >

            <img
              src="/tresco-logo.png"
              alt="TRESCO"
              className="tresco-navbar-logo-image"
            />

          </button>


          <p className="footer-brand-description">
            Premium practical books built around
            confidence, focus, discipline, mindset
            and personal growth.
          </p>


          <p className="footer-brand-tagline">
            Written to be used,
            <br />
            not just finished.
          </p>

        </div>


        {/* ===================================
            EXPLORE
        =================================== */}

        <div className="footer-section">

          <h3>
            EXPLORE
          </h3>


          <Link to="/books" className="footer-icon-link">
          <BookOpen />
            <span>Books</span>
          </Link>
                  
          <button
            className="footer-icon-link"
            onClick={() => scrollTo("author")}
            type="button"
          >
            <UserRound />
            <span>Author</span>
          </button>
                  
          <button
            className="footer-icon-link"
            onClick={() => scrollTo("faq")}
            type="button"
          >
            <CircleHelp />
            <span>FAQ</span>
          </button>
                  
          <button
            className="footer-icon-link"
            onClick={() => scrollTo("reviews")}
            type="button"
          >
            <Star />
            <span>Reviews</span>
          </button>

        </div>


        {/* ===================================
            LEGAL
        =================================== */}

        <div className="footer-section footer-legal">
          <h3>LEGAL</h3>

          <button
            className="footer-icon-link"
            onClick={() => goToLegalPage("/terms")}
            type="button"
          >
            <FileText aria-hidden="true" />
            <span>Terms &amp; Conditions</span>
          </button>

          <button
            className="footer-icon-link"
            onClick={() => goToLegalPage("/privacy")}
            type="button"
          >
            <ShieldCheck aria-hidden="true" />
            <span>Privacy Policy</span>
          </button>

          <button
            className="footer-icon-link"
            onClick={() => goToLegalPage("/refund")}
            type="button"
          >
            <RefreshCw aria-hidden="true" />
            <span>Refund Policy</span>
          </button>
        </div>


        {/* ===================================
            CONTACT
        =================================== */}

        <div className="footer-section footer-contact">

          <h3>
            CONTACT
          </h3>


          {/* EMAIL */}

          <button
            className="footer-contact-link"
            onClick={sendEmail}
            type="button"
          >

            <Mail size={14} />

            <span>
              lakshaymittal1805@gmail.com
            </span>

          </button>


          {/* INSTAGRAM */}

          <button
            className="footer-contact-link"
            onClick={openInstagram}
            type="button"
          >

            <span
              className="footer-instagram-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </span>

            <span>
              @psychologyinreal
            </span>

          </button>


          <p className="footer-support">
            For questions, support and
            purchase assistance.
          </p>

        </div>

      </div>


      {/* =====================================
          DIVIDER
      ===================================== */}

      <div className="footer-divider" />


      {/* =====================================
          FOOTER BOTTOM
      ===================================== */}

      <div className="footer-bottom">

        <span>
          © 2026 Business Playbook.
          All rights reserved.
        </span>


        <div className="footer-trust">

          <span>
            <ShieldCheck size={13} />
            Secure payments
          </span>


          <span className="footer-dot">
            ·
          </span>


          <span>
            Instant digital delivery
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;