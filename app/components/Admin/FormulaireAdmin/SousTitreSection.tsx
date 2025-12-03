import InputAdmin, { InputGroup } from "~/components/Admin/InputAdmin";

interface SousTitreSectionProps {
  sousTitre: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function SousTitreSection({
  sousTitre,
  handleInputChange,
}: SousTitreSectionProps) {
  return (
    <InputGroup title="Sous-titre">
      <div className="lg:col-span-2">
        <InputAdmin
          type="text"
          id="sousTitre"
          name="sousTitre"
          label="Sous-titre"
          placeholder="Sous-titre  ( juste avant le bento )"
          value={sousTitre}
          onChange={(value) =>
            handleInputChange({
              target: { name: "sousTitre", value },
            } as any)
          }
        />
      </div>
    </InputGroup>
  );
}
