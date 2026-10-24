// import { SITE_URL, getBookUrl } from "../utils/seo";

// const ProductSchema = ({ book }) => {
//   if (!book) return null;

//   const productUrl = getBookUrl(book.id);

//   const getAbsoluteImageUrl = (image) => {
//     if (!image) return null;

//     return image.startsWith("http")
//       ? image
//       : `${SITE_URL}${image}`;
//   };

//   const coverImage = getAbsoluteImageUrl(
//     book.images?.cover
//   );

//   const mockupImage = getAbsoluteImageUrl(
//     book.images?.mockup
//   );

//   const images = [
//     coverImage,
//     mockupImage,
//   ].filter(Boolean);

//   const schema = {
//     "@context": "https://schema.org",

//     "@type": ["Product", "Book"],

//     name: book.title,

//     description: book.description,

//     image: images,

//     url: productUrl,

//     category:
//       book.seo?.primaryTopic ||
//       book.category ||
//       undefined,

//     bookFormat: "https://schema.org/EBook",
//     inLanguage: "en",

//     genre: book.genre || undefined,

//     brand: {
//       "@type": "Brand",
//       name: "Business Playbook",
//     },

//     offers: {
//       "@type": "Offer",

//       url: productUrl,

//       priceCurrency: book.currency || "USD",

//       price: String(book.price),

//       availability: book.available
//         ? "https://schema.org/InStock"
//         : "https://schema.org/OutOfStock",

//       itemCondition:
//         "https://schema.org/NewCondition",
//     },
//   };

//   if (book.author) {
//     schema.author = {
//       "@type": "Person",
//       name: book.author,
//     };
//   }

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{
//         __html: JSON.stringify(schema),
//       }}
//     />
//   );
// };

// export default ProductSchema;



import { useEffect } from "react";
import { SITE_URL, getBookUrl } from "../utils/seo";

const SCRIPT_ID = "bp-product-schema";

const ProductSchema = ({ book }) => {
  useEffect(() => {
    if (!book) return;

    const absoluteUrl = (image) => {
      if (!image) return undefined;
      return image.startsWith("http")
        ? image
        : `${SITE_URL.replace(/\/$/, "")}${image}`;
    };

    const productUrl = getBookUrl(book.id);

    const images = [
      absoluteUrl(book.images?.cover),
      absoluteUrl(book.images?.mockup),
    ].filter(Boolean);

    const schema = {
      "@context": "https://schema.org",
      "@type": ["Product", "Book"],
      name: book.title,
      description: book.description,
      url: productUrl,
      ...(images.length ? { image: images } : {}),
      ...(book.seo?.primaryTopic || book.category
        ? { category: book.seo?.primaryTopic || book.category }
        : {}),
      bookFormat: "https://schema.org/EBook",
      inLanguage: "en",
      ...(book.genre ? { genre: book.genre } : {}),
      brand: {
        "@type": "Brand",
        name: "Business Playbook",
      },
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: book.currency || "USD",
        price: Number(book.price).toFixed(2),
        availability: book.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      ...(book.author
        ? {
            author: {
              "@type": "Person",
              name: book.author,
            },
          }
        : {}),
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

export default ProductSchema;


// Schema.org allows the more specific Book type while 
// Google's Product documentation is what gives us the product/offer search eligibility we are targeting.