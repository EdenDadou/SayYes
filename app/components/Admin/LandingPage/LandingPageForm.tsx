import { useState, useEffect } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import type {
  LandingPage,
  LandingPageSEO,
  Bloc,
} from "~/types/landing-page";
import { BLOC_TYPES, createEmptyBloc } from "~/types/landing-page";
import BlocEditor from "./BlocEditor";

interface LandingPageFormProps {
  initialData?: Partial<LandingPage>;
  submitButtonText?: string;
  isEditing?: boolean;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  fetcher: FetcherWithComponents<any>;
  resetTrigger?: number;
}

export default function LandingPageForm({
  initialData,
  submitButtonText = "Créer la landing page",
  isEditing = false,
  onDelete,
  showDeleteButton = false,
  fetcher,
  resetTrigger = 0,
}: LandingPageFormProps) {
  // État du formulaire
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [color, setColor] = useState(initialData?.color || "#000000");
  const [seo, setSeo] = useState<LandingPageSEO>(
    initialData?.seo || {
      metaTitle: "",
      metaDescription: "",
      schemaOrg: "",
    }
  );
  const [blocs, setBlocs] = useState<Bloc[]>(initialData?.blocs || []);

  // Reset le formulaire quand resetTrigger change
  useEffect(() => {
    if (resetTrigger > 0 && !isEditing) {
      setTitle("");
      setSlug("");
      setColor("#000000");
      setSeo({ metaTitle: "", metaDescription: "", schemaOrg: "" });
      setBlocs([]);
    }
  }, [resetTrigger, isEditing]);

  // Générer automatiquement le slug à partir du titre
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  // Gestion des blocs
  const addBloc = (type: Bloc["type"]) => {
    const newBloc = createEmptyBloc(type);
    setBlocs([...blocs, newBloc]);
  };

  const updateBloc = (index: number, updatedBloc: Bloc) => {
    const newBlocs = [...blocs];
    newBlocs[index] = updatedBloc;
    setBlocs(newBlocs);
  };

  const removeBloc = (index: number) => {
    setBlocs(blocs.filter((_, i) => i !== index));
  };

  const moveBloc = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocs.length - 1)
    ) {
      return;
    }

    const newBlocs = [...blocs];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocs[index], newBlocs[newIndex]] = [newBlocs[newIndex], newBlocs[index]];
    setBlocs(newBlocs);
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("color", color);
    formData.append("seo", JSON.stringify(seo));
    formData.append("blocs", JSON.stringify(blocs));

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section Informations de base */}
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
        <h3
          className="text-xl font-bold text-white mb-4"
          style={{ fontFamily: "Jakarta Bold" }}
        >
          Informations de base
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Titre */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white mb-2"
            >
              Titre *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-white mb-2"
            >
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Couleur */}
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-white mb-2"
            >
              Couleur principale
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section SEO */}
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
        <h3
          className="text-xl font-bold text-white mb-4"
          style={{ fontFamily: "Jakarta Bold" }}
        >
          SEO
        </h3>

        <div className="space-y-4">
          {/* Meta Title */}
          <div>
            <label
              htmlFor="metaTitle"
              className="block text-sm font-medium text-white mb-2"
            >
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm font-medium text-white mb-2"
            >
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              value={seo.metaDescription}
              onChange={(e) =>
                setSeo({ ...seo, metaDescription: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Schema.org */}
          <div>
            <label
              htmlFor="schemaOrg"
              className="block text-sm font-medium text-white mb-2"
            >
              Schema.org (JSON-LD)
            </label>
            <textarea
              id="schemaOrg"
              value={seo.schemaOrg || ""}
              onChange={(e) => setSeo({ ...seo, schemaOrg: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder='{"@context": "https://schema.org", ...}'
            />
          </div>
        </div>
      </div>

      {/* Section Blocs */}
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: "Jakarta Bold" }}
          >
            Blocs ({blocs.length})
          </h3>

          {/* Sélecteur pour ajouter un bloc */}
          <div className="flex gap-2">
            <select
              id="addBlocType"
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  addBloc(e.target.value as Bloc["type"]);
                  e.target.value = "";
                }
              }}
            >
              <option value="" disabled>
                Ajouter un bloc...
              </option>
              {BLOC_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste des blocs */}
        {blocs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-white/70">
              Aucun bloc ajouté. Utilisez le sélecteur ci-dessus pour ajouter
              des blocs.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {blocs.map((bloc, index) => (
              <BlocEditor
                key={index}
                bloc={bloc}
                index={index}
                totalBlocs={blocs.length}
                onUpdate={(updatedBloc) => updateBloc(index, updatedBloc)}
                onRemove={() => removeBloc(index)}
                onMoveUp={() => moveBloc(index, "up")}
                onMoveDown={() => moveBloc(index, "down")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-between items-center">
        {showDeleteButton && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Supprimer
          </button>
        )}

        <button
          type="submit"
          disabled={fetcher.state === "submitting"}
          className={`ml-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 ${
            fetcher.state === "submitting" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ fontFamily: "Jakarta Semi Bold" }}
        >
          {fetcher.state === "submitting"
            ? "Enregistrement..."
            : submitButtonText}
        </button>
      </div>
    </form>
  );
}
