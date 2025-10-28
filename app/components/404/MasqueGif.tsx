export default function MasqueGif({
  height,
  width,
  right = 0,
  rounded = false,
  bold = false,
}: {
  height: string;
  width: string;
  right?: number;
  rounded?: boolean;
  bold?: boolean;
}) {
  return (
    <div
      className="absolute z-10"
      style={{
        right: right,
        width: width, // Match the parent container width
        height: height,
      }}
    >
      <div
        className="absolute left-0 top-0 w-60 h-full"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 1) 15%, transparent)",
        }}
      />

      <div
        className={`absolute right-0 top-0 w-40 h-full ${rounded ? "rounded-r-2xl" : ""}`}
        style={{
          background: "linear-gradient(to left, rgba(0, 0, 0, 1), transparent)",
        }}
      />

      {/* Top blur overlay */}
      <div
        className={`absolute top-0 left-0 w-full ${rounded ? "rounded-r-2xl" : ""} ${bold ? "h-80" : "h-32"}`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, transparent)",
        }}
      />

      {/* Bottom blur overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full h-40 ${rounded ? "rounded-r-2xl" : ""}`}
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 15%, transparent)",
        }}
      />
    </div>
  );
}
