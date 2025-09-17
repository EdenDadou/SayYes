import React, { useState } from "react";
import HeaderMobile from "../Header/HeaderMobile";
import "~/styles/tailwind.css";
import FooterMobile from "../Footer/mobile/FooterMobile";
import ModalContactMobile from "../ModalContact/ModalContactMobile";

interface ILayoutProps {
  children: React.ReactNode;
  footer?: boolean;
}

export const VIDEO_DURATION = 4.5;

export default function MobileLayout({
  children,
  footer = true,
}: ILayoutProps) {
  const [isOpenModalContact, setIsOpenModalContact] = useState(false);

  return (
    <main className="w-full h-fit relative">
      <ModalContactMobile
        isOpen={isOpenModalContact}
        close={() => setIsOpenModalContact(false)}
      />
      <HeaderMobile setIsOpenModalContact={setIsOpenModalContact} />
      {children}
      {footer ? <FooterMobile /> : null}
    </main>
  );
}
