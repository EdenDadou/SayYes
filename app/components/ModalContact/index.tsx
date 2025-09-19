import { useEffect, useState } from "react";
import ContentContact from "./components/ContentContact";
import ContentSuccess from "./components/ContentSuccess";

interface ModalModalContactProps {
  isOpen: boolean;
  close: () => void;
}

export default function ModalContact({
  isOpen,
  close,
}: ModalModalContactProps) {
  const [success, setSuccess] = useState(false);

  // Bloquer le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function pour restaurer le scroll quand le component se démonte
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center w-full h-screen  ${
        isOpen ? "block" : "hidden"
      }`}
      style={{
        background: "rgba(0, 0, 0, 0.30)",
        backdropFilter: "blur(25px)",
      }}
    >
      {success ? (
        <ContentSuccess setSuccess={setSuccess} close={close} />
      ) : (
        <ContentContact setSuccess={setSuccess} close={close} />
      )}
    </div>
  );
}
