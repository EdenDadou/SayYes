import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { useState } from "react";
import ModalContact from "~/components/ModalContact";
import Footer from "~/components/Footer";
import "~/styles/tailwind.css";

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
      {children}
      {footer ? <Footer /> : null}
    </main>
  );
}
