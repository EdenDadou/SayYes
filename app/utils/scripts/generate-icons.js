import fs from "fs";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

// Déterminez __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDir = path.join(__dirname, "../../assets/icons/svg");
const outputDir = path.join(__dirname, "../../assets/icons");

console.info("Chemin du dossier SVG:", svgDir); // Affichez le chemin

fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error("Erreur en lisant le dossier SVG:", err.message);
    return;
  }

  files.forEach((file) => {
    const svgFilePath = path.join(svgDir, file);
    const outputFilePath = path.join(outputDir, file.replace(".svg", ".tsx"));

    // Vérifiez si le fichier de sortie existe déjà
    if (fs.existsSync(outputFilePath)) {
      console.info(
        `Le fichier ${outputFilePath} existe déjà, il ne sera pas écrasé.`
      );
    } else {
      // Exécutez la commande SVGR
      exec(
        `npx @svgr/cli --out-dir ${outputDir} --typescript -- ${svgFilePath}`,
        (error) => {
          if (error) {
            console.error(
              `Erreur lors de la génération de ${file}:`,
              error.message
            );
            return;
          }
          console.info(`Généré: ${outputFilePath}`);
        }
      );
    }
  });
});
