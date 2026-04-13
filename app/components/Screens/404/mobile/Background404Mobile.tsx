import Background404 from "../Background404";

export default function Background404Mobile() {
  return (
    <div
      className="absolute top-0 left-0 w-full z-0"
      style={{
        backgroundImage: 'url("images/404/404.gif")',
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
      {/* Ombre bas du gif */}
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
      <Background404 className="absolute w-max h-screen -z-20" />
    </div>
  );
}
