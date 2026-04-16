import BackgroundModalMobile from "~/components/Screens/ModalContact/assets/BackgroundModalMobile";

export default function Background404Mobile() {
  return (
    <>
      {/* Dégradé bleu/violet — positionné en bas, fond de tout */}
      <BackgroundModalMobile
        className="absolute bottom-0 left-0 w-full"
        aria-hidden="true"
        style={{ height: "62%" }}
      />

      {/* bgMobile.png : texte + ligne lumineuse par-dessus le dégradé.
          mix-blend-mode screen : les zones noires deviennent transparentes,
          le texte blanc et la ligne restent visibles */}
      <div
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={{
          backgroundImage: 'url("/images/404/bgMobile.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
        }}
      />

      {/* GIF animé — en haut, fondu vers transparent en bas pour révéler le dégradé */}
      <div
        className="absolute top-0 left-0 w-full"
        aria-hidden="true"
        style={{
          backgroundImage: 'url("/images/404/404.gif")',
          backgroundSize: "180vw",
          backgroundPositionX: "-40vw",
          backgroundRepeat: "no-repeat",
          height: "48vh",
        }}
      >
        {/* Gradient haut */}
        <div
          className="absolute top-0 left-0 w-full h-28"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0,0,0,0))",
          }}
        />
        {/* Gradient bas — fondu vers transparent pour révéler le fond bleu/violet */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "18vh",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0))",
          }}
        />
        {/* Gradient gauche */}
        <div
          className="absolute left-0 top-0 w-16 h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.9) 15%, rgba(0,0,0,0))",
          }}
        />
        {/* Gradient droit */}
        <div
          className="absolute right-0 top-0 w-16 h-full"
          style={{
            background:
              "linear-gradient(to left, rgba(0, 0, 0, 0.9), rgba(0,0,0,0))",
          }}
        />
      </div>
    </>
  );
}
