import Background404 from "../Background404";

export default function Background404Mobile() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {/* GIF animé — backgroundImage CSS intentionnel car Sharp/OptimizedImage ne supporte pas les GIFs */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          backgroundImage: 'url("/images/404/404.gif")',
          backgroundSize: "180vw",
          backgroundPositionX: "-40vw",
          backgroundRepeat: "no-repeat",
          height: "55vh",
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
        {/* Gradient bas */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "40vh",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 60%, rgba(0,0,0,0))",
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

      {/* Glow ellipses violet/bleu sous le gif */}
      <div
        className="absolute w-full opacity-80 pointer-events-none"
        style={{ top: "42vh", height: "65vh" }}
      >
        {/* Ellipse 1 — large, violette, inclinée */}
        <div
          className="absolute"
          style={{
            width: "180%",
            height: "65%",
            left: "-40%",
            top: "0",
            background:
              "radial-gradient(ellipse at center, rgba(90, 70, 190, 0.45) 0%, rgba(50, 110, 200, 0.2) 45%, transparent 70%)",
            filter: "blur(45px)",
            transform: "rotate(-10deg) skewX(7deg)",
          }}
        />
        {/* Ellipse 2 — légèrement décalée, plus bleue */}
        <div
          className="absolute"
          style={{
            width: "180%",
            height: "75%",
            left: "-40%",
            top: "8%",
            background:
              "radial-gradient(ellipse at center, rgba(70, 50, 170, 0.35) 0%, rgba(40, 90, 185, 0.15) 45%, transparent 70%)",
            filter: "blur(55px)",
            transform: "rotate(-15deg) skewX(7deg)",
          }}
        />
        {/* Ellipse 3 — plus basse, fondu */}
        <div
          className="absolute"
          style={{
            width: "200%",
            height: "55%",
            left: "-50%",
            top: "35%",
            background:
              "radial-gradient(ellipse at center, rgba(50, 30, 150, 0.25) 0%, transparent 70%)",
            filter: "blur(65px)",
            transform: "rotate(-5deg) skewX(2deg)",
          }}
        />
      </div>

      <Background404 className="absolute w-max h-screen -z-20" />
    </div>
  );
}
