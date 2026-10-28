import { SITE_URL } from "../utils/seo";

const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    name: "Business Playbook",

    url: SITE_URL,

    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
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

export default WebSiteSchema;