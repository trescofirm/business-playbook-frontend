import { useEffect } from "react";

import {
  SITE_URL,
  getBookUrl,
} from "../utils/seo";

const BookSEO = ({ book }) => {
  useEffect(() => {
    if (!book) return;

    const url = getBookUrl(book.id);

    const imageUrl = book.images?.cover
      ? book.images.cover.startsWith("http")
        ? book.images.cover
        : `${SITE_URL}${book.images.cover}`
      : `${SITE_URL}/images/og-image.png`;

    const title =
      book.seo?.title ||
      `${book.title} | Business Playbook`;

    const description =
      book.seo?.description ||
      book.description ||
      `Learn more about ${book.title} from Business Playbook.`;

    document.title = title;

    const setMeta = (attribute, key, value) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");

        element.setAttribute(
          attribute,
          key
        );

        document.head.appendChild(element);
      }

      element.setAttribute(
        "content",
        value
      );
    };

    /* ================================
       BASIC SEO
    ================================= */

    setMeta(
      "name",
      "description",
      description
    );

    /* ================================
       OPEN GRAPH
    ================================= */

    setMeta(
      "property",
      "og:title",
      title
    );

    setMeta(
      "property",
      "og:description",
      description
    );

    setMeta(
      "property",
      "og:url",
      url
    );

    setMeta(
      "property",
      "og:image",
      imageUrl
    );

    setMeta(
      "property",
      "og:type",
      "product"
    );

    setMeta(
      "property",
      "og:site_name",
      "Business Playbook"
    );

    /* ================================
       TWITTER
    ================================= */

    setMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "name",
      "twitter:title",
      title
    );

    setMeta(
      "name",
      "twitter:description",
      description
    );

    setMeta(
      "name",
      "twitter:image",
      imageUrl
    );

    /* ================================
       CANONICAL URL
    ================================= */

    let canonical =
      document.head.querySelector(
        'link[rel="canonical"]'
      );

    if (!canonical) {
      canonical =
        document.createElement("link");

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(
        canonical
      );
    }

    canonical.setAttribute(
      "href",
      url
    );

    /* ================================
       CLEANUP
    ================================= */

    return () => {
      document.title =
        "Business Playbook | Books for Confidence, Focus & Growth";
    };
  }, [book]);

  return null;
};

export default BookSEO;