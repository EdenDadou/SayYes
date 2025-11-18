import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { useState } from "react";
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
}

export default function Desktoplayout({
  children,
  footer = true,
}: ILayoutProps) {
  const [isOpenModalContact, setIsOpenModalContact] = useState(false);

  return (
    <main className="w-full h-fit relative flex flex-col">
      <ModalContact
        isOpen={isOpenModalContact}
        close={() => setIsOpenModalContact(false)}
      />
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
      {footer ? <Footer setIsOpenModalContact={setIsOpenModalContact} /> : null}
    </main>
  );
}
