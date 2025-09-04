import { useEffect, useState, useCallback } from "react";
import { redirect } from "@remix-run/react";
import Button from "../Button";
import SvgFlamme from "~/components/Header/components/Flamme";
import SvgCoeur from "~/components/Header/components/Coeur";
import SvgSmile from "~/components/Header/components/Smile";
import SvgLight from "~/components/Header/components/Light";
import LogoSayYes from "~/components/Header/components/LogoSayYes";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowHeader(false);
      setLastScrollY(currentScrollY);
    } else if (lastScrollY - currentScrollY > 200 || currentScrollY < 100) {
      setLastScrollY(currentScrollY);
      setShowHeader(true);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [controlHeader]);

  return (
    <div className="header-custom flex flex-row justify-between items-center relative m-10 mx-16 h-[74px]">
      <div className="flex flex-row justify-between items-center px-8 py-2 w-2/5">
        <div className="font-jakarta text-lg">Communication visuelle*</div>
        <Button
          label="Solutions"
          leftIcon={<SvgFlamme className="text-shadow-lg shadow-black" />}
        />
        <Button label="Portfolio" leftIcon={<SvgCoeur />} />
      </div>
      <LogoSayYes
        width={150}
        height={120}
        className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[5px]"
        onClick={() => redirect("/")}
      />
      <div className="flex flex-row justify-between items-center w-2/5">
        <div className="flex flex-row justify-between items-center px-8 py-2">
          <Button label="L’agence" leftIcon={<SvgSmile />} />
          <Button label="Ressources" leftIcon={<SvgLight />} />
        </div>
        <Button label="Parlons Design !" leftIcon={<SvgLight />} type="plain" />
      </div>
    </div>
  );
};

export default Header;
