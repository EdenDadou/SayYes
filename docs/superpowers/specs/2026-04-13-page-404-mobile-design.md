---
name: Page 404 Mobile - Refonte graphique
description: Correction graphique de la page 404 mobile pour correspondre au design Figma (node 1803:7634)
type: project
---

# Page 404 Mobile — Design Spec

## Contexte

La page 404 mobile existante est graphiquement cassée. Le design Figma de référence montre une mise en page différente de l'implémentation actuelle. Ce document décrit la structure cible.

**Fichiers concernés :**
- `app/components/Screens/404/mobile/Page404Mobile.tsx`
- `app/components/Screens/404/mobile/Background404Mobile.tsx`

**Référence Figma :** `ClMON0R1BhbPM9NZnPIYtO`, node `1803:7634`

---

## Structure cible (Option B — Hybride)

### `Background404Mobile.tsx`

Fond complet en `absolute inset-0` :

1. **Gif Kermit** — `absolute top-0 left-0 w-full`, hauteur ~55vh, `backgroundSize: "180vw"`, décalé de `-40vw` horizontalement (identique à l'actuel)
2. **Gradient haut** — fondu noir vers transparent (h-28)
3. **Gradient bas** — fondu transparent vers noir (40vh), overlap sur le contenu
4. **Gradient gauche** — fondu noir vers transparent (w-16)
5. **Gradient droit** — fondu noir vers transparent (w-16)
6. **Effets glow ellipses** — 3 ellipses floues violets/bleus, `opacity-80`, positionnées à partir de `top-[50vh]`, reproduisant l'effet lumineux du Figma sous le gif

### `Page404Mobile.tsx`

Conteneur `fixed inset-0 flex flex-col bg-black` :

1. **Background404Mobile** — occupe tout l'écran en absolute
2. **Loading bar** — `holographic-bg`, positionnée `ml-10 mt-[55vh]`, largeur 106px (~27vw), hauteur 4-5px
3. **Titre** — image `images/404/Title404.png`, largeur `77vw` (~302px sur 390px), hauteur auto, `ml-10 mt-3`, z-10
4. **Bouton "Accueil"** — composant `Button` type `border`, **centré** (`self-center mx-auto`), `mt-auto` pour pousser vers le bas
5. **Icônes réseaux sociaux** — rangée flex horizontale, `ml-[45px] mb-8`, gap-3

---

## Différences vs implémentation actuelle

| Élément | Avant | Après |
|---|---|---|
| Alignement contenu | `justify-end` (tout en bas) | Flex column avec espacement naturel |
| Loading bar | En dessous du titre | Au-dessus du titre (top du contenu) |
| Titre | `w-[85vw] aspect-[16/10]` | `w-[77vw]` hauteur auto |
| Bouton | Aligné à gauche | Centré (`mx-auto`) |
| Glow ellipses | Absent | Ajouté dans Background404Mobile |

---

## Contraintes

- Utiliser les composants existants : `Button`, icônes sociales SVG, `holographic-bg`
- Ne pas installer de dépendances supplémentaires
- Garder le `useEffect` pour bloquer le scroll
- Le texte "Notre meilleur agent est sur le coup !" est dans l'image `Title404.png`, pas à ajouter en HTML
