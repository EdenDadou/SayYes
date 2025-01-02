import SvgCreatif from "public/icons/IconsSection3/Creatif";
import SvgCreatifHover from "public/icons/IconsSection3/CreatifHover";
import SvgDigital from "public/icons/IconsSection3/Digital";
import SvgDigitalHover from "public/icons/IconsSection3/DigitalHover";
import SvgEvent from "public/icons/IconsSection3/Event";
import SvgEventHover from "public/icons/IconsSection3/EventHover";
import SvgPrint from "public/icons/IconsSection3/Print";
import SvgPrintHover from "public/icons/IconsSection3/PrintHover";
import SvgVideo from "public/icons/IconsSection3/Video";
import SvgVideoHover from "public/icons/IconsSection3/VideoHover";

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
