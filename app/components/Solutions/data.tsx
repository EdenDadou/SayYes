import ContentSolution from "../Card/components/Solution/ContentSolution";

export const solutionsCards = [
  {
    height: "560px",
    content: (
      <ContentSolution
        imageUrl="/images/solutions/Card1.png"
        videoUrl="/video/bureau.mov"
        subtitle="Étape N°1"
        title1="Définir vos"
        title2="objectifs"
        bulletPoints={[
          "Créer ou moderniser mon branding",
          "Se démarquer de mes concurrents",
          "Optimiser une campagne de communication",
          "Valorisez mon évènement",
          "Améliorer ma présence digitale",
          "Rassembler mes collaborateurs",
        ]}
      />
    ),
    borderClass: "light-border",
  },
  {
    height: "560px",
    content: (
      <ContentSolution
        imageUrl="/images/solutions/Card2.png"
        subtitle="Étape N°2"
        title1="Créer votre"
        title2="identité visuelle"
        bulletPoints={[
          "Direction artistique",
          "Brand book",
          "Logo",
          "Charte graphique",
          "Illustration & iconographie",
          "Office branding",
        ]}
      />
    ),
    borderClass: "light-border",
  },
  {
    height: "560px",
    content: (
      <ContentSolution
        imageUrl="/images/solutions/Card3.png"
        subtitle="Étape N°3"
        title1="Décliner sur tous"
        title2="vos supports"
        bulletPoints={[
          "Site web & application",
          "Slide de présentation",
          "Live sketching",
          "Assets marketing",
          "Stand & kakémono",
          "Document print",
          "Vidéo",
          "Décoration de locaux",
        ]}
      />
    ),
    borderClass: "light-border",
  },
  {
    height: "560px",
    content: (
      <ContentSolution
        imageUrl="/images/solutions/Card4.png"
        subtitle="Étape N°4"
        title1="Pour tous"
        title2="vos canaux"
        bulletPoints={[
          "Com' interne & externe",
          "Web & réseaux sociaux",
          "Affichage publicitaire",
          "Évènement & salon",
          "Télévision",
          "Espace intérieur & extérieur",
        ]}
      />
    ),
    borderClass: "light-border",
  },
  {
    height: "560px",
    content: (
      <ContentSolution
        imageUrl="/images/solutions/Card5.png"
        subtitle="Mission accomplie !"
        title1="Votre branding"
        title2="est impeccable"
        bulletPoints={[
          "Une identité forte & reconnaissable immédiatement",
          "De la cohérence sur tous vos supports & canaux",
          "Aligner votre stratégie d’entreprise & votre communication",
          "Fédérer vos collaborateurs autour d’une vision commune",
        ]}
      />
    ),
    borderClass: "light-border",
  },
];
