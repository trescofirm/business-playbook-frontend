import { useState } from "react";
import {
  ChevronDown,
  Mail,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import { faqs } from "../data/content";

import OptimizedImage from "./OptimizedImage";

function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section id="faq" className="faq section faq-redesign">
      {/* Heading */}
      <header className="faq-heading faq-redesign__heading">
        <p className="eyebrow faq-redesign__eyebrow">FAQ</p>

        <span className="faq-redesign__heading-line" />

        <h2>
          Everything You
          <br />
          <i>Need to Know</i>
        </h2>

        <p className="faq-redesign__intro">
          Find quick answers to the most common questions about our books,
          purchasing process, and how they can help you.
        </p>
      </header>

      {/* Two-column layout */}
      <div className="faq-redesign__main">
        {/* Left image */}
        <div className="faq-help-card">
        <OptimizedImage
          src="/images/Still Life Help Panel with Books and Plant.png"
          alt="Tresco books in warm natural light"
          className="faq-help-card__image"
          width={1200}
          height={800}
          sizes="(max-width: 600px) 100vw, 400px"
          loading="lazy"
        />
        </div>

        {/* Right FAQ accordion */}
        <div className="faq-accordion">
          {faqs.map((item, index) => {
            const isOpen = active === item.id;

            return (
              <article
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                key={item.id}
              >
                <button
                  type="button"
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setActive(isOpen ? null : item.id)
                  }
                >
                  <span className="faq-item__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-item__question">
                    {item.question}
                  </span>

                  <span className="faq-item__arrow">
                    <ChevronDown
                      size={19}
                      className={isOpen ? "open" : ""}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-item__answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Support strip */}
      <div className="faq-support-strip">
        <div className="faq-support-item">
          <span className="faq-support-item__icon">
            <Headphones size={27} strokeWidth={1.7} />
          </span>

          <div>
            <h4>Need More Help?</h4>
            <p>
              Can’t find the answer you’re looking for?
              <br />
              Our team is here to help you.
            </p>
          <button
                type="button"
                className="faq-email-button"
                onClick={() => {
                  const recipient = ["support", "tresco.com"].join("@");
                  window.location.href = `mailto:${recipient}`;
                }}
              >
                Contact Support by Email
              </button>
            </div>
          </div>

        <div className="faq-support-item">
          <span className="faq-support-item__icon">
            <ShieldCheck size={29} strokeWidth={1.7} />
          </span>

          <div>
            <h4>100% Secure Purchase</h4>
            <p>
              Your payment information is always
              <br />
              safe and encrypted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
