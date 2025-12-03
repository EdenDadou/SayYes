import { DeleteIcon } from "~/components/icons";
import InputAdmin from "~/components/Admin/InputAdmin";
import BentoEditor from "~/components/Admin/BentoEditor";
import {
  BENTO_FORMATS,
  BentoItem,
  BentoLine,
} from "~/utils/admin/manage-portfolio-types";
import { type EditFormHandlers } from "~/utils/admin/portfolio-edit-handlers";

interface BentoSectionProps {
  formData: {
    bento: BentoItem[];
  };
  currentBento: BentoItem;
  setCurrentBento: React.Dispatch<React.SetStateAction<BentoItem>>;
  currentBentoLine: BentoLine;
  setCurrentBentoLine: React.Dispatch<React.SetStateAction<BentoLine>>;
  bentoPreviewImages: { url: string; name: string }[];
  isUploadingFiles: boolean;
  uploadProgress: number;
  uploadedCount: number;
  totalFiles: number;
  handleBentoFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addBentoLine: () => void;
  removeBentoLine: (index: number) => void;
  addBento: () => void;
  removeBento: (index: number) => void;
  removeBentoImage: (index: number) => void;
  isEditing: boolean;
  handlers: any;
}

export default function BentoSection({
  formData,
  currentBento,
  setCurrentBento,
  currentBentoLine,
  setCurrentBentoLine,
  bentoPreviewImages,
  isUploadingFiles,
  uploadProgress,
  uploadedCount,
  totalFiles,
  handleBentoFilesChange,
  addBentoLine,
  removeBentoLine,
  addBento,
  removeBento,
  removeBentoImage,
  isEditing,
  handlers,
}: BentoSectionProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">🎨</span>
        </div>
        <div>
          <h2
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "Jakarta Bold" }}
          >
            Configuration Bento
          </h2>
          <p
            className="text-gray-400 text-sm"
            style={{ fontFamily: "Jakarta" }}
          >
            Créez des grilles visuelles pour organiser vos médias
          </p>
        </div>
      </div>

      {/* Workflow en étapes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Étape 1: Créer les lignes */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Ajouter des lignes
            </h3>
          </div>

          <div className="space-y-4">
            {/* Format selector */}
            <div>
              <InputAdmin
                type="select"
                label="Format de disposition"
                value={currentBentoLine.format}
                onChange={(value) =>
                  setCurrentBentoLine((prev) => ({
                    ...prev,
                    format: value as any,
                  }))
                }
                options={BENTO_FORMATS.map((format) => ({
                  value: format,
                  label: `📐 ${format}`,
                }))}
              />
            </div>

            {/* Upload files */}
            <div>
              <InputAdmin
                type="file-multiple"
                label="📁 Ajouter des médias"
                accept="image/*,video/*"
                onChange={(value) => {
                  if (
                    Array.isArray(value) &&
                    value.every((v) => v instanceof File)
                  ) {
                    const fileList = {
                      length: value.length,
                      item: (index: number) => value[index] || null,
                      [Symbol.iterator]: function* () {
                        for (let i = 0; i < value.length; i++) {
                          yield value[i];
                        }
                      },
                    } as FileList;

                    value.forEach((file, index) => {
                      (fileList as any)[index] = file;
                    });

                    const fakeEvent = {
                      target: { files: fileList },
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleBentoFilesChange(fakeEvent);
                  }
                }}
                previews={bentoPreviewImages}
                onRemovePreview={removeBentoImage}
              />
            </div>

            {/* Progress bar */}
            {isUploadingFiles && (
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 text-sm font-medium">
                    ⏳ Chargement...
                  </span>
                  <span className="text-gray-300 text-sm">
                    {uploadedCount}/{totalFiles}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Alt text inputs for each image */}
            {currentBentoLine.listImage.length > 0 && (
              <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-3" style={{ fontFamily: "Jakarta Medium" }}>
                  Textes alternatifs (alt) pour chaque média
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {currentBentoLine.listImage.map((image, index) => {
                    const imageName = image.startsWith("pending_")
                      ? image.replace(/^pending_\d+_[a-z0-9]+_/, "")
                      : image.split("/").pop() || `Image ${index + 1}`;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-6 text-center">{index + 1}</span>
                        <input
                          type="text"
                          placeholder={`Alt pour ${imageName}`}
                          value={currentBentoLine.listImageAlt?.[index] || ""}
                          onChange={(e) => handlers.updateCurrentBentoImageAlt(index, e.target.value)}
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                          style={{ fontFamily: "Jakarta" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add line button */}
            <button
              type="button"
              onClick={addBentoLine}
              disabled={currentBentoLine.listImage.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              ➕ Ajouter cette ligne ({currentBentoLine.listImage.length} médias)
            </button>
          </div>
        </div>

        {/* Étape 2: Aperçu du bento en cours */}
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Bento en cours ({currentBento.lines.length}/10)
            </h3>
          </div>

          {currentBento.lines.length > 0 ? (
            <div className="space-y-3 mb-4">
              {currentBento.lines.map((line, index) => (
                <div
                  key={index}
                  className="bg-purple-800/20 border border-purple-600/30 p-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <span
                        className="text-white font-medium"
                        style={{ fontFamily: "Jakarta Medium" }}
                      >
                        {line.format}
                      </span>
                      <span className="text-purple-300 ml-2 text-sm">
                        {line.listImage.length} médias
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBentoLine(index)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addBento}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                style={{ fontFamily: "Jakarta Semi Bold" }}
              >
                ✅ Finaliser ce Bento
              </button>
            </div>
          ) : (
            <div className="bg-purple-800/10 border border-purple-600/20 rounded-lg p-8 text-center">
              <div className="text-purple-400 mb-2">📋</div>
              <p
                className="text-purple-300 text-sm"
                style={{ fontFamily: "Jakarta" }}
              >
                Ajoutez des lignes pour commencer votre bento
              </p>
            </div>
          )}

          {currentBento.lines.length >= 10 && (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
              <p
                className="text-yellow-300 text-sm flex items-center gap-2"
                style={{ fontFamily: "Jakarta" }}
              >
                ⚠️ Limite atteinte : Maximum 10 lignes par bento
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Étape 3: Bentos finalisés */}
      {formData.bento.length > 0 && (
        <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Bentos finalisés ({formData.bento.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {formData.bento.map((bento, bentoIndex) =>
              isEditing ? (
                <BentoEditor
                  key={bentoIndex}
                  bento={bento}
                  bentoIndex={bentoIndex}
                  handlers={handlers as EditFormHandlers}
                  onRemoveBento={removeBento}
                  bentoPreviewImages={bentoPreviewImages}
                />
              ) : (
                <BentoItemPreview
                  key={bentoIndex}
                  bento={bento}
                  bentoIndex={bentoIndex}
                  onRemove={removeBento}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface BentoItemPreviewProps {
  bento: BentoItem;
  bentoIndex: number;
  onRemove: (index: number) => void;
}

function BentoItemPreview({ bento, bentoIndex, onRemove }: BentoItemPreviewProps) {
  return (
    <div className="bg-green-800/10 border border-green-600/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
            {bentoIndex + 1}
          </div>
          <span
            className="text-white font-semibold"
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            Bento {bentoIndex + 1}
          </span>
          <span className="text-green-300 text-sm">
            {bento.lines.length} lignes
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            console.log("🗑️ Tentative suppression bento", bentoIndex);
            onRemove(bentoIndex);
          }}
          className="text-red-400 hover:text-red-300 transition-colors duration-200"
          title="Supprimer ce bento"
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {bento.lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="bg-green-700/10 border border-green-600/20 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-white font-medium text-sm"
                style={{ fontFamily: "Jakarta Medium" }}
              >
                📐 {line.format}
              </span>
              <span className="text-green-300 text-xs">
                {line.listImage.length} médias
              </span>
            </div>

            {/* Aperçu des médias en grille */}
            <div className="grid grid-cols-3 gap-1">
              {line.listImage.slice(0, 6).map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="text-xs p-1 rounded text-center truncate relative group bg-green-800/20 text-green-200"
                  style={{ fontFamily: "Jakarta" }}
                  title={
                    image.startsWith("pending_")
                      ? image.replace("pending_", "")
                      : image.split("/").pop()
                  }
                >
                  {imgIndex < 5 ? (
                    <>🖼️ {imgIndex + 1}</>
                  ) : line.listImage.length > 6 ? (
                    <>+{line.listImage.length - 5}</>
                  ) : (
                    <>🖼️ {imgIndex + 1}</>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
