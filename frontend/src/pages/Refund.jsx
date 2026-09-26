import {
  ArrowLeft,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Refund() {
  const navigate = useNavigate();

  return (
    <main className="legal-page">
      <div className="legal-container">

        {/* =================================================
            BACK
        ================================================= */}

        <button
          className="legal-back"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={16} />
          BACK TO BUSINESS PLAYBOOK
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="legal-header">
          <p className="eyebrow">
            LEGAL
          </p>

          <h1>
            Refund <i>Policy.</i>
          </h1>

          <p>
            Last updated: September 2026
          </p>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="legal-content">

          {/* =================================================
              01
          ================================================= */}

          <section>
            <span className="legal-number">
              01
            </span>

            <h2>
              General Policy
            </h2>

            <p>
              Business Playbook primarily
              provides digital books and
              downloadable digital products.
              Because digital products may be
              accessed or downloaded immediately
              after purchase, refunds are generally
              not available once the purchased
              digital product has been delivered
              or accessed.
            </p>

            <p>
              Refunds may be considered in cases
              described in this policy, subject to
              review and applicable law.
            </p>
          </section>

          {/* =================================================
              02
          ================================================= */}

          <section>
            <span className="legal-number">
              02
            </span>

            <h2>
              Digital Products
            </h2>

            <p>
              Digital products, including PDF
              books and other downloadable files,
              are considered delivered when the
              customer receives access to the
              purchased product or the delivery
              instructions are sent to the email
              address provided during checkout.
            </p>

            <p>
              Once a digital product has been
              successfully delivered, accessed,
              or downloaded, the purchase is
              generally non-refundable.
            </p>
          </section>

          {/* =================================================
              03
          ================================================= */}

          <section>
            <span className="legal-number">
              03
            </span>

            <h2>
              Technical Access Problems
            </h2>

            <p>
              If you experience a genuine
              technical problem that prevents you
              from accessing or downloading a
              product you purchased, please contact
              our support team within
              <strong> 7 calendar days </strong>
              of the purchase.
            </p>

            <p>
              We will first attempt to resolve the
              access or delivery issue. If the
              problem cannot reasonably be resolved,
              a refund may be considered after
              review.
            </p>
          </section>

          {/* =================================================
              04
          ================================================= */}

          <section>
            <span className="legal-number">
              04
            </span>

            <h2>
              Duplicate Charges
            </h2>

            <p>
              If you believe you were charged more
              than once for the same order, please
              contact our support team within
              <strong> 7 calendar days </strong>
              and provide the relevant order or
              payment information.
            </p>

            <p>
              After verification, confirmed
              duplicate charges may be refunded
              through the original payment method.
            </p>
          </section>

          {/* =================================================
              05
          ================================================= */}

          <section>
            <span className="legal-number">
              05
            </span>

            <h2>
              Incorrect Customer Information
            </h2>

            <p>
              Customers are responsible for
              providing accurate information during
              checkout, including their name and
              email address.
            </p>

            <p>
              Business Playbook may not be
              responsible for failed delivery or
              access caused by incorrect information
              supplied by the customer.
            </p>

            <p>
              Please contact support as soon as
              possible if you notice incorrect
              information after placing an order.
            </p>
          </section>

          {/* =================================================
              06
          ================================================= */}

          <section>
            <span className="legal-number">
              06
            </span>

            <h2>
              Refund Requests
            </h2>

            <p>
              Refund requests should include the
              customer name, order number, email
              address used for the purchase, reason
              for the request, and any relevant
              supporting information.
            </p>

            <p>
              Requests for eligible technical or
              duplicate-payment issues should
              generally be submitted within
              <strong> 7 calendar days </strong>
              of the purchase.
            </p>

            <p>
              Each request will be reviewed based
              on the circumstances of the purchase,
              this policy, and applicable law.
            </p>
          </section>

          {/* =================================================
              07
          ================================================= */}

          <section>
            <span className="legal-number">
              07
            </span>

            <h2>
              Approved Refunds
            </h2>

            <p>
              When a refund is approved, we will
              generally initiate the refund to the
              original payment method within
              <strong> 5–10 business days </strong>
              after approval.
            </p>

            <p>
              The time required for the refunded
              amount to appear in the customer's
              account may vary depending on the
              payment provider, bank, card issuer,
              or other financial institution.
            </p>

            <p>
              Razorpay states that merchant-initiated
              refunds are routed to the same payment
              method used for the transaction. :contentReference[oaicite:1]{index=1}
            </p>
          </section>

          {/* =================================================
              08
          ================================================= */}

          <section>
            <span className="legal-number">
              08
            </span>

            <h2>
              Cancellations
            </h2>

            <p>
              Customers may cancel an order before
              completing payment. Once payment has
              been successfully completed and digital
              access has been provided, cancellation
              is generally not available except where
              a refund is permitted under this policy
              or applicable law.
            </p>
          </section>

          {/* =================================================
              09
          ================================================= */}

          <section>
            <span className="legal-number">
              09
            </span>

            <h2>
              Contact
            </h2>

            <p>
              For refund, payment, or order-related
              questions, please contact our support
              team using the official email address
              provided on the website.
            </p>

            {/* 
              IMPORTANT:
              Replace this email with the client's
              actual support email before publishing.
            */}

            <a
              href="mailto:support@businessplaybook.com"
              className="legal-email"
            >
              <Mail size={16} />
              lakshaymittal1805@gmail.com
            </a>
          </section>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="legal-footer">

          <div className="legal-footer-note">
            <ShieldCheck size={16} />

            <span>
              Refunds are subject to the terms
              described in this policy and
              applicable law.
            </span>
          </div>

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

export default Refund;