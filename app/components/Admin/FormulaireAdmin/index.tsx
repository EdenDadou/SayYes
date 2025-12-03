import { type PortfolioFormData } from "~/utils/admin/portfolio-form-handlers";
import { useFormulaireState } from "./useFormulaireState";
import FeedbackMessages from "./FeedbackMessages";
import TabNavigation from "./TabNavigation";
import HiddenInputs from "./HiddenInputs";
import GeneralInfoSection from "./GeneralInfoSection";
import LivrablesSection from "./LivrablesSection";
import SousTitreSection from "./SousTitreSection";
import TemoignageSection from "./TemoignageSection";
import BentoSection from "./BentoSection";
import SEOSection from "./SEOSection";
import FormActions from "./FormActions";

interface FormulaireAdminProps {
  actionData?: any;
  initialData?: Partial<PortfolioFormData>;
  submitButtonText?: string;
  isEditing?: boolean;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  resetTrigger?: number;
  fetcher: any;
}

export default function FormulaireAdmin({
  actionData,
  initialData,
  submitButtonText = "Créer le Projet",
  isEditing = false,
  onDelete,
  showDeleteButton = false,
  resetTrigger,
  fetcher,
}: FormulaireAdminProps) {
  const {
    formData,
    setFormData,
    currentLivrable,
    setCurrentLivrable,
    currentBento,
    setCurrentBento,
    currentBentoLine,
    setCurrentBentoLine,
    activeTab,
    setActiveTab,
    photoCouverturePreview,
    photoMainPreview,
    photoCouvertureFile,
    photoMainFile,
    metaImagePreview,
    metaImageFile,
    handleMetaImageChange,
    removeMetaImagePreview,
    bentoPreviewImages,
    bentoFiles,
    isUploadingFiles,
    uploadProgress,
    uploadedCount,
    totalFiles,
    resetForm,
    handlers,
  } = useFormulaireState({
    initialData,
    isEditing,
    resetTrigger,
  });

  const {
    handleInputChange,
    handleFileChange,
    handleTemoignageChange,
    addLivrable,
    removeLivrable,
    handlePhotoMainChange,
    removePhotoCouverturePreview,
    removePhotoMainPreview,
    handleBentoFilesChange,
    addBentoLine,
    removeBentoLine,
    addBento,
    removeBento,
    removeBentoImage,
  } = handlers;

  return (
    <div>
      <FeedbackMessages actionData={actionData} />

      <fetcher.Form
        method="post"
        className="space-y-8"
        encType="multipart/form-data"
      >
        <HiddenInputs
          formData={formData}
          activeTab={activeTab}
          isEditing={isEditing}
          bentoFiles={bentoFiles}
          photoCouvertureFile={photoCouvertureFile}
          photoMainFile={photoMainFile}
          metaImageFile={metaImageFile}
        />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "general" && (
          <>
            <GeneralInfoSection
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              handlePhotoMainChange={handlePhotoMainChange}
              photoCouverturePreview={photoCouverturePreview}
              photoMainPreview={photoMainPreview}
              removePhotoCouverturePreview={removePhotoCouverturePreview}
              removePhotoMainPreview={removePhotoMainPreview}
              isEditing={isEditing}
            />

            <LivrablesSection
              livrables={formData.livrable}
              currentLivrable={currentLivrable}
              setCurrentLivrable={setCurrentLivrable}
              addLivrable={addLivrable}
              removeLivrable={removeLivrable}
            />

            <SousTitreSection
              sousTitre={formData.sousTitre}
              handleInputChange={handleInputChange}
            />

            <TemoignageSection
              temoignage={formData.temoignage}
              handleTemoignageChange={handleTemoignageChange}
            />

            <BentoSection
              formData={formData}
              currentBento={currentBento}
              setCurrentBento={setCurrentBento}
              currentBentoLine={currentBentoLine}
              setCurrentBentoLine={setCurrentBentoLine}
              bentoPreviewImages={bentoPreviewImages}
              isUploadingFiles={isUploadingFiles}
              uploadProgress={uploadProgress}
              uploadedCount={uploadedCount}
              totalFiles={totalFiles}
              handleBentoFilesChange={handleBentoFilesChange}
              addBentoLine={addBentoLine}
              removeBentoLine={removeBentoLine}
              addBento={addBento}
              removeBento={removeBento}
              removeBentoImage={removeBentoImage}
              isEditing={isEditing}
              handlers={handlers}
            />
          </>
        )}

        {activeTab === "seo" && (
          <SEOSection
            formData={formData}
            handleInputChange={handleInputChange}
            metaImagePreview={metaImagePreview}
            handleMetaImageChange={handleMetaImageChange}
            removeMetaImagePreview={removeMetaImagePreview}
          />
        )}

        <FormActions
          isEditing={isEditing}
          isUploadingFiles={isUploadingFiles}
          uploadProgress={uploadProgress}
          uploadedCount={uploadedCount}
          totalFiles={totalFiles}
          submitButtonText={submitButtonText}
          showDeleteButton={showDeleteButton}
          onDelete={onDelete}
          onReset={resetForm}
        />
      </fetcher.Form>
    </div>
  );
}
