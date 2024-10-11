interface ModalParlonsDesignProps {
  isOpen: boolean;
  close: () => void;
}

export default function ModalParlonsDesign({
  isOpen,
  close,
}: ModalParlonsDesignProps) {
  return isOpen ? (
    <div className="fixed top-0 left-0 z-[100] flex items-center justify-center w-full h-screen bg-black bg-opacity-75">
      <div className="relative bg-white p-8 rounded-md">
        <button className="absolute top-2 right-2 text-black" onClick={close}>
          X
        </button>
        <p>Coucou</p>
      </div>
    </div>
  ) : null;
}
