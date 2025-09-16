import { Link } from "@remix-run/react";
import Desktoplayout from "../Layout/Desktop";

export default function Page404() {
  return (
    <Desktoplayout footer={false}>
      <div className="flex items-center justify-center w-screen h-full">
        <div className="flex flex-col items-center justify-start w-screen bg-gray-600">
          <div
            className="w-screen h-screen flex flex-col items-center justify-center"
            style={{
              backgroundImage: 'url("images/404/404.gif")',
              backgroundSize: "120%",
              backgroundPositionY: "-100px",
              backgroundPositionX: "-200px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full relative">
              <img
                loading="lazy"
                src="images/404/bg.png"
                alt="404"
                className="w-full"
              />
              <Link
                to="/"
                replace
                className="w-60 absolute top-[60%] left-[52%]"
              >
                <img loading="lazy" src="images/404/ctaSend.png" alt="404" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Desktoplayout>
  );
}
