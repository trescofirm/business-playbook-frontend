import { useEffect } from "react";

import { getBookUrl } from "../utils/seo";

const BookSEO = ({ book }) => {
  useEffect(() => {
    const url = getBookUrl(book.id);
    

    const image = book.images?.cover
      ? book.images.cover.startsWith("http")
        ? book.images.cover
        : `https://tresco.firm.in${book.images.cover}`
        : "";

    const title =
      book.seo?.title || `${book.title} | Business Playbook`;

    const description =
      book.seo?.description || book.description;

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


    setMeta(
      "name",
      "description",
      description
    );


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
      image
    );


    setMeta(
      "property",
      "og:type",
      "product"
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
      image
    );

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


    return () => {
      document.title =
        "Business Playbook | Practical Books for Confidence, Focus & Personal Growth";
    };

  }, [book]);

  return null;
};

export default BookSEO;