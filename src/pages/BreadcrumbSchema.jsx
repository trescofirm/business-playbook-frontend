const BreadcrumbSchema = ({ book }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tresco.firm.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Books",
        item: "https://tresco.firm.in/books",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: `https://tresco.firm.in/books/${book.id}`,
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