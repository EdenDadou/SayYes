import InputAdmin, { InputGroup } from "~/components/Admin/InputAdmin";
import { type PortfolioFormData } from "~/utils/admin/portfolio-form-handlers";

interface GeneralInfoSectionProps {
  formData: PortfolioFormData;
  setFormData: React.Dispatch<React.SetStateAction<PortfolioFormData>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotoMainChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoCouverturePreview: { url: string; name: string }[];
  photoMainPreview: { url: string; name: string }[];
  removePhotoCouverturePreview: () => void;
  removePhotoMainPreview: () => void;
  isEditing: boolean;
}

const CATEGORIES = [
  "Identité visuelle",
  "Print",
  "Digital",
  "Event",
  "Facilitation graphique",
  "Motion Design",
];

export default function GeneralInfoSection({
  formData,
  setFormData,
  handleInputChange,
  handleFileChange,
  handlePhotoMainChange,
  photoCouverturePreview,
  photoMainPreview,
  removePhotoCouverturePreview,
  removePhotoMainPreview,
  isEditing,
}: GeneralInfoSectionProps) {
  return (
    <InputGroup title="Informations générales">
      {/* Top Title et Titre côte à côte */}
      <div className="lg:col-span-1">
        <InputAdmin
          type="text"
          id="topTitle"
          name="topTitle"
          label="Top Title"
          placeholder="Top title"
          value={formData.topTitle}
          onChange={(value) =>
            handleInputChange({
              target: { name: "topTitle", value },
            } as any)
          }
        />
      </div>

      <div className="lg:col-span-1">
        <InputAdmin
          type="text"
          id="titre"
          name="titre"
          label="Titre"
          placeholder="Titre du projet"
          value={formData.titre}
          onChange={(value) =>
            handleInputChange({
              target: { name: "titre", value },
            } as any)
          }
          required
        />
      </div>

      {/* Slug */}
      <div className="lg:col-span-2">
        <InputAdmin
          type="text"
          id="slug"
          name="slug"
          label="Slug (URL-friendly, ex: mon-projet-web)"
          placeholder="mon-projet-web"
          value={formData.slug}
          onChange={(value) =>
            handleInputChange({
              target: { name: "slug", value },
            } as any)
          }
          pattern="[a-z0-9-]+"
          title="Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets"
          required
        />
      </div>

      {/* Couleur */}
      <div className="lg:col-span-2">
        <InputAdmin
          type="color"
          id="couleur"
          name="couleur"
          label="Couleur"
          placeholder="Couleur principale (ex: #FF5733)"
          value={formData.couleur}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              couleur: value as string,
            }))
          }
        />
      </div>

      {/* Catégories */}
      <div className="lg:col-span-2">
        <label className="block text-sm font-jakarta-medium text-gray-300 mb-2">
          Catégories
        </label>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...formData.categories, category]
                    : formData.categories.filter((c) => c !== category);
                  setFormData((prev) => ({
                    ...prev,
                    categories: newCategories,
                  }));
                }}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-300 font-jakarta-regular">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Photo de couverture et Photo Main côte à côte */}
      <div className="lg:col-span-1 space-y-3">
        <InputAdmin
          type="file"
          id="photoCouvertureFile"
          name="photoCouvertureFile"
          label="Photo de couverture"
          accept="image/*"
          onChange={(value) => {
            if (value instanceof File) {
              const fakeEvent = {
                target: { files: [value] },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              handleFileChange(fakeEvent);
            }
          }}
          previews={photoCouverturePreview}
          onRemovePreview={() => removePhotoCouverturePreview()}
          required={!isEditing}
        />
        <InputAdmin
          type="text"
          id="photoCouvertureAlt"
          name="photoCouvertureAlt"
          label="Alt photo de couverture"
          placeholder="Description de l'image pour l'accessibilité"
          value={formData.photoCouvertureAlt}
          onChange={(value) =>
            handleInputChange({
              target: { name: "photoCouvertureAlt", value },
            } as any)
          }
        />
      </div>

      <div className="lg:col-span-1 space-y-3">
        <InputAdmin
          type="file"
          id="photoMainFile"
          name="photoMainFile"
          label="Photo Main"
          accept="image/*"
          onChange={(value) => {
            if (value instanceof File) {
              const fakeEvent = {
                target: { files: [value] },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              handlePhotoMainChange(fakeEvent);
            }
          }}
          previews={photoMainPreview}
          onRemovePreview={() => removePhotoMainPreview()}
          required={!isEditing}
        />
        <InputAdmin
          type="text"
          id="photoMainAlt"
          name="photoMainAlt"
          label="Alt photo main"
          placeholder="Description de l'image pour l'accessibilité"
          value={formData.photoMainAlt}
          onChange={(value) =>
            handleInputChange({
              target: { name: "photoMainAlt", value },
            } as any)
          }
        />
      </div>

      {/* Description et Kicker côte à côte */}
      <div className="lg:col-span-1">
        <InputAdmin
          type="textarea"
          id="description"
          name="description"
          label="Description"
          placeholder="Description détaillée du projet"
          value={formData.description}
          onChange={(value) =>
            handleInputChange({
              target: { name: "description", value },
            } as any)
          }
          rows={4}
          required
        />
      </div>

      <div className="lg:col-span-1">
        <InputAdmin
          type="textarea"
          id="kicker"
          name="kicker"
          label="Kicker"
          placeholder="Texte d'accroche"
          value={formData.kicker}
          onChange={(value) =>
            handleInputChange({
              target: { name: "kicker", value },
            } as any)
          }
          rows={4}
        />

        {/* Aide pour le formatage */}
        <div className="mt-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <p
            className="text-sm text-blue-300"
            style={{ fontFamily: "Jakarta" }}
          >
            💡 <strong>Aide au formatage :</strong>
          </p>
          <ul
            className="text-xs text-blue-200 mt-1 space-y-1"
            style={{ fontFamily: "Jakarta" }}
          >
            <li>
              • Pour mettre un texte en gras, ajouter la balise{" "}
              <code className="bg-blue-800/30 px-1 rounded">
                &lt;b&gt;&lt;/b&gt;
              </code>{" "}
              autour du texte
            </li>
            <li>
              • Pour faire un retour à la ligne, mettre une balise{" "}
              <code className="bg-blue-800/30 px-1 rounded">
                &lt;br/&gt;
              </code>
            </li>
          </ul>
        </div>
      </div>
    </InputGroup>
  );
}
