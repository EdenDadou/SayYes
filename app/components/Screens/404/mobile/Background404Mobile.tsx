import Background404 from "../Background404";

// Shared with Page404Mobile — both must match for content to sit exactly below the GIF
export const GIF_HEIGHT_VH = "55vh";

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
          height: GIF_HEIGHT_VH,
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
        {/* Gradient bas — léger fondu, Kermit reste visible */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "18vh",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0,0,0,0))",
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

      {/* Glow violet/bleu — même teinte que purple-halo du projet (#4f0bac) */}
      <div
        className="absolute w-full pointer-events-none"
        style={{ top: "28vh", height: "72vh", opacity: 0.9 }}
      >
        {/* Halo principal — violet profond */}
        <div
          className="absolute"
          style={{
            width: "130%",
            height: "45%",
            left: "-15%",
            top: "5%",
            background:
              "radial-gradient(ellipse at 50% 50%, #4f0bac 0%, rgba(50, 80, 200, 0.5) 40%, transparent 70%)",
            filter: "blur(40px)",
            transform: "rotate(-12deg) scaleY(0.6)",
          }}
        />
        {/* Halo bleu complémentaire */}
        <div
          className="absolute"
          style={{
            width: "130%",
            height: "45%",
            left: "-15%",
            top: "15%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(40, 80, 220, 0.6) 0%, rgba(79, 11, 172, 0.3) 40%, transparent 70%)",
            filter: "blur(55px)",
            transform: "rotate(-8deg) scaleY(0.5)",
          }}
        />
        {/* Halo bas — extension progressive */}
        <div
          className="absolute"
          style={{
            width: "160%",
            height: "50%",
            left: "-30%",
            top: "30%",
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(79, 11, 172, 0.4) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <Background404 className="absolute w-max h-screen -z-20" />
    </div>
  );
}
