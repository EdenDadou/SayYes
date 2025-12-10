import { createContext, useContext, ReactNode } from "react";

interface ModalContactContextType {
  openModalContact: () => void;
}

const ModalContactContext = createContext<ModalContactContextType | undefined>(
  undefined
);

interface ModalContactProviderProps {
  children: ReactNode;
  openModalContact: () => void;
}

export function ModalContactProvider({
  children,
  openModalContact,
}: ModalContactProviderProps) {
  return (
    <ModalContactContext.Provider value={{ openModalContact }}>
      {children}
    </ModalContactContext.Provider>
  );
}

export function useModalContact() {
  const context = useContext(ModalContactContext);
  if (context === undefined) {
    throw new Error(
      "useModalContact must be used within a ModalContactProvider"
    );
  }
  return context;
}

