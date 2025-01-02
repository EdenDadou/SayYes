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
    list: ["Website", "Responsive", "App Mobile", "Powerpoint", "UI Kit"],
  },
  {
    title: "PRINT",
    icon: <SvgPrint />,
    iconHover: <SvgPrintHover />,
    list: ["Affiches", "Magazine", "Kakémonos", "Brand book", "Plaquettes"],
  },
  {
    title: "VIDÉO",
    icon: <SvgVideo />,
    iconHover: <SvgVideoHover />,
    list: ["Storyboard", "Montage", "Effet Spéciaux", "Motion", "Rotoscopie"],
  },
  {
    title: "EVENT",
    icon: <SvgEvent />,
    iconHover: <SvgEventHover />,
    list: [
      "Fresque Live",
      "Design Stand",
      "Live Sketching",
      "Identité",
      "Goodies",
    ],
  },
  {
    title: "CRÉATIF",
    icon: <SvgCreatif />,
    iconHover: <SvgCreatifHover />,
    list: [
      "Live Sketching",
      "Illustrations",
      "Fresque Murale",
      "Tableaux",
      "Office Branding",
    ],
  },
];
