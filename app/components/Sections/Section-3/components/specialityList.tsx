import SvgCreatif from "~/components/Sections/Section-3/components/assets/Creatif";
import SvgCreatifHover from "~/components/Sections/Section-3/components/assets/CreatifHover";
import SvgDigital from "~/components/Sections/Section-3/components/assets/Digital";
import SvgDigitalHover from "~/components/Sections/Section-3/components/assets/DigitalHover";
import SvgEvent from "~/components/Sections/Section-3/components/assets/Event";
import SvgEventHover from "~/components/Sections/Section-3/components/assets/EventHover";
import SvgPrint from "~/components/Sections/Section-3/components/assets/Print";
import SvgPrintHover from "~/components/Sections/Section-3/components/assets/PrintHover";
import SvgVideo from "~/components/Sections/Section-3/components/assets/Video";
import SvgVideoHover from "~/components/Sections/Section-3/components/assets/VideoHover";

export const specialityList = [
  {
    title: "DIGITAL",
    icon: <SvgDigital />,
    iconHover: <SvgDigitalHover />,
    list: [
      "Site Web & mobile",
      "Landing page",
      "Réseaux sociaux",
      "Design de slide",
      "Asset Marketing",
    ],
  },
  {
    title: "PRINT",
    icon: <SvgPrint />,
    iconHover: <SvgPrintHover />,
    list: ["Support de vente", "Brand Book", "Affiche", "Kakémono", "Magazine"],
  },
  {
    title: "VIDÉO",
    icon: <SvgVideo />,
    iconHover: <SvgVideoHover />,
    list: ["Corporate", "Motion Design", "Publicité", "Showreel", "Storyboard"],
  },
  {
    title: "EVENT",
    icon: <SvgEvent />,
    iconHover: <SvgEventHover />,
    list: [
      "Live Sketching",
      "Identité & Logo",
      "Support de com’",
      "Design Stand",
      "Fresque live",
    ],
  },
  {
    title: "CRÉATIF",
    icon: <SvgCreatif />,
    iconHover: <SvgCreatifHover />,
    list: [
      "Atelier & coaching",
      "Infographie",
      "Illustrations",
      "Office Branding",
      "Storytelling",
    ],
  },
];
