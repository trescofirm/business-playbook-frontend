import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import WhySection from "./components/WhySection";
import Author from "./components/Author";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import OrganizationSchema from "./components/OrganizationSchema";
import WebSiteSchema from "./components/WebSiteSchema";

import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import FinalCTA from "./components/FinalCTA";

import BookPage from "./pages/BookPage";

import Books from "./pages/Books";

// =========================================================
// HOME PAGE
// =========================================================

function Home() {
  return (
    <div className="site">

      <OrganizationSchema />
      <WebSiteSchema />

      {/* NAVBAR */}
      <Navbar />

      <main>

        {/* HERO */}
        <Hero />

        {/* TICKER */}
        <Ticker />

        {/* WHY SECTION */}
        <WhySection />

        {/* AUTHOR */}
        <Author />

        {/* PRICING / BOOKS */}
        <Pricing />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        <FinalCTA />

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}


// =========================================================
// APP ROUTES
// =========================================================

function App() {
  return (
    <Routes>

      {/* ===================================================
          HOME
      =================================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/books/:slug"
        element={<BookPage />}
      />

      <Route 
        path="/books" 
        element={<Books />} 
      />

      {/* ===================================================
          CHECKOUT
      =================================================== */}

      <Route
        path="/checkout"
        element={<Checkout />}
      />


      {/* ===================================================
          LEGAL PAGES
      =================================================== */}

      <Route
        path="/terms"
        element={<Terms />}
      />

      <Route
        path="/privacy"
        element={<Privacy />}
      />

      <Route
        path="/refund"
        element={<Refund />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}


export default App;