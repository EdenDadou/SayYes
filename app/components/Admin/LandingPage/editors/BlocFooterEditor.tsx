import type { BlocFooter } from "~/types/landing-page";
import LineTitleEditor from "./LineTitleEditor";
import { ADMIN_INPUT_CLASS } from "~/utils/admin/landing-page-constants";

interface BlocFooterEditorProps {
  bloc: BlocFooter;
  onUpdate: (bloc: BlocFooter) => void;
}

export default function BlocFooterEditor({
  bloc,
  onUpdate,
}: BlocFooterEditorProps) {
  return (
    <div className="space-y-4">
      {/* Titre animé */}
      <LineTitleEditor
        lines={bloc.lineTitle}
        onChange={(lines) => onUpdate({ ...bloc, lineTitle: lines })}
        label="Titre"
      />

      {/* Sous-titre */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Sous-titre
        </label>
        <input
          type="text"
          value={bloc.subTitle}
          onChange={(e) => onUpdate({ ...bloc, subTitle: e.target.value })}
          className={ADMIN_INPUT_CLASS}
        />
      </div>

      {/* CTA */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">CTA</label>
        <input
          type="text"
          value={bloc.cta}
          onChange={(e) => onUpdate({ ...bloc, cta: e.target.value })}
          className={ADMIN_INPUT_CLASS}
        />
      </div>
    </div>
  );
}
