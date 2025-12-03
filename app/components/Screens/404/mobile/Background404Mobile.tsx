import Background404 from "../Background404";

export default function Background404Mobile() {
  return (
    <div
      className="absolute top-24 left-0 w-full z-0"
      style={{
        backgroundImage: 'url("images/404/404.gif")',
        backgroundSize: "180vw",
        backgroundPositionX: "-40vw",
        backgroundRepeat: "no-repeat",
        height: "calc(100vh - 6rem)", // 6rem = top-24
        minHeight: "-webkit-fill-available",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 5%, transparent)",
        }}
      />
      <div
        className={`absolute bottom-[95vw] left-0 w-full h-80 z-0`}
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 15%, transparent)",
        }}
      />
      <div
        className="absolute left-0 top-0 w-20 h-full"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.9) 15%, transparent)",
        }}
      />

      <div
        className={`absolute right-0 top-0 w-20 h-full`}
        style={{
          background:
            "linear-gradient(to left, rgba(0, 0, 0, 0.9), transparent)",
        }}
      />
      <Background404 className="absolute w-max h-screen z-20" />
    </div>
  );
}
