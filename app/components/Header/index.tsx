import { useEffect, useState, useCallback } from "react";
import { redirect, useNavigate } from "@remix-run/react";
import Button from "../Button";
import LogoSayYes from "~/components/Header/components/LogoSayYes";
import ChatBuble from "./components/ChatBuble";
import Flamme from "./components/Flamme";
import Coeur from "./components/Coeur";
import Smile from "./components/Smile";
import Idea from "./components/Idea";

const Header = () => {
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);

  // const controlHeader = useCallback(() => {
  //   const currentScrollY = window.scrollY;
  //   if (currentScrollY > lastScrollY && currentScrollY > 50) {
  //     setLastScrollY(currentScrollY);
  //   } else if (lastScrollY - currentScrollY > 200 || currentScrollY < 100) {
  //     setLastScrollY(currentScrollY);
  //   }
  // }, [lastScrollY]);

  // useEffect(() => {
  //   window.addEventListener("scroll", controlHeader);
  //   return () => {
  //     window.removeEventListener("scroll", controlHeader);
  //   };
  // }, [controlHeader]);

  return (
    <div className="header-custom border-custom flex flex-row justify-between items-center relative m-10 mx-16 h-[74px]">
      {/* Section gauche */}
      <div className="flex flex-row items-center gap-8 flex-1 pl-8">
        <div className="font-jakarta text-lg">Communication visuelle*</div>
        <Button
          label="Solutions"
          leftIcon={<Flamme className="text-shadow-lg shadow-black" />}
          onClick={() => navigate("/solutions")}
        />
        <Button
          label="Portfolio"
          leftIcon={<Coeur />}
          onClick={() => navigate("/portfolio")}
        />
      </div>

      {/* Logo centré */}
      <LogoSayYes
        className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[5px]"
        onClick={() => navigate("/")}
      />

      {/* Section droite */}
      <div className="flex flex-row items-center gap-8 flex-1 justify-end">
        <Button
          label="L'agence"
          leftIcon={<Smile />}
          onClick={() => navigate("/agence")}
        />
        <Button
          label="Ressources"
          leftIcon={<Idea />}
          onClick={() => navigate("/ressources")}
        />
        <Button
          label="Parlons Design !"
          leftIcon={<ChatBuble />}
          type="plain"
        />
      </div>
    </div>
  );
};

export default Header;
