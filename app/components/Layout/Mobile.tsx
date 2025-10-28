import React, { useEffect, useState } from "react";
import HeaderMobile from "../Header/components/HeaderMobile";
import "~/styles/tailwind.css";
import FooterMobile from "../Footer/mobile/FooterMobile";
import ModalContactMobile from "../ModalContact/ModalContactMobile";
import MenuMobile from "../Header/components/MenuMobile";

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
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    if (isOpenModalContact || isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpenModalContact, isOpenMenu]);

  return (
    <main className="w-full h-fit relative">
      <ModalContactMobile
        isOpen={isOpenModalContact}
        close={() => setIsOpenModalContact(false)}
      />
      <MenuMobile isOpen={isOpenMenu} close={() => setIsOpenMenu(false)} />
      <HeaderMobile
        setIsOpenModalContact={setIsOpenModalContact}
        setIsOpenMenu={setIsOpenMenu}
        isOpenModalContact={isOpenModalContact}
        isOpenMenu={isOpenMenu}
      />
      {children}
      {footer ? (
        <FooterMobile setIsOpenModalContact={setIsOpenModalContact} />
      ) : null}
    </main>
  );
}
