import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center w-full h-screen"
          style={{
            background: "rgba(0, 0, 0, 0.30)",
            backdropFilter: "blur(25px)",
          }}
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="size-full items-center justify-center w-full h-screen flex"
            >
              <ContentSuccess setSuccess={setSuccess} close={close} />
            </motion.div>
          ) : (
            <ContentContact setSuccess={setSuccess} close={close} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
