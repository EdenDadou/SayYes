interface LoaderIntroProps {
  loading: boolean;
}

export default function LoaderIntro({ loading }: LoaderIntroProps) {
  return (
    <div className={`absolute w-full h-screen top-0 left-0 right-0 z-50`}>
      <div className="absolute inset-0">
        <video
          className={`w-full h-screen object-cover transition-opacity duration-1000 ${
            loading ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
        >
          <source src="app/assets/video/intro.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
