interface FormActionsProps {
  isEditing: boolean;
  isUploadingFiles: boolean;
  uploadProgress: number;
  uploadedCount: number;
  totalFiles: number;
  submitButtonText: string;
  showDeleteButton: boolean;
  onDelete?: () => void;
  onReset: () => void;
}

export default function FormActions({
  isEditing,
  isUploadingFiles,
  uploadProgress,
  uploadedCount,
  totalFiles,
  submitButtonText,
  showDeleteButton,
  onDelete,
  onReset,
}: FormActionsProps) {
  return (
    <div className="flex gap-4 justify-end">
      {showDeleteButton && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          style={{ fontFamily: "Jakarta Semi Bold" }}
        >
          Supprimer
        </button>
      )}
      <button
        type="button"
        onClick={onReset}
        className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
        style={{ fontFamily: "Jakarta Semi Bold" }}
      >
        {isEditing ? "Annuler" : "Réinitialiser"}
      </button>
      <button
        type="submit"
        disabled={isUploadingFiles}
        className={`py-3 px-8 rounded-lg font-semibold transition-all duration-200 transform ${
          isUploadingFiles
            ? "bg-gray-400 cursor-not-allowed text-gray-200"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02]"
        }`}
        style={{ fontFamily: "Jakarta Semi Bold" }}
      >
        {isUploadingFiles ? (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            <span>Chargement... {uploadProgress}%</span>
            {totalFiles > 0 && (
              <span className="text-xs opacity-75">
                ({uploadedCount}/{totalFiles})
              </span>
            )}
          </div>
        ) : (
          submitButtonText
        )}
      </button>
    </div>
  );
}
