interface LoaderIntroProps {
  loading: boolean;
}

const LoaderIntro = ({ loading }: LoaderIntroProps) => {
  return (
    <div className="absolute w-full h-screen">
      <div className="absolute inset-0 z-50">
        <video
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
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
};

export default LoaderIntro;
