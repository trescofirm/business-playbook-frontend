import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Privacy() {
  const navigate = useNavigate();

  return (
    <main className="legal-page">
      <div className="legal-container">

        {/* Back Button */}
        <button
          className="legal-back"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={16} />
          <span>
            BACK TO BUSINESS PLAYBOOK
          </span>
        </button>

        {/* Header */}
        <header className="legal-header">
          <div className="legal-header-icon">
            <ShieldCheck size={22} />
          </div>

          <p className="eyebrow">
            LEGAL
          </p>

          <h1>
            Privacy <i>Policy.</i>
          </h1>

          <p className="legal-updated">
            Last updated: September 2026
          </p>
        </header>

        {/* Content */}
        <div className="legal-content">

          {/* 01 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                01
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Introduction
            </h2>

            <p>
              Business Playbook respects
              your privacy and is committed
              to protecting the information
              you provide while using our
              website and purchasing our
              digital products.
            </p>

            <p>
              This Privacy Policy explains
              what information we may collect,
              how we use it, how third-party
              services may process it, and
              the choices available to you.
            </p>
          </section>

          {/* 02 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                02
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Information We Collect
            </h2>

            <p>
              When you place an order, make a
              payment, download a purchased
              product, contact us, or interact
              with our website, we may collect
              information such as:
            </p>

            <ul>
              <li>
                Your first and last name
              </li>

              <li>
                Email address
              </li>

              <li>
                Country and state or region
              </li>

              <li>
                Order and purchase information
              </li>

              <li>
                Payment and transaction
                information handled through
                payment providers
              </li>

              <li>
                Information you provide when
                contacting support
              </li>

              <li>
                Technical and usage
                information collected through
                cookies, analytics, or similar
                technologies where applicable
              </li>
            </ul>

            <p>
              We only request information
              that is reasonably necessary
              to provide our products,
              process transactions, operate
              the website, provide support,
              and protect our services.
            </p>
          </section>

          {/* 03 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                03
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              How We Use Your Information
            </h2>

            <p>
              Your information may be used
              for the following purposes:
            </p>

            <ul>
              <li>
                Process and manage orders.
              </li>

              <li>
                Process and verify payments.
              </li>

              <li>
                Provide purchased digital
                products and secure downloads.
              </li>

              <li>
                Send order confirmations and
                purchase-related emails.
              </li>

              <li>
                Respond to customer support
                requests.
              </li>

              <li>
                Improve our website,
                products, and services.
              </li>

              <li>
                Detect fraud and unauthorized
                activity.
              </li>

              <li>
                Measure website and advertising
                performance where applicable.
              </li>
            </ul>
          </section>

          {/* 04 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                04
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Payment Information
            </h2>

            <p>
              Payments may be processed
              through third-party payment
              providers such as Razorpay
              and, where enabled, PayPal.
            </p>

            <p>
              We do not intend to store
              complete payment card
              information on our website.
              Payment details are handled
              through the relevant payment
              provider according to its
              applicable privacy and security
              practices.
            </p>

            <p>
              We may retain transaction
              information such as order
              numbers, payment identifiers,
              payment status, amount,
              currency, and related order
              records for order management,
              accounting, security, and
              customer support.
            </p>
          </section>

          {/* 05 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                05
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Digital Products and Downloads
            </h2>

            <p>
              Business Playbook primarily
              provides digital products and
              downloadable PDF materials.
            </p>

            <p>
              After a successful payment,
              we may generate secure download
              links associated with the
              purchased products.
            </p>

            <p>
              Download links may have limited
              validity and download limits
              for security and abuse
              prevention.
            </p>
          </section>

          {/* 06 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                06
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Cookies, Analytics and
              Advertising
            </h2>

            <p>
              Our website may use cookies
              and similar technologies to
              maintain functionality,
              remember preferences,
              understand website usage,
              measure performance, and
              improve our services.
            </p>

            <p>
              We may also use Meta
              technologies, including Meta
              Pixel or related advertising and
              measurement tools, to understand
              interactions with our website,
              measure advertising performance,
              and help deliver relevant
              advertising.
            </p>

            <p>
              Third-party advertising,
              analytics, and technology
              providers may process certain
              information according to their
              own applicable policies.
            </p>

            <p>
              You may be able to control
              certain cookies through your
              browser and, where available,
              through applicable privacy or
              cookie settings.
            </p>
          </section>

          {/* 07 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                07
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Third-Party Services
            </h2>

            <p>
              We may use third-party
              providers for payment
              processing, website hosting,
              database infrastructure,
              email delivery, analytics,
              advertising, security, and
              digital product delivery.
            </p>

            <p>
              These providers may process
              relevant information as
              necessary to provide their
              services and according to their
              own applicable privacy policies
              and terms.
            </p>

            <p>
              Examples may include payment
              providers such as Razorpay or
              PayPal and advertising or
              measurement technologies
              provided by Meta.
            </p>
          </section>

          {/* 08 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                08
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Data Security
            </h2>

            <p>
              We take reasonable technical
              and organizational measures to
              protect information from
              unauthorized access,
              alteration, disclosure, or
              destruction.
            </p>

            <p>
              However, no method of
              electronic transmission or
              storage can be guaranteed to be
              completely secure. You should
              therefore understand that no
              online service can guarantee
              absolute security.
            </p>
          </section>

          {/* 09 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                09
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Your Choices
            </h2>

            <p>
              You may contact us regarding
              your personal information or
              ask questions about how your
              information is collected and
              handled.
            </p>

            <p>
              Where applicable, you may also
              request correction of inaccurate
              information or ask about the
              handling of your personal data.
            </p>

            <p>
              You may also manage certain
              browser cookies and available
              advertising or privacy settings
              through your device, browser,
              or relevant third-party service.
            </p>
          </section>

          {/* 10 */}
          <section className="legal-section">
            <div className="legal-section-top">
              <span className="legal-number">
                10
              </span>

              <span className="legal-line" />
            </div>

            <h2>
              Contact
            </h2>

            <p>
              If you have questions,
              concerns, or requests relating
              to this Privacy Policy, please
              contact us.
            </p>

            <a
              className="legal-email"
              href="mailto:support@businessplaybook.com"
            >
              support@businessplaybook.com
            </a>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="legal-footer">
          <button
            onClick={() => navigate("/")}
            type="button"
          >
            <ArrowLeft size={16} />
            <span>
              RETURN TO BUSINESS PLAYBOOK
            </span>
          </button>
        </div>

      </div>
    </main>
  );
}

export default Privacy;