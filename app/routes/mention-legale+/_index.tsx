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
      <section className="glass-card relative z-10 px-6 flex flex-col gap-6 justify-center items-center pt-20">
        <h1 className="text-3xl font-jakarta-bold text-white">
          Mentions Légales
        </h1>
        <div className="text-white text-sm">
          {/* Contenu des mentions légales à ajouter */}
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
          Publication
        </h2>
        <p>
          Le site www.harfanglab.io (ci-après le « Site ») est la propriété
          d'HarfangLab, dont le siège social se situe au 55 rue de la Boétie
          75008 Paris et les bureaux se situent au 336 rue Saint-Honoré 75001
          Paris.
        </p>
        <p>
          E-mail : contact@harfanglab.fr / Directeur de publication : Mr
          Grégoire Germain.‍
        </p>

        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          Hébergement du site
        </h2>
        <p>
          Ce site web est hébergé par un prestataire de services externe
          (Webflow, Inc.). Les données personnelles collectées sur ce site web
          sont stockées sur les serveurs de l'hébergeur. Il peut s'agir
          d'adresses IP, de demandes de contact, de métadonnées et de données de
          communication, de données contractuelles, de coordonnées, de noms,
          d'accès au site web et d'autres données générées par un site web. Le
          recours à l'hébergeur a pour but d'exécuter le contrat avec nos
          clients potentiels et existants (art. 6 al. 1 lit. b GDPR) et dans
          l'intérêt d'une mise à disposition sûre, rapide et efficace de notre
          offre en ligne par un prestataire professionnel (art. 6 al. 1 lit. f
          GDPR). Notre hébergeur ne traitera vos données que dans la mesure où
          cela est nécessaire pour remplir ses obligations de performance et
          suivra nos instructions en ce qui concerne ces données.
        </p>
        <h2 className="flex flex-row gap-4 font-jakarta-semi-bold text-2xl items-center">
          <div className="h-[3px] w-8 holographic-bg my-2 rounded-full" />
          ‍Contenu et propriété intellectuelle
        </h2>
        <p>
          exactitude, leur complétude et leur actualité. Elles peuvent être
          périodiquement modifiées et les modifications seront incorporées dans
          les nouvelles éditions. Les informations de ce site peuvent contenir
          des erreurs typographiques ou des inexactitudes techniques.
        </p>
        <p>
          L’entreprise mettra cependant tout en œuvre pour corriger les
          éventuelles erreurs qui lui seront signalées, merci d’utiliser le
          formulaire de contact pour nous faire part de vos remarques et
          observations.
        </p>
        <p>
          HarfangLab peut, à tout moment et sans préavis, apporter des
          améliorations ou des changements aux produits, aux programmes ou aux
          services présentés sur ce site. Toute reproduction, représentation,
          modification, publication, transmission, dénaturation, totale ou
          partielle du site ou de son contenu, par quelque procédé que ce soit,
          et sur quelque support que ce soit est interdite. Toute exploitation
          non autorisée du site ou de son contenu, des informations qui y sont
          divulguées engagerait la responsabilité de l’utilisateur et
          constituerait une contrefaçon sanctionnée par les articles L 335-2 et
          suivants du Code de la Propriété Intellectuelle. Il en est de même des
          bases de données figurant, le cas échéant, sur le Site qui sont
          protégées par les dispositions de la loi du 1er juillet 1998 portant
          transposition dans le Code de la Propriété Intellectuelle de la
          Directive Européenne du 11 mars 1996 relative à la protection
          juridique des bases de données. A ce titre, toute reproduction ou
          extraction engagerait la responsabilité de l’utilisateur.
        </p>
      </section>
    </Desktoplayout>
  );
}
