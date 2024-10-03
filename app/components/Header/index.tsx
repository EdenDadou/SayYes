import SvgLogo from "~/assets/icons/Logo";
import Button from "../Button";
import SvgFlamme from "~/assets/icons/Flamme";
import SvgCoeur from "~/assets/icons/Coeur";
import SvgSmile from "~/assets/icons/Smile";
import SvgLight from "~/assets/icons/Light";

const Header = () => {
  return (
    <div className="relative top-0 w-full h-24 bg-[#2E2E2E3B] flex flex-row items-center justify-between px-7 shadow-md">
      <div className="holographic-text">Comunication visuelle*</div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-row gap-10 items-center">
        <Button
          label="Solutions"
          leftIcon={<SvgFlamme className="text-shadow-lg shadow-black" />}
        />

        <Button label="Portfolio" leftIcon={<SvgCoeur />} />
        <SvgLogo width={150} height={118} className="rotate-2" />
        <Button label="L’agence" leftIcon={<SvgSmile />} />
        <Button label="Ressources" leftIcon={<SvgLight />} />
      </div>
      <div>Parlons design !</div>
    </div>
  );
};

export default Header;
