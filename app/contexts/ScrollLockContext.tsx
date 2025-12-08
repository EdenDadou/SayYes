import { createContext, useContext, useState, ReactNode } from "react";

interface ScrollLockContextType {
  isScrollLocked: boolean;
  setIsScrollLocked: (value: boolean) => void;
}

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(
  undefined
);

export const ScrollLockProvider = ({ children }: { children: ReactNode }) => {
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  return (
    <ScrollLockContext.Provider value={{ isScrollLocked, setIsScrollLocked }}>
      {children}
    </ScrollLockContext.Provider>
  );
};

export const useScrollLock = () => {
  const context = useContext(ScrollLockContext);
  if (!context) {
    return { isScrollLocked: false, setIsScrollLocked: () => {} };
  }
  return context;
};
