import { Link } from "@remix-run/react";
import ModalParlonsDesign from "../../ModalParlonsDesign";
import { useState } from "react";
import HeaderMobile from "~/components/Header/mobile/HeaderMobile";

export default function Page404Mobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-center w-screen h-full">
      <ModalParlonsDesign isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className="flex flex-col items-center justify-start w-screen bg-gray-600">
        <HeaderMobile setIsOpen={setIsOpen} isIntroFinish={true} />
        <div
          className="w-screen h-screen flex flex-col items-center justify-center"
          style={{
            backgroundImage: 'url("images/404/404.gif")',
            backgroundSize: "120vh",
            backgroundPositionY: "-40px",
            backgroundPositionX: "-550px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full relative">
            <img
              src="images/404/bgMobile.png"
              alt="404"
              className="w-full h-screen"
            />
            <Link
              to="/"
              replace
              className="w-48 absolute bottom-[5%] right-[3%]"
            >
              <img src="images/404/ctaSend.png" alt="404" />
            </Link>
          </div>
        </div>
        {/* <FooterMobile /> */}
      </div>
    </div>
  );
}
