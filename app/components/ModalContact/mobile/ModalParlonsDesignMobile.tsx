import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";

export default function ModalContactDesignMobile() {
  return (
    <div className="flex flex-col items-center justify-start w-full h-max bg-gray-400">
      <div
        className="w-full h-full flex flex-col items-center py-28 gap-8 px-5"
        style={{
          backgroundImage: 'url("images/modal/bgModalMobile.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          loading="lazy"
          src="/images/modal/IntroModal.png"
          alt="Intro Parlons design"
          className="w-full"
        />
        <div className="flex flex-row h-5 gap-3">
          <SvgBtnLinkedin className="w-8 h-8" />
          <SvgBtnFacebook className="w-8 h-8" />
          <SvgBtnInstagram className="w-8 h-8" />
          <SvgBtnTiktok className="w-8 h-8" />
          <SvgBtnYoutube className="w-8 h-8" />
        </div>
        <form className="w-full drop-shadow-custom shadow-left p-8 flex flex-col gap-8 bg-gray-400 rounded-2xl">
          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Nom & prénom
            </span>
            <input
              type="text"
              name="name"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="Franceskini"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Email
            </span>
            <input
              type="email"
              name="email"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="lasaintepaire@gmail.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Mobile*
            </span>
            <input
              type="tel"
              name="mobile"
              required
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="0667234354"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Entreprise
            </span>
            <input
              type="text"
              name="company"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-jakarta-bold py-1"
              placeholder="Say Yes"
            />
          </label>

          <label className="block">
            <span className="text-sm text-jakarta-bold holographic-text font-bold">
              Message*
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full bg-transparent border border-gray-300 rounded p-2 mt-3 focus:outline-none placeholder-gray-300::placeholder"
              placeholder="Bonjour"
            ></textarea>
          </label>
        </form>
      </div>
    </div>
  );
}
