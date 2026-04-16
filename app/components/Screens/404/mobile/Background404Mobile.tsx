export default function Background404Mobile() {
  return (
    <>
      {/* Fond complet — gradient violet + titre (bgMobile.png) */}
      <div
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={{
          backgroundImage: 'url("/images/404/bgMobile.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* GIF animé — backgroundImage CSS intentionnel car Sharp/OptimizedImage ne supporte pas les GIFs */}
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
        {/* Gradient bas */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "15vh",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0,0,0,0))",
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
