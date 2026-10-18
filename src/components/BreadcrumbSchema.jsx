import {
  SITE_URL,
  getBookUrl,
} from "../utils/seo";

const BreadcrumbSchema = ({ book }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Books",
        item: `${SITE_URL}/books`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: getBookUrl(book.id),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default BreadcrumbSchema;