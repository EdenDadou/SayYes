import React, { Suspense, useState } from "react";
// import LoaderIntro from "~/components/LoaderIntro";
import useIntroTimer from "~/utils/hooks/useIntroTimer";
import HeaderMobile from "../Header/mobile/HeaderMobile";
import "~/styles/tailwind.css";

const Section1Mobile = React.lazy(
  () => import("../Sections/Section-1/mobile/Section1Mobile")
);
const Section2Mobile = React.lazy(
  () => import("../Sections/Section-2/mobile/Section2Mobile")
);
const Section3Mobile = React.lazy(
  () => import("../Sections/Section-3/mobile/Section3Mobile")
);
const Section4Mobile = React.lazy(
  () => import("../Sections/Section-4/mobile/Section4Mobile")
);
// const Section5Mobile = React.lazy(() => import("../Sections/Section-5/mobile/Section5Mobile"));

//import ModalParlonsDesignMobile from "../ModalParlonsDesign/mobile/ModalParlonsDesignMobile";

export const VIDEO_DURATION = 4.5;

export default function Mobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { isIntroFinish } = useIntroTimer();

  return (
    <div className="flex items-center justify-center w-screen h-max relative">
      {/*<ModalParlonsDesignMobile isOpen={isOpen} />
       {shouldPlayIntro ? (
        <LoaderIntro />
      ) : ( */}
      <div className="flex flex-col items-center justify-start w-screen bg-gray-600">
        <Suspense fallback={<div>Chargement...</div>}>
          <HeaderMobile
            setIsOpen={setIsOpen}
            isIntroFinish={isIntroFinish}
            isOpen={isOpen}
          />

          {/* Rendu des sections */}
          <Section1Mobile />
          <Section2Mobile />
          <Section3Mobile />
          <Section4Mobile />
          {/* <Section5Mobile setIsOpen={setIsOpen} /> */}
          {/*<Footer /> */}
        </Suspense>
      </div>
      {/* )} */}
    </div>
  );
}
