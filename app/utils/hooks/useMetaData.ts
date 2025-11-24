import { useEffect } from "react";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";

interface MetaDataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  schemaOrg?: string;
}

export function useMetaData(portfolio: PortfolioData | null) {
  useEffect(() => {
    if (!portfolio) return;

    const baseUrl = "https://vps-f16913b8.vps.ovh.net";

    // Préparer les métadonnées
    const metaTitle = portfolio.metaTitle || `${portfolio.titre} - SayYes`;
    const metaDescription =
      portfolio.metaDescription ||
      portfolio.description ||
      `Découvrez le projet ${portfolio.titre}`;
    const imageRelativePath =
      portfolio.metaImage || portfolio.photoMain || portfolio.photoCouverture;
    const metaImage = imageRelativePath.startsWith("http")
      ? imageRelativePath
      : `${baseUrl}${imageRelativePath}`;
    const url = `${baseUrl}/portfolio/${portfolio.slug}`;

    // Update document title
    document.title = metaTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (
      selector: string,
      attribute: string,
      content: string
    ) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const attrName = selector.includes("property=") ? "property" : "name";
        const attrValue = selector.match(/["'](.*?)["']/)?.[1];
        if (attrValue) {
          element.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', "content", metaDescription);
    updateMetaTag(
      'meta[name="keywords"]',
      "content",
      portfolio.categories.join(", ")
    );

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', "content", metaTitle);
    updateMetaTag(
      'meta[property="og:description"]',
      "content",
      metaDescription
    );
    updateMetaTag('meta[property="og:type"]', "content", "website");
    updateMetaTag('meta[property="og:url"]', "content", url);
    updateMetaTag('meta[property="og:image"]', "content", metaImage);

    // Twitter Card tags
    updateMetaTag(
      'meta[name="twitter:card"]',
      "content",
      "summary_large_image"
    );
    updateMetaTag('meta[name="twitter:title"]', "content", metaTitle);
    updateMetaTag(
      'meta[name="twitter:description"]',
      "content",
      metaDescription
    );
    updateMetaTag('meta[name="twitter:image"]', "content", metaImage);

    // Schema.org
    if (portfolio.schemaOrg && portfolio.schemaOrg !== "{}") {
      try {
        const schemaData = JSON.parse(portfolio.schemaOrg);
        let scriptTag = document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (!scriptTag) {
          scriptTag = document.createElement("script");
          scriptTag.setAttribute("type", "application/ld+json");
          document.head.appendChild(scriptTag);
        }
        scriptTag.textContent = JSON.stringify(schemaData);
      } catch (e) {
        console.error("Erreur lors du parsing du Schema.org:", e);
      }
    }

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      document.title = "SayYes";
    };
  }, [portfolio]);
}
