import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { useState, useCallback, memo } from "react";
import ModalContact from "~/components/Screens/ModalContact";
import Footer from "~/components/Footer";
import "~/styles/tailwind.css";
import { AnimatePresence, motion } from "framer-motion";

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

  const closeModal = useCallback(() => setIsOpenModalContact(false), []);

  return (
    <main className="w-full h-fit relative flex flex-col">
      <ModalContact isOpen={isOpenModalContact} close={closeModal} />
      <Header setIsOpenModalContact={setIsOpenModalContact} />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
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
