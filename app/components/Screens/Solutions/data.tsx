import ContentSolution from "~/components/Card/components/Solution/ContentSolution";

export const solutionsCards = [
  {
    height: "560px",
    content: (
      <ContentSolution
        imageUrl="/images/solutions/Card1.png"
        videoUrl="/video/bureau.mp4"
        subtitle="Étape N°1"
        title1="Définir vos"
        title2="objectifs"
        bulletPoints={[
          "Crée votre identité visuelle",
          "Fait rayonner votre évènement",
          "Développe votre stratégie digitale",
          "Optimise votre campagne de communication",
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
          "Logo et charte graphique",
          "Fresque murale",
          "Illustration et iconographie",
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
        title1="Décliner vos"
        title2="supports"
        bulletPoints={[
          "Site web et application",
          "Vidéo",
          "Print",
          "Slide de présentation",
          "Live sketching",
          "Stand et kakémono",
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
        title1="Enrichit vos"
        title2="canaux"
        bulletPoints={[
          "Web & réseaux sociaux",
          "Affichage publicitaire",
          "Évènement & salon",
          "Emission TV",
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
        subtitle="last"
        title1="Say Yes vous"
        title2="accompagne pour :"
        bulletPoints={[
          "Une identité forte",
          "Rendre cohérent vos supports et canaux",
          "Aligner la stratégie d’entreprise et la communication",
          "Fédérer vos collaborateurs autour d’une vision commune",
        ]}
      />
    ),
    borderClass: "light-border",
  },
];
