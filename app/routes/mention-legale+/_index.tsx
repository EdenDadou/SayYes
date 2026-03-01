import Desktoplayout from "~/components/Layout/Desktop";
import MobileLayout from "~/components/Layout/Mobile";
import { useViewport } from "~/utils/hooks/useViewport";
import Background from "~/assets/icons/Background";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";
import { AnimatePresence, motion } from "framer-motion";

export default function MentionLegale() {
  const isMobile = useViewport();

  if (isMobile === null) {
    return null;
  }

  return isMobile ? (
    <MobileLayout>
      <BackgroundMobile className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      <section className="glass-card relative z-10 px-6 flex flex-col gap-6 justify-center items-center pt-20 pb-10">
        <h1 className="text-3xl font-jakarta-bold text-white">
          Mentions Légales
        </h1>
        <div className="text-white text-sm flex flex-col gap-4 w-full">
          <h2 className="font-jakarta-semi-bold text-lg">Éditeur du site</h2>
          <p>
            Le site say-yes.fr est édité par la société LA SAINTE PAIRE, société par actions simplifiée au capital de 12 500 €, dont le siège social est situé 40 rue Servan, 75011 Paris, immatriculée au RCS de Paris sous le numéro 850 858 820.
          </p>
          <p>Numéro de TVA intracommunautaire : FR35 850 858 820</p>
          <p>Email : contact@lasaintepaire.com</p>
          <p>Téléphone : +33 (0)9 83 79 05 06</p>
          <p>La marque SAY YES est une marque appartenant à la société LA SAINTE PAIRE.</p>
          <p>Directeur de la publication : Javier Millan</p>

          <h2 className="font-jakarta-semi-bold text-lg mt-2">Hébergement</h2>
          <p>
            Le site est hébergé par OVH SAS,<br />
            2 rue Kellermann, 59100 Roubaix, France<br />
            Téléphone : 1007
          </p>

          <h2 className="font-jakarta-semi-bold text-lg mt-2">Propriété intellectuelle</h2>
          <p>
            L'ensemble du site say-yes.fr, incluant notamment les textes, images, graphismes, illustrations, logos et contenus, est protégé par le droit de la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation, totale ou partielle, du site ou de l'un de ses éléments, sans autorisation écrite préalable de LA SAINTE PAIRE, est strictement interdite.
          </p>

          <h2 className="font-jakarta-semi-bold text-lg mt-2">Données personnelles</h2>
          <p>Le site say-yes.fr est un site vitrine permettant la prise de contact.</p>
          <p>Des données personnelles peuvent être collectées via les formulaires afin de répondre aux demandes des utilisateurs.</p>
          <p>
            Le traitement de ces données est assuré par LA SAINTE PAIRE, responsable du traitement, exclusivement pour la gestion des demandes de contact et la communication professionnelle.
          </p>
          <p>Les données sont conservées pendant une durée strictement nécessaire au traitement des demandes.</p>
          <p>
            Conformément à la réglementation en vigueur, les utilisateurs disposent d'un droit d'accès, de rectification, d'opposition et de suppression de leurs données, qu'ils peuvent exercer en écrivant à : contact@lasaintepaire.com.
          </p>
          <p>Ils disposent également du droit d'introduire une réclamation auprès de la CNIL.</p>

          <h2 className="font-jakarta-semi-bold text-lg mt-2">Cookies</h2>
          <p>
            Le site utilise des cookies de mesure d'audience et de diffusion publicitaire, notamment via CookieYes et Google Ads.
          </p>
          <p>
            Le dépôt de ces cookies est soumis au consentement de l'utilisateur, qui peut les accepter, les refuser ou les paramétrer à tout moment via le bandeau de gestion des cookies.
          </p>

          <h2 className="font-jakarta-semi-bold text-lg mt-2">Crédits</h2>
          <p>Design graphique : From Paris with love by SAY YES</p>
          <p>Développement : réalisé avec soin, talent et une bonne dose de café par Eden Wisnievski.</p>
        </div>
      </section>
    </MobileLayout>
  ) : (
    <Desktoplayout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
        >
          <Background className="absolute -top-48 left-0 w-full h-auto z-0 opacity-80" />
        </motion.div>
      </AnimatePresence>
      <section className="glass-card relative z-10 w-[988px] mx-auto flex flex-col gap-8 justify-center items-start pt-32 mb-10 p-14">
        <div className="h-[3px] w-20 holographic-bg my-2 rounded-full" />
        <h1 className="text-[70px] font-jakarta-semi-bold holographic-text leading-[90px] tracking-[-3.5px]">
          Mentions Légales
        </h1>

        <div className="h-[1px] w-full bg-gray-300 my-4 rounded-full" />

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Éditeur du site
        </h2>
        <p>
          Le site say-yes.fr est édité par la société LA SAINTE PAIRE, société par actions simplifiée au capital de 12 500 €, dont le siège social est situé 40 rue Servan, 75011 Paris, immatriculée au RCS de Paris sous le numéro 850 858 820.
        </p>
        <p>Numéro de TVA intracommunautaire : FR35 850 858 820</p>
        <p>Email : contact@lasaintepaire.com</p>
        <p>Téléphone : +33 (0)9 83 79 05 06</p>
        <p>La marque SAY YES est une marque appartenant à la société LA SAINTE PAIRE.</p>
        <p>Directeur de la publication : Javier Millan</p>

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Hébergement
        </h2>
        <p>
          Le site est hébergé par OVH SAS,<br />
          2 rue Kellermann, 59100 Roubaix, France<br />
          Téléphone : 1007
        </p>

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Propriété intellectuelle
        </h2>
        <p>
          L’ensemble du site say-yes.fr, incluant notamment les textes, images, graphismes, illustrations, logos et contenus, est protégé par le droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification ou exploitation, totale ou partielle, du site ou de l’un de ses éléments, sans autorisation écrite préalable de LA SAINTE PAIRE, est strictement interdite.
        </p>

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Données personnelles
        </h2>
        <p>Le site say-yes.fr est un site vitrine permettant la prise de contact.</p>
        <p>Des données personnelles peuvent être collectées via les formulaires afin de répondre aux demandes des utilisateurs.</p>
        <p>
          Le traitement de ces données est assuré par LA SAINTE PAIRE, responsable du traitement, exclusivement pour la gestion des demandes de contact et la communication professionnelle.
        </p>
        <p>Les données sont conservées pendant une durée strictement nécessaire au traitement des demandes.</p>
        <p>
          Conformément à la réglementation en vigueur, les utilisateurs disposent d’un droit d’accès, de rectification, d’opposition et de suppression de leurs données, qu’ils peuvent exercer en écrivant à : contact@lasaintepaire.com.
        </p>
        <p>Ils disposent également du droit d’introduire une réclamation auprès de la CNIL.</p>

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Cookies
        </h2>
        <p>
          Le site utilise des cookies de mesure d’audience et de diffusion publicitaire, notamment via CookieYes et Google Ads.
        </p>
        <p>
          Le dépôt de ces cookies est soumis au consentement de l’utilisateur, qui peut les accepter, les refuser ou les paramétrer à tout moment via le bandeau de gestion des cookies.
        </p>

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Crédits
        </h2>
        <p>Design graphique : From Paris with love by SAY YES</p>
        <p>Développement : réalisé avec soin, talent et une bonne dose de café par Eden Wisnievski.</p>
      </section>
    </Desktoplayout>
  );
}
