import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect } from "react";

const NotFound = () => {

  useEffect(() => {
    let robots = document.head.querySelector(
      'meta[name="robots"]'
    );
  
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
  
    robots.setAttribute(
      "content",
      "noindex, follow"
    );
  
    return () => {
      robots.remove();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="not-found-page">
        <section className="not-found-content">
          <p className="not-found-eyebrow">
            BUSINESS PLAYBOOK
          </p>

          <h1>Page Not Found</h1>

          <p>
            The page you’re looking for doesn’t exist or may have
            been moved.
          </p>

          <Link to="/">
            Return to Business Playbook
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;