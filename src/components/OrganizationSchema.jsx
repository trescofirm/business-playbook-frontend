import { SITE_URL } from "../utils/seo";

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",

    "@type": "Organization",

    "@id": `${SITE_URL}/#organization`,

    name: "Business Playbook",

    url: SITE_URL,

    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
    },

    description:
      "Business Playbook publishes practical digital books and guides focused on confidence, focus, habits and personal growth.",
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

export default OrganizationSchema;