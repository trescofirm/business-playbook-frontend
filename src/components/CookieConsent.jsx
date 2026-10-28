import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "bp_consent";

const update = (granted) => {
  const value = granted ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });

  window.dataLayer.push({ event: "consent_update" });
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) update(saved === "granted");
      else setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (granted) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    update(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent">
      <p className="cookie-consent-text">
        We use cookies to measure traffic and improve your experience.
        See our <Link to="/privacy">Privacy Policy</Link>.
      </p>

      <div className="cookie-consent-actions">
        <button
          type="button"
          className="cookie-btn cookie-btn-reject"
          onClick={() => choose(false)}
        >
          Reject
        </button>
        <button
          type="button"
          className="cookie-btn cookie-btn-accept"
          onClick={() => choose(true)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}