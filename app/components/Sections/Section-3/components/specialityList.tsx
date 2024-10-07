import SvgCreatif from "~/assets/icons/Section3/Creatif";
import SvgCreatifHover from "~/assets/icons/Section3/CreatifHover";
import SvgDigital from "~/assets/icons/Section3/Digital";
import SvgDigitalHover from "~/assets/icons/Section3/DigitalHover";
import SvgEvent from "~/assets/icons/Section3/Event";
import SvgEventHover from "~/assets/icons/Section3/EventHover";
import SvgPrint from "~/assets/icons/Section3/Print";
import SvgPrintHover from "~/assets/icons/Section3/PrintHover";
import SvgVideo from "~/assets/icons/Section3/Video";
import SvgVideoHover from "~/assets/icons/Section3/VideoHover";

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
