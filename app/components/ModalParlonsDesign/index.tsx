interface ModalParlonsDesignProps {
  isOpen: boolean;
  close: () => void;
}

export default function ModalParlonsDesign({
  isOpen,
  close,
}: ModalParlonsDesignProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center w-full h-screen bg-black bg-opacity-90  ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="relative bg-white rounded-xl w-[77vw] h-[78vh] flex justify-end items-start"
        style={{
          backgroundImage: 'url("images/modal/bg.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "-10px",
        }}
      >
        <button
          className="absolute top-3 right-3 text-black cursor-pointer z-20"
          onClick={close}
        >
          <img
            loading="lazy"
            src="/images/modal/ctaClose.png"
            alt="close"
            width={20}
          />
        </button>
        <form className=" w-1/2 h-[78vh] drop-shadow-custom shadow-left p-8 py-10 flex flex-col gap-8">
          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Nom & prénom
            </span>
            <input
              type="text"
              name="name"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="Franceskini"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Email
            </span>
            <input
              type="email"
              name="email"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="lasaintepaire@gmail.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Mobile*
            </span>
            <input
              type="tel"
              name="mobile"
              required
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="0667234354"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Entreprise
            </span>
            <input
              type="text"
              name="company"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="Say Yes"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Message*
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full bg-transparent border border-gray-300 rounded p-2 mt-3 focus:outline-none placeholder-gray-300::placeholder"
              placeholder="Bonjour"
            ></textarea>
          </label>
        </form>
      </div>
    </div>
  );
}
