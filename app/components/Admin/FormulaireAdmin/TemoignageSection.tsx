import InputAdmin, { InputGroup } from "~/components/Admin/InputAdmin";
import { type PortfolioFormData } from "~/utils/admin/portfolio-form-handlers";

interface TemoignageSectionProps {
  temoignage: PortfolioFormData["temoignage"];
  handleTemoignageChange: (field: string, value: string) => void;
}

export default function TemoignageSection({
  temoignage,
  handleTemoignageChange,
}: TemoignageSectionProps) {
  return (
    <InputGroup title="Témoignage">
      {/* Auteur */}
      <InputAdmin
        type="text"
        id="temoignageAuteur"
        name="temoignageAuteur"
        label="Auteur"
        placeholder="Nom de l'auteur du témoignage"
        value={temoignage.auteur}
        onChange={(value) => handleTemoignageChange("auteur", value as string)}
      />

      {/* Poste */}
      <InputAdmin
        type="text"
        id="temoignagePoste"
        name="temoignagePoste"
        label="Poste"
        placeholder="Poste de l'auteur"
        value={temoignage.poste || ""}
        onChange={(value) => handleTemoignageChange("poste", value as string)}
      />

      {/* Contenu */}
      <div className="lg:col-span-2">
        <InputAdmin
          type="textarea"
          id="temoignageContenu"
          name="temoignageContenu"
          label="Contenu du témoignage"
          placeholder="Contenu du témoignage"
          value={temoignage.contenu}
          onChange={(value) =>
            handleTemoignageChange("contenu", value as string)
          }
          rows={4}
        />
      </div>
    </InputGroup>
  );
}
