import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { useState, useCallback, memo } from "react";
import ModalContact from "~/components/Screens/ModalContact";
import Footer from "~/components/Footer";
import "~/styles/tailwind.css";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface ILayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  footerType?: "default" | "home";
}

const Desktoplayout = memo(function Desktoplayout({
  children,
  footer = true,
  footerType = "default",
}: ILayoutProps) {
  const [isOpenModalContact, setIsOpenModalContact] = useState(false);
  const location = useLocation();

  const closeModal = useCallback(() => setIsOpenModalContact(false), []);

  return (
    <main className="w-full h-fit relative flex flex-col">
      <ModalContact isOpen={isOpenModalContact} close={closeModal} />
      <Header setIsOpenModalContact={setIsOpenModalContact} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {footer ? (
        <Footer
          setIsOpenModalContact={setIsOpenModalContact}
          footerType={footerType}
        />
      ) : null}
    </main>
  );
});

export default Desktoplayout;
