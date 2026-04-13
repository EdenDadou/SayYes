import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface ScrollLockContextType {
  isScrollLocked: boolean;
  setIsScrollLocked: (value: boolean) => void;
}

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(
  undefined
);

export const ScrollLockProvider = ({ children }: { children: ReactNode }) => {
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  const value = useMemo(
    () => ({ isScrollLocked, setIsScrollLocked }),
    [isScrollLocked]
  );

  return (
    <ScrollLockContext.Provider value={value}>
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
