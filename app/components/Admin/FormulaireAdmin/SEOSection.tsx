import InputAdmin, { InputGroup } from "~/components/Admin/InputAdmin";
import { type PortfolioFormData } from "~/utils/admin/portfolio-form-handlers";

interface SEOSectionProps {
  formData: PortfolioFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  metaImagePreview: { url: string; name: string }[];
  handleMetaImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeMetaImagePreview: () => void;
}

export default function SEOSection({
  formData,
  handleInputChange,
  metaImagePreview,
  handleMetaImageChange,
  removeMetaImagePreview,
}: SEOSectionProps) {
  return (
    <InputGroup title="Paramètres SEO">
      <div className="lg:col-span-2">
        <InputAdmin
          type="text"
          id="metaTitle"
          name="metaTitle"
          label="Meta Title"
          placeholder="Titre pour les moteurs de recherche (recommandé : 50-60 caractères)"
          value={formData.metaTitle || ""}
          onChange={(value) =>
            handleInputChange({
              target: { name: "metaTitle", value },
            } as any)
          }
        />
        {formData.metaTitle && (
          <p
            className="mt-1 text-xs text-gray-400"
            style={{ fontFamily: "Jakarta" }}
          >
            {formData.metaTitle.length} caractères
          </p>
        )}
      </div>

      <div className="lg:col-span-2">
        <InputAdmin
          type="textarea"
          id="metaDescription"
          name="metaDescription"
          label="Meta Description"
          placeholder="Description pour les moteurs de recherche (recommandé : 150-160 caractères)"
          value={formData.metaDescription || ""}
          onChange={(value) =>
            handleInputChange({
              target: { name: "metaDescription", value },
            } as any)
          }
          rows={3}
        />
        {formData.metaDescription && (
          <p
            className="mt-1 text-xs text-gray-400"
            style={{ fontFamily: "Jakarta" }}
          >
            {formData.metaDescription.length} caractères
          </p>
        )}
      </div>

      <div className="lg:col-span-2">
        <InputAdmin
          type="file"
          id="metaImageFile"
          name="metaImageFile"
          label="Meta Image"
          accept="image/*"
          onChange={(value) => {
            if (value instanceof File) {
              const fakeEvent = {
                target: { files: [value] },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              handleMetaImageChange(fakeEvent);
            }
          }}
          previews={metaImagePreview}
          onRemovePreview={removeMetaImagePreview}
        />
        <p
          className="mt-2 text-xs text-gray-400"
          style={{ fontFamily: "Jakarta" }}
        >
          💡 Image utilisée pour le partage sur les réseaux sociaux (Open Graph,
          Twitter Card)
        </p>
      </div>

      <div className="lg:col-span-2">
        <InputAdmin
          type="textarea"
          id="schemaOrg"
          name="schemaOrg"
          label="Schema.org (JSON-LD)"
          placeholder='{"@context": "https://schema.org", "@type": "CreativeWork", ...}'
          value={formData.schemaOrg || "{}"}
          onChange={(value) =>
            handleInputChange({
              target: { name: "schemaOrg", value },
            } as any)
          }
          rows={8}
        />
        <div className="mt-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <p
            className="text-sm text-blue-300 mb-2"
            style={{ fontFamily: "Jakarta" }}
          >
            💡 <strong>Aide Schema.org :</strong>
          </p>
          <p
            className="text-xs text-blue-200"
            style={{ fontFamily: "Jakarta" }}
          >
            Insérez ici le JSON-LD de votre schema.org. Exemple pour un
            CreativeWork :
          </p>
          <pre className="mt-2 text-xs bg-blue-800/30 p-2 rounded text-blue-100 overflow-x-auto">
            {`{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Nom du projet",
  "description": "Description",
  "image": "URL de l'image"
}`}
          </pre>
        </div>
      </div>
    </InputGroup>
  );
}
