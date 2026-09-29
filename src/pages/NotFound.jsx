import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
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