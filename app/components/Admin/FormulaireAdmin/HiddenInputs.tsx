import { type PortfolioFormData } from "~/utils/admin/portfolio-form-handlers";
import { type TabType } from "./TabNavigation";

interface HiddenInputsProps {
  formData: PortfolioFormData;
  activeTab: TabType;
  isEditing: boolean;
  bentoFiles: Map<string, File>;
  photoCouvertureFile: Map<string, File>;
  photoMainFile: Map<string, File>;
  metaImageFile: Map<string, File>;
}

export default function HiddenInputs({
  formData,
  activeTab,
  isEditing,
  bentoFiles,
  photoCouvertureFile,
  photoMainFile,
  metaImageFile,
}: HiddenInputsProps) {
  return (
    <>
      {/* Bento JSON */}
      <input
        type="hidden"
        name="bento"
        value={JSON.stringify(formData.bento)}
      />

      {/* Inputs cachés pour les URLs existantes des photos */}
      {isEditing && formData.photoCouverture && (
        <input
          type="hidden"
          name="photoCouvertureUrl"
          value={formData.photoCouverture}
        />
      )}
      {isEditing && formData.photoMain && (
        <input type="hidden" name="photoMainUrl" value={formData.photoMain} />
      )}

      {/* Inputs file dynamiques pour les fichiers bento */}
      <BentoFileInputs formData={formData} bentoFiles={bentoFiles} />

      {/* Inputs file dynamiques pour les photos principales */}
      <MainPhotoFileInputs
        photoCouvertureFile={photoCouvertureFile}
        photoMainFile={photoMainFile}
      />

      {/* Input file dynamique pour la meta image */}
      <MetaImageFileInput metaImageFile={metaImageFile} />

      {/* Catégories */}
      {formData.categories.map((category, index) => (
        <input key={index} type="hidden" name="categories" value={category} />
      ))}

      {/* Inputs cachés pour les champs alt des photos */}
      <input
        type="hidden"
        name="photoCouvertureAlt"
        value={formData.photoCouvertureAlt}
      />
      <input
        type="hidden"
        name="photoMainAlt"
        value={formData.photoMainAlt}
      />

      {/* Inputs cachés pour les champs généraux (seulement si on est dans l'onglet SEO) */}
      {activeTab === "seo" && (
        <>
          <input type="hidden" name="titre" value={formData.titre} />
          <input type="hidden" name="slug" value={formData.slug} />
          <input type="hidden" name="description" value={formData.description} />
          <input type="hidden" name="kicker" value={formData.kicker} />
          <input type="hidden" name="sousTitre" value={formData.sousTitre} />
          <input type="hidden" name="topTitle" value={formData.topTitle} />
          <input type="hidden" name="couleur" value={formData.couleur} />
          <input
            type="hidden"
            name="temoignageAuteur"
            value={formData.temoignage.auteur}
          />
          <input
            type="hidden"
            name="temoignageContenu"
            value={formData.temoignage.contenu}
          />
          <input
            type="hidden"
            name="temoignagePoste"
            value={formData.temoignage.poste || ""}
          />
          {formData.livrable.map((livrable, index) => (
            <input
              key={`livrable-hidden-${index}`}
              type="hidden"
              name="livrable"
              value={livrable}
            />
          ))}
        </>
      )}

      {/* Inputs cachés pour les champs SEO */}
      {isEditing &&
        formData.metaImage &&
        !formData.metaImage.startsWith("pending_") && (
          <input type="hidden" name="metaImageUrl" value={formData.metaImage} />
        )}
      <input
        type="hidden"
        name="metaTitle"
        value={formData.metaTitle || ""}
      />
      <input
        type="hidden"
        name="metaDescription"
        value={formData.metaDescription || ""}
      />
      <input
        type="hidden"
        name="schemaOrg"
        value={formData.schemaOrg || "{}"}
      />
    </>
  );
}

// Sous-composants pour les inputs file

interface BentoFileInputsProps {
  formData: PortfolioFormData;
  bentoFiles: Map<string, File>;
}

function BentoFileInputs({ formData, bentoFiles }: BentoFileInputsProps) {
  const inputs: React.ReactElement[] = [];

  formData.bento.forEach((bento, bentoIndex) => {
    bento.lines.forEach((line) => {
      line.listImage.forEach((image) => {
        if (image.startsWith("pending_")) {
          const fileId = image.replace("pending_", "");
          const file = bentoFiles.get(fileId);
          const inputName = `bentoFile_${fileId.replace(/[^a-zA-Z0-9]/g, "_")}`;

          if (file) {
            inputs.push(
              <input
                key={inputName}
                type="file"
                name={inputName}
                style={{ display: "none" }}
                ref={(input) => {
                  if (input) {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    input.files = dt.files;
                  }
                }}
              />
            );
          }
        }
      });
    });
  });

  return <>{inputs}</>;
}

interface MainPhotoFileInputsProps {
  photoCouvertureFile: Map<string, File>;
  photoMainFile: Map<string, File>;
}

function MainPhotoFileInputs({
  photoCouvertureFile,
  photoMainFile,
}: MainPhotoFileInputsProps) {
  const inputs: React.ReactElement[] = [];

  photoCouvertureFile.forEach((file, fileName) => {
    inputs.push(
      <input
        key={`photoCouvertureFile_${fileName}`}
        type="file"
        name="photoCouvertureFile"
        style={{ display: "none" }}
        ref={(input) => {
          if (input) {
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
          }
        }}
      />
    );
  });

  photoMainFile.forEach((file, fileName) => {
    inputs.push(
      <input
        key={`photoMainFile_${fileName}`}
        type="file"
        name="photoMainFile"
        style={{ display: "none" }}
        ref={(input) => {
          if (input) {
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
          }
        }}
      />
    );
  });

  return <>{inputs}</>;
}

interface MetaImageFileInputProps {
  metaImageFile: Map<string, File>;
}

function MetaImageFileInput({ metaImageFile }: MetaImageFileInputProps) {
  const inputs: React.ReactElement[] = [];

  metaImageFile.forEach((file, fileName) => {
    inputs.push(
      <input
        key={`metaImageFile_${fileName}`}
        type="file"
        name="metaImageFile"
        style={{ display: "none" }}
        ref={(input) => {
          if (input) {
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
          }
        }}
      />
    );
  });

  return <>{inputs}</>;
}
