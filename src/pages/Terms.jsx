import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();

  return (
    <main className="legal-page">
      <div className="legal-container">

        {/* =====================================================
            BACK
        ====================================================== */}

        <button
          className="legal-back"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={16} />
          BACK TO BUSINESS PLAYBOOK
        </button>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="legal-header">
          <p className="eyebrow">LEGAL</p>

          <h1>
            Terms & <i>Conditions.</i>
          </h1>

          <p>Last updated: September 2026</p>
        </header>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="legal-content">

          {/* ===================================================
              01 — INTRODUCTION
          ==================================================== */}

          <section>
            <span className="legal-number">01</span>

            <h2>Introduction</h2>

            <p>
              Welcome to Business Playbook. These Terms &
              Conditions govern your access to and use of the
              Business Playbook website and your purchase of our
              digital products.
            </p>

            <p>
              By accessing the website, placing an order, or
              downloading a purchased product, you agree to be
              bound by these Terms & Conditions. If you do not
              agree with these terms, please do not use the
              website or purchase our products.
            </p>
          </section>

          {/* ===================================================
              02 — PRODUCTS
          ==================================================== */}

          <section>
            <span className="legal-number">02</span>

            <h2>Products</h2>

            <p>
              Business Playbook currently offers digital books,
              workbooks, guides, and related downloadable
              digital content.
            </p>

            <p>
              Digital products are generally delivered in
              downloadable electronic formats such as PDF.
              The format and content included with each product
              are described on the relevant product or checkout
              page.
            </p>

            <p>
              Product descriptions, images, prices, promotions,
              included formats, and availability may be updated
              from time to time.
            </p>
          </section>

          {/* ===================================================
              03 — ELIGIBILITY & ACCOUNT INFORMATION
          ==================================================== */}

          <section>
            <span className="legal-number">03</span>

            <h2>Customer Information</h2>

            <p>
              When placing an order, you agree to provide
              accurate and complete information, including your
              name, email address, country, and other information
              requested during checkout.
            </p>

            <p>
              You are responsible for ensuring that your email
              address is correct because purchase-related
              communications and digital-access information may
              be sent to the email address provided during
              checkout.
            </p>

            <p>
              We may be unable to provide or recover access
              correctly if inaccurate information is supplied.
            </p>
          </section>

          {/* ===================================================
              04 — PRICING & CURRENCY
          ==================================================== */}

          <section>
            <span className="legal-number">04</span>

            <h2>Pricing & Currency</h2>

            <p>
              Business Playbook may display different pricing
              depending on the customer's country or checkout
              currency.
            </p>

            <p>
              For customers purchasing from India, prices are
              currently processed in Indian Rupees (INR).
              Current India pricing includes individual prices
              of ₹499, ₹299, and ₹299 for the three listed
              books, with a complete collection price of ₹999.
            </p>

            <p>
              For international customers, prices are currently
              processed in United States Dollars (USD). Current
              international pricing includes individual prices
              of $19.99, $15.99, and $15.99, with a complete
              collection price of $45.00.
            </p>

            <p>
              Prices may change in the future. The price and
              currency shown to you at the time of checkout are
              the applicable amounts for that order, subject to
              successful payment processing.
            </p>
          </section>

          {/* ===================================================
              05 — COLLECTION / BUNDLE
          ==================================================== */}

          <section>
            <span className="legal-number">05</span>

            <h2>Collection & Bundle Pricing</h2>

            <p>
              When all three Business Playbook products are
              purchased together, the checkout may apply a
              complete-collection price instead of charging the
              individual product prices separately.
            </p>

            <p>
              The current collection price is ₹999 for eligible
              Indian orders and $45.00 for eligible international
              orders.
            </p>

            <p>
              Any bundle saving displayed during checkout is
              calculated from the applicable individual product
              prices and the collection price.
            </p>
          </section>

          {/* ===================================================
              06 — PROMOTIONAL CODES
          ==================================================== */}

          <section>
            <span className="legal-number">06</span>

            <h2>Coupons & Promotional Codes</h2>

            <p>
              Promotional or coupon codes may be offered from
              time to time. A coupon is valid only when accepted
              by the checkout system and may be subject to
              country, product, date, or other eligibility
              restrictions.
            </p>

            <p>
              For the current pricing configuration, the
              promotional code <strong>PLAYBOOK5</strong> provides
              a 5% discount for eligible Indian orders.
            </p>

            <p>
              The promotional code <strong>PIR</strong> provides
              a 10% discount for eligible international orders.
            </p>

            <p>
              Coupons cannot be transferred, exchanged for cash,
              or used outside the eligibility rules configured
              for the promotion.
            </p>

            <p>
              We may deactivate, replace, restrict, or modify
              promotional codes at any time.
            </p>
          </section>

          {/* ===================================================
              07 — ORDERS & PAYMENT
          ==================================================== */}

          <section>
            <span className="legal-number">07</span>

            <h2>Orders & Payments</h2>

            <p>
              Placing an order does not guarantee completion until
              payment is successfully processed and verified by
              our payment system.
            </p>

            <p>
              Payments are processed through third-party payment
              providers, including Razorpay and any payment
              methods made available through the checkout
              provider.
            </p>

            <p>
              Available payment methods may vary based on the
              customer's country, currency, account eligibility,
              payment provider availability, and other factors.
            </p>

            <p>
              For eligible Indian orders, available payment
              methods may include UPI, debit or credit cards,
              and NetBanking.
            </p>

            <p>
              International payment methods are subject to the
              payment provider's availability and eligibility
              requirements. Not every payment method is
              guaranteed to be available for every customer.
            </p>

            <p>
              We do not store complete payment-card credentials
              on the Business Playbook website. Payment
              processing is handled by the applicable payment
              provider.
            </p>
          </section>

          {/* ===================================================
              08 — PAYMENT VERIFICATION
          ==================================================== */}

          <section>
            <span className="legal-number">08</span>

            <h2>Payment Verification</h2>

            <p>
              Payment completion is subject to successful
              server-side verification of the payment transaction.
            </p>

            <p>
              If a payment is cancelled, fails, is not verified,
              or is otherwise rejected by the payment provider,
              the order may remain unpaid and digital access may
              not be provided.
            </p>

            <p>
              We may investigate payment discrepancies,
              duplicate transactions, suspicious transactions,
              or other transaction issues before providing
              access to purchased products.
            </p>
          </section>

          {/* ===================================================
              09 — DIGITAL DELIVERY
          ==================================================== */}

          <section>
            <span className="legal-number">09</span>

            <h2>Digital Delivery</h2>

            <p>
              After successful payment verification, digital
              products may be made available through secure
              download links and/or purchase-related email
              instructions.
            </p>

            <p>
              Download links generated by the system are
              temporary security-controlled links. Under the
              current system configuration, secure download
              links are intended to remain valid for up to
              30 days and may allow up to 5 downloads per
              purchased book.
            </p>

            <p>
              Download limits and expiration periods may be
              changed for future orders as part of security,
              infrastructure, or product-management updates.
            </p>

            <p>
              You are responsible for downloading and securely
              storing your purchased digital products after
              purchase.
            </p>
          </section>

          {/* ===================================================
              10 — DOWNLOAD SECURITY
          ==================================================== */}

          <section>
            <span className="legal-number">10</span>

            <h2>Download Security</h2>

            <p>
              Download links are generated using security
              mechanisms intended to reduce unauthorized access
              and sharing.
            </p>

            <p>
              You must not attempt to bypass download limits,
              modify download URLs, access another customer's
              download token, or interfere with the security
              mechanisms used to protect purchased content.
            </p>

            <p>
              If you believe a download link has been exposed or
              misused, please contact us through the support
              channel provided on the website.
            </p>
          </section>

          {/* ===================================================
              11 — REFUNDS & CANCELLATIONS
          ==================================================== */}

          <section>
            <span className="legal-number">11</span>

            <h2>Refunds & Cancellations</h2>

            <p>
              Refund requests are handled according to our
              separate Refund Policy.
            </p>

            <p>
              Please review the Refund Policy before purchasing.
              The applicable refund terms depend on the nature
              of the product, payment status, delivery status,
              and other circumstances described in that policy.
            </p>

            <p>
              You can review our Refund Policy here:
            </p>

            <p>
              <Link to="/refund">
                Refund Policy
              </Link>
            </p>
          </section>

          {/* ===================================================
              12 — INTELLECTUAL PROPERTY
          ==================================================== */}

          <section>
            <span className="legal-number">12</span>

            <h2>Intellectual Property</h2>

            <p>
              All Business Playbook books, workbooks, text,
              graphics, illustrations, branding, logos, website
              content, layouts, and related materials are owned
              by or licensed to Business Playbook unless
              otherwise stated.
            </p>

            <p>
              A purchase grants you a limited, personal,
              non-exclusive, non-transferable right to use the
              purchased digital product for your own lawful
              personal use.
            </p>

            <p>
              You must not reproduce, resell, redistribute,
              publish, upload, share, sublicense, commercially
              exploit, or otherwise distribute purchased digital
              products without prior written permission.
            </p>
          </section>

          {/* ===================================================
              13 — PROHIBITED USE
          ==================================================== */}

          <section>
            <span className="legal-number">13</span>

            <h2>Prohibited Use</h2>

            <p>
              You agree not to use the website or its systems
              for unlawful, fraudulent, abusive, or unauthorized
              purposes.
            </p>

            <p>
              Prohibited activities include attempting to gain
              unauthorized access to accounts, payment systems,
              download tokens, databases, APIs, or other
              protected systems.
            </p>

            <p>
              We may restrict or suspend access where we
              reasonably believe that the website, payment
              systems, products, or other users are being abused
              or misused.
            </p>
          </section>

          {/* ===================================================
              14 — THIRD-PARTY SERVICES
          ==================================================== */}

          <section>
            <span className="legal-number">14</span>

            <h2>Third-Party Services</h2>

            <p>
              Business Playbook may rely on third-party services
              for payment processing, email delivery, hosting,
              analytics, security, advertising, or other website
              functionality.
            </p>

            <p>
              These third-party services operate under their own
              terms, policies, security practices, and
              availability requirements.
            </p>

            <p>
              We are not responsible for interruptions,
              restrictions, or failures caused solely by a
              third-party provider.
            </p>
          </section>

          {/* ===================================================
              15 — EDUCATIONAL DISCLAIMER
          ==================================================== */}

          <section>
            <span className="legal-number">15</span>

            <h2>Educational & Informational Disclaimer</h2>

            <p>
              Business Playbook products are provided for
              educational and informational purposes.
            </p>

            <p>
              The products are not intended to constitute
              legal, medical, financial, investment, tax,
              psychological, or other professional advice.
            </p>

            <p>
              Individual experiences and results may vary.
              Business Playbook does not guarantee any specific
              personal, financial, professional, relationship,
              business, or other outcome from using its products.
            </p>
          </section>

          {/* ===================================================
              16 — WEBSITE AVAILABILITY
          ==================================================== */}

          <section>
            <span className="legal-number">16</span>

            <h2>Website Availability</h2>

            <p>
              We aim to keep the website and digital services
              available and functional, but we do not guarantee
              uninterrupted or error-free availability.
            </p>

            <p>
              The website or particular features may
              occasionally be unavailable because of maintenance,
              updates, security measures, hosting issues,
              payment-provider outages, or circumstances beyond
              our reasonable control.
            </p>
          </section>

          {/* ===================================================
              17 — LIMITATION OF LIABILITY
          ==================================================== */}

          <section>
            <span className="legal-number">17</span>

            <h2>Limitation of Liability</h2>

            <p>
              To the extent permitted by applicable law,
              Business Playbook will not be responsible for
              indirect, incidental, special, consequential, or
              loss-of-profit damages arising from the use of the
              website, inability to use the website, or use of
              purchased digital products.
            </p>

            <p>
              Nothing in these Terms & Conditions is intended to
              exclude or limit any liability that cannot
              lawfully be excluded or limited.
            </p>
          </section>

          {/* ===================================================
              18 — CHANGES
          ==================================================== */}

          <section>
            <span className="legal-number">18</span>

            <h2>Changes to These Terms</h2>

            <p>
              We may update these Terms & Conditions when our
              website, products, payment methods, delivery
              systems, or legal requirements change.
            </p>

            <p>
              Updated terms will be published on this page with
              a revised "Last updated" date.
            </p>

            <p>
              Your continued use of the website after updated
              terms are published constitutes your acceptance of
              the revised terms to the extent permitted by
              applicable law.
            </p>
          </section>

          {/* ===================================================
              19 — PRIVACY
          ==================================================== */}

          <section>
            <span className="legal-number">19</span>

            <h2>Privacy</h2>

            <p>
              Our collection and use of customer information is
              described in our Privacy Policy.
            </p>

            <p>
              You can review our Privacy Policy here:
            </p>

            <p>
              <Link to="/privacy">
                Privacy Policy
              </Link>
            </p>
          </section>

          {/* ===================================================
              20 — CONTACT
          ==================================================== */}

          <section className="legal-contact">
            <span className="legal-number">20</span>

            <h2>Contact</h2>

            <p>
              If you have questions about these Terms &
              Conditions, an order, payment, download access,
              or a digital product, please use the official
              support/contact details provided by Business
              Playbook on the website.
            </p>

            <p>
              For refund-related requests, please review the
              Refund Policy and use the available support
              channel.
            </p>
          </section>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div className="legal-footer">
          <button
            onClick={() => navigate("/")}
            type="button"
          >
            <ArrowLeft size={16} />
            RETURN TO BUSINESS PLAYBOOK
          </button>
        </div>

      </div>
    </main>
  );
}

export default Terms;