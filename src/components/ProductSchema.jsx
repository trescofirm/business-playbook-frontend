import { getBookUrl } from "../utils/seo";

const ProductSchema = ({ book }) => {
  const productUrl = getBookUrl(book.id);

  const getAbsoluteImageUrl = (image) => {
    if (!image) return null;

    return image.startsWith("http")
      ? image
      : `https://tresco.firm.in${image}`;
  };

  const coverImage = getAbsoluteImageUrl(
    book.images?.cover
  );

  const mockupImage = getAbsoluteImageUrl(
    book.images?.mockup
  );

  const images = [
    coverImage,
    mockupImage,
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",

    "@type": ["Product", "Book"],

    name: book.title,

    description: book.description,

    image: images,

    url: productUrl,

    bookFormat: "https://schema.org/EBook",
    inLanguage: "en",

    brand: {
      "@type": "Brand",
      name: "Business Playbook",
    },

    offers: {
      "@type": "Offer",

      url: productUrl,

      priceCurrency: "USD",

      price: String(book.price),

      availability: book.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition:
        "https://schema.org/NewCondition",
    },
  };

  if (book.author) {
    schema.author = {
      "@type": "Person",
      name: book.author,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default ProductSchema;
// Schema.org allows the more specific Book type while 
// Google's Product documentation is what gives us the product/offer search eligibility we are targeting.