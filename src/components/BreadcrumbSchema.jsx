
import { useEffect } from "react";
import { SITE_URL, getBookUrl } from "../utils/seo";

const SCRIPT_ID = "bp-breadcrumb-schema";

const BreadcrumbSchema = ({ book }) => {
  useEffect(() => {
    if (!book) return;

    const baseUrl = SITE_URL.replace(/\/$/, "");

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Books",
          item: `${baseUrl}/books`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: book.title,
          item: getBookUrl(book.id),
        },
      ],
    };

    let script = document.getElementById(SCRIPT_ID);

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [book]);

  return null;
};

export default BreadcrumbSchema;
