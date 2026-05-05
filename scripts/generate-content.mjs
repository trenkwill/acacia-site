#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function slug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function frontmatter(obj) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "string" && (v.includes(":") || v.includes("#") || v.includes("\n"))) {
      const safe = v.replace(/"/g, '\\"');
      lines.push(`${k}: "${safe}"`);
    } else if (typeof v === "string") {
      lines.push(`${k}: ${v.includes(" ") || v.includes("'") ? JSON.stringify(v) : v}`);
    } else {
      lines.push(`${k}: ${v}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

function writeMd(folder, slugName, fm, body = "") {
  const dir = join(root, "src", "content", folder);
  mkdirSync(dir, { recursive: true });
  const path = join(dir, `${slugName}.md`);
  const content = `${frontmatter(fm)}\n\n${body}\n`;
  writeFileSync(path, content, "utf8");
  console.log(`✓ ${folder}/${slugName}.md`);
}

// ============================================================
// PRODUITS
// ============================================================
const products = [
  {
    title: "Poteaux écorcés Acacia",
    image: "/images/image2.jpg",
    category: "poteaux",
    body:
      "Dimensions courantes : Diam : 6/8 à 20/24 cm Diam. À mi longueur.\n\n" +
      "Longueur : 1 à 6 m.\n\n" +
      "Fournisseurs : +/- 12 Possibilité en FSC et en PefC\n\n" +
      "Origine : Hongrie Slovaquie France",
  },
  {
    title: "Poteaux écorcés poncés",
    image: "/images/image3.jpeg",
    category: "poteaux",
    body:
      "(l'aubier est poncé) Dimension courantes : Diam : 6/8 à 20/24 cm (Diam. à mi longueur).\n\n" +
      "Longueur : 1 à 6 m.\n\n" +
      "Exceptionnellement : Diamètre jusqu'à 40 cm Longueur jusqu'à 12 m.\n\n" +
      "Fournisseurs : +/- 8 Possibilité en FSC\n\n" +
      "Origine : Hongrie Slovaquie",
  },
  {
    title: "Poteaux déaubiéré",
    image: "/images/image4.jpeg",
    category: "poteaux",
    body:
      "(l'aubier est poncé) Dimension courantes : Diam : 6/8 à 20/24 cm (Diam. à mi longueur).\n\n" +
      "Longueur : 1 à 6 m.\n\n" +
      "Exceptionnellement : Diamètre jusqu'à 40 cm Longueur jusqu'à 12 m.\n\n" +
      "Fournisseurs : +/- 8 Possibilité en FSC\n\n" +
      "Origine : Hongrie Slovaquie",
  },
  {
    title: "Poteaux fraisés en acacia",
    image: "/images/image5.JPG",
    category: "poteaux",
    body:
      "Diamètre de 4 à 20 cm Longueurs de 0,4 à 2,5 m. Prix : 2000 € le m³\n\n" +
      "Fournisseurs : +/- 3 Possibilités en PeFC\n\n" +
      "Origine : Hongrie, Italie, France",
  },
  {
    title: "Poteaux carrés / Poutres en acacia",
    image: "/images/image6.jpg",
    category: "poteaux",
    body:
      "Sections : de 4×4 à 15×15 cm. Longueurs courantes jusqu'à 3,0 m. Prix de 1500 à 2500 €/m³\n\n" +
      "Fournisseurs : +/- 10 Possibilité FSC PeFC\n\n" +
      "Origine : Hongrie, Italie, France",
  },
  {
    title: "Piquets sciés ou fendus « Quart de rond » en acacia",
    image: "/images/image8.jpg",
    category: "poteaux",
    body:
      "Poteaux sciés ou fendus. Écorcés ou non écorcés. Dimensions courantes 1,5 à 2,5 m.\n\n" +
      "Possibilité FSC et PeFC\n\n" +
      "Fournisseurs : +/- 10\n\n" +
      "Origine : Hongrie, Croatie, France",
  },
  {
    title: "Piquets sciés « marquant carrés » acacia",
    image: "/images/image10.jpg",
    category: "poteaux",
    body:
      "Sections les plus fréquentes : 22×22 mm, 25×25 mm, 30×30 mm.\n\n" +
      "Longueur de 0,5 à 1,5 m.\n\n" +
      "Origine Hongrie. Pas de PeFC possible.\n\n" +
      "Fournisseurs : +/- 14 Certifiés : 2",
  },
  {
    title: "Ganivelle en acacia",
    image: "/images/ganivelle_acacia.png",
    category: "amenagement",
    body:
      "Se définit par la hauteur et l'espacement entre les échalas. Les Hongrois proposent des types d'échalas différents – sciés, écorcés…\n\n" +
      "Fournisseurs : 1\n\n" +
      "Origine Hongrie",
  },
  {
    title: "Lames de terrasse massives",
    image: "/images/image12.jpg",
    category: "lames",
    body:
      "Rainurées ou non. Longueur des pièces entre 1 m et 2,5 m. Prix de 56 à 72 €/m²\n\n" +
      "Fournisseurs : +/- 10 Possibilité PeFC et 100 %\n\n" +
      "Origine : Hongrie, France",
  },
  {
    title: "Lames de terrasses aboutées",
    image: "/images/image14.jpg",
    category: "lames",
    body:
      "Origine : Roumanie, Allemagne.\n\n" +
      "Longueur jusqu'à 6 m. Largeurs de 80 mm à 120 mm.\n\n" +
      "2 technologies : joint transversal (avant ponçage) ou joint parallèle dit invisible.\n\n" +
      "Prix : 50 à 65 €/m²",
  },
  {
    title: "Dalles en acacia",
    image: "/images/image15.jpg",
    category: "lames",
    body:
      "Dimensions standard 50×50, 27×27 et 100×100 cm. Possibilités PeFC et 100 % français.\n\n" +
      "Fournisseurs : 2 Certifiés : 1\n\n" +
      "Origine : France, Hongrie",
  },
  {
    title: "Tavaillons en acacia",
    image: "/images/image16.jpg",
    category: "lames",
    body:
      "Largeurs et longueurs usuelles. Largeur 7,5 cm, 10 cm, 12,5 cm. Longueur : 50 cm.\n\n" +
      "Prix rendu par camion complet : 25 m³ soit 600 m² couverts. 1300 € le m³ soit 59 € le m² couvert.\n\n" +
      "Fournisseurs : 1\n\n" +
      "Origine : Hongrie",
  },
  {
    title: "Chevilles en acacia",
    image: "/images/image18.png",
    category: "amenagement",
    body:
      "Dimensions en mm :\n\n" +
      "- 16×180, 16×200, 16×220, 16×250\n" +
      "- 18×180, 18×200, 18×220, 18×250, 18×300\n" +
      "- 20×180, 20×200, 20×220, 20×250, 20×300\n\n" +
      "Possibilité 100 % français.\n\n" +
      "Fournisseurs : 1\n\n" +
      "Origine : Slovénie, France",
  },
  {
    title: "Tours de parterre en acacia",
    image: "/images/image20.jpeg",
    category: "amenagement",
    body:
      "Origine : Hongrie\n\n" +
      "Dimensions : H 20 cm × L 200 cm, H 30 cm × L 200 cm, H 40 cm × L 200 cm",
  },
  {
    title: "Bacs à fleurs ronds en acacia",
    image: "/images/image21.jpeg",
    category: "amenagement",
    body:
      "Origine : Hongrie\n\n" +
      "Dimensions : 30×30, 35×35, 40×40, 45×45, 50×50, 50×60 cm",
  },
  {
    title: "Bacs à fleurs carrés en acacia",
    image: "/images/image22.jpeg",
    category: "amenagement",
    body:
      "Origine : Hongrie\n\n" +
      "Dimensions : 30×60×h30, 30×80×h30, 30×100×h30 cm",
  },
  {
    title: "Plots d'acacia",
    image: "/images/image23.jpg",
    category: "poteaux",
    body:
      "Dimensions habituelles : Diamètre mini : 28 cm. Longueur mini : 2,0 m\n\n" +
      "Possibilités : FSC, PeFC.\n\n" +
      "Origine : Hongrie, Italie, Espagne, Croatie, France",
  },
  {
    title: "Acacia étuvé",
    image: "/images/image25.jpg",
    category: "interieur",
    body:
      "Formes : Parquet massif. Lames de 4 mm pour parquet collé. Divers degrés d'étuvage (couleur) possibles.\n\n" +
      "Produit pour l'intérieur : parquet, lambris.\n\n" +
      "Fournisseurs : 2\n\n" +
      "Origine : Hongrie, Autriche, Italie",
  },
  {
    title: "Planches écorcées poncées",
    image: "/images/planches_ecorcees_poncees.png",
    image_style: "object-fit: contain",
    category: "amenagement",
    body:
      "Pour des constructions à aspect rustique. Le plus souvent en combinaison avec des poteaux écorcés poncés.\n\n" +
      "Fournisseurs : 2\n\n" +
      "Origine : Hongrie",
  },
  {
    title: "Merrains en acacia",
    image: "/images/image28.png",
    category: "amenagement",
    body: "Origine : Hongrie",
  },
  {
    title: "Frises et sciage sur liste d'acacia",
    image: "/images/image30.jpg",
    category: "lames",
    body:
      "Dimensions habituelles : largueurs jusqu'à 12/13 cm, longueur jusqu'à 250 cm. Possibilité de séchoir.\n\n" +
      "Fournisseurs : 8\n\n" +
      "Possibilités : FSC, PeFC\n\n" +
      "Origine : Hongrie, Italie, Croatie, France",
  },
];

products.forEach((p, i) => {
  const fm = {
    title: p.title,
    image: p.image,
    category: p.category,
    order: i + 1,
  };
  if (p.image_style) fm.image_style = p.image_style;
  writeMd("products", slug(p.title), fm, p.body);
});

// ============================================================
// PROJETS INDUSTRIELS
// ============================================================
const projects = [
  ["Stade Letzigrund — Zurich", "letzigrund-stadium-1.jpg", "Structure en Acacia Robinia pour les tribunes extérieures du stade Letzigrund à Zurich, Suisse. Résistance naturelle aux intempéries sans traitement chimique."],
  ["Stade Letzigrund — Tribune", "letzigrund-staduim-2.jpg", "Détail des éléments en Acacia du stade Letzigrund. La durabilité naturelle de classe 1-2 en fait un choix idéal pour les infrastructures sportives exposées."],
  ["Stade Letzigrund — Détail", "letzigrund-stadium-3.jpg", "Assemblage structurel en Acacia Robinia. Le bois est deux fois plus dur que le chêne, assurant une excellente longévité en usage intensif."],
  ["Stade Letzigrund — Vue générale", "letzigrund-stadium-4.jpg", "Vue d'ensemble de la structure en Acacia du stade Letzigrund. Un exemple emblématique de l'utilisation de l'Acacia dans l'architecture sportive."],
  ["Centre WestSide — Berne", "westside-1.jpg", "Centre commercial et de loisirs WestSide à Berne (Suisse). L'Acacia Robinia est utilisé pour les revêtements extérieurs et les aménagements paysagers."],
  ["Centre WestSide — Terrasse", "westside-2.jpg", "Terrasses et espaces extérieurs du WestSide en Acacia. Alliant esthétique et durabilité pour un cadre de vie agréable en milieu urbain."],
  ["Centre WestSide — Aménagement", "west-side-3.jpg", "Aménagements extérieurs du WestSide en Acacia. Le vieillissement naturel du bois lui confère une patine dorée caractéristique."],
  ["Centre de Congrès de Mons", "mons-congress-center.jpg", "Le Centre de Congrès de Mons (Belgique) intègre l'Acacia Robinia dans ses façades et espaces extérieurs. Projet emblématique de l'architecture contemporaine belge."],
  ["Centre de Congrès de Mons — Façade", "mons-congress-center-2.jpg", "Bardage extérieur en Acacia du Centre de Congrès de Mons. L'Acacia offre une durabilité naturelle comparable aux meilleurs bois tropicaux."],
  ["Toiture accessible — Robinia", "robinia-rooftop.jpg", "Aménagement de toiture-terrasse en Acacia Robinia. Résistance optimale aux UV, aux cycles gel/dégel et à l'humidité sans traitement."],
  ["Rooftop — Vue panoramique", "robinia-rooftop-2.jpg", "Terrasse en hauteur réalisée en Acacia Robinia. Le bois ne nécessite pas d'entretien particulier et vieillit naturellement au doré."],
  ["Terrasse en Acacia", "robinia-decking.jpeg", "Lames de terrasse en Acacia Robinia posées en pose recommandée : 2 vis tous les 50 cm maximum pour garantir la stabilité."],
  ["Terrasse — Lames larges", "robinia-decking-2.jpeg", "Terrasse en lames d'Acacia Robinia à l'aspect soigné. La siccité n'influence pas la stabilité comme pour le chêne."],
  ["Terrasse avec piscine", "robinia-decking-with-pool.jpg", "Plage de piscine et terrasse en Acacia Robinia. Résistance naturelle à l'eau et à l'humidité, idéal pour les abords de piscine."],
  ["Bord de piscine — Liège", "robinien-pool-liege.jpg", "Aménagement de bord de piscine en Acacia. Durabilité naturelle classe 1-2 recommandée pour tous les usages en contact permanent avec l'eau."],
  ["Clôture en Acacia", "robinia-fence.jpg", "Clôture réalisée en Acacia Robinia. Résistance naturelle aux insectes et champignons sans traitement chimique."],
  ["Clôture — Design contemporain", "robinia-fence-2.jpg", "Clôture en Acacia avec finition contemporaine. Le bois offre une alternative écologique aux matériaux synthétiques."],
  ["Main courante en Acacia", "robinia-handrail.jpg", "Main courante et garde-corps en Acacia Robinia. Résistance mécanique supérieure au chêne, idéale pour les éléments de sécurité."],
  ["Tour de jeux — Robinia", "robinia-playing-tower.jpg", "Structure de jeux extérieure en Acacia Robinia. Certifiée pour les aires de jeux publiques, sans traitement chimique, sécuritaire pour les enfants."],
  ["Maisonnette Robinia", "robinia-babyhouse.jpg", "Maisonnette de jardin réalisée intégralement en Acacia. Durabilité naturelle et esthétique chaleureuse pour les espaces de jeux."],
  ["Bardage en Acacia", "cladding-full-minihouse.png", "Revêtement de façade complet en Acacia Robinia. Le bardage en Acacia est une alternative durable et esthétique aux essences traditionnelles."],
  ["Jardinière surélevée", "robinia-highbed.webp", "Jardinière surélevée en Acacia Robinia. Résistance naturelle au contact avec la terre, idéale pour les potagers et jardins urbains."],
  ["Jardinières — Aménagement", "robinia-highbeds-2.jpg", "Ensemble de jardinières surélevées en Acacia. Durabilité exceptionnelle même dans des conditions d'humidité constante."],
  ["Bacs à fleurs Robinia", "robinia-flowerboxes.webp", "Bacs à fleurs en Acacia Robinia pour l'aménagement urbain. Durabilité et esthétique pour les espaces publics et privés."],
  ["Jardin en Acacia", "robinie-garden.jpeg", "Aménagement de jardin complet en Acacia Robinia : terrasse, clôtures, mobilier. Un écosystème homogène et durable."],
  ["Bloc funéraire en Acacia", "graveyard-block.jpg", "Application en milieu funéraire. La durabilité naturelle de l'Acacia (classe 1-2) lui permet de résister plusieurs décennies dans des conditions difficiles."],
];

projects.forEach((p, i) => {
  const [title, imageFile, description] = p;
  const fm = {
    title,
    image: `/images/projets/${imageFile}`,
    description,
    order: i + 1,
  };
  writeMd("projects", slug(title) + "-" + (i + 1), fm, "");
});

// ============================================================
// PAGES ÉDITORIALES
// ============================================================
writeMd(
  "pages",
  "home",
  {
    title: "Accueil",
    seo_description:
      "Filière Robinia Acacia France — Une ressource d'avenir : disponibilité, qualités, usages.",
    hero_title: "Filière Robinia Acacia France\nUne ressource d'avenir",
    hero_image: "/images/robinia-bg.jpg",
    hero_baseline: "Disponibilité, qualités, usages",
    hero_cta_label: "En savoir plus",
    hero_cta_url: "/about",
  },
  "## Nos Produits\n\nDécouvrez les produits en acacia : poteaux & piquets, terrasse & aménagement extérieur, aménagement intérieur."
);

writeMd(
  "pages",
  "about",
  {
    title: "L'Association",
    seo_description:
      "L'Association Filière Acacia Français — Mission et valeurs pour promouvoir une essence d'avenir locale et durable.",
    hero_title: "L'Association Filière Acacia Français",
  },
  `Créée en 2024, l'association rassemble les acteurs de la filière, de la forêt à la transformation.

## Notre Mission

Promouvoir le Robinier Faux-Acacia comme une essence d'avenir, locale et durable. Nous œuvrons pour :

- Structurer la filière de production et de transformation.
- Développer les marchés (agriculture, aménagements urbains, particuliers).
- Garantir la qualité et la provenance des produits.
- Encourager la plantation et la gestion durable des peuplements.

## Nos Valeurs

### Durabilité
Valoriser une essence naturellement résistante (Classe 4) sans chimie.

### Proximité
Favoriser les circuits courts et l'économie locale.

### Innovation
Développer de nouveaux produits techniques (aboutage, lamellé-collé).
`
);

writeMd(
  "pages",
  "acacia",
  {
    title: "L'Acacia",
    seo_description:
      "L'Acacia — Robinia Pseudo-Acacia : caractéristiques techniques, propriétés et usages du bois.",
    hero_title: "L'Acacia — Robinia Pseudo-Acacia",
  },
  `## Le Bois

Le bois est nerveux. S'il est bien scié, 80 % de la nervosité est éliminée.

## Couleur

L'acacia non exposé au soleil a une teinte qui varie du jaune au vert. Au soleil, il vire au doré (d'où le nom de **Golden Timber**). Rien à voir avec de la moisissure.

## Les Nœuds

Les nœuds sont soit :

- Très fermes et sains — indissociables du bois lui-même sauf le dessin
- Complètement morts avec un trou

La dosse adhère bien, contrairement au châtaignier.

## Stabilité & Dureté

La siccité n'influence pas la stabilité comme pour le chêne.

Pour l'utilisation extérieure, il vaut mieux utiliser des bois réessuyés à environ 30 %. Certains poseurs d'Allemagne utilisent du bois frais de sciage.

On considère que le bois est réessuyé quand il est à 30 %.

**L'acacia est 2 fois plus dur que le chêne.**

## Lames de Terrasse

La pose recommandée est de 2 vis tous les 50 cm maximum.

Un bon scieur de chêne ne fait pas un bon scieur d'acacia.

## Aboutage

Il existe un ou deux bons abouteurs d'acacia en Europe.

Il y a eu 2 entreprises en France qui ont fait scandale en utilisant des collages pas adaptés. Ces expériences ont ruiné la réputation de l'acacia abouté.

## Acacia Étuvé

Il est mal connu — il rend le bois plus léger et plus stable.

Il peut s'utiliser en extérieur.
`
);

writeMd(
  "pages",
  "architects",
  {
    title: "Architectes",
    seo_description:
      "L'Acacia pour les architectes — Un matériau noble aux performances exceptionnelles pour vos projets.",
    hero_title: "L'Acacia pour les Architectes",
    lead: "Un matériau noble aux performances exceptionnelles",
  },
  `## Un bois à la mode

Auprès des clientèles aisées et cultivées, l'acacia est un **bois à la mode**. Il possède les mêmes caractéristiques que beaucoup de bois exotiques et a été surnommé le _« Teck français »_ (bien que cette appellation soit abusive).

## Applications en paysage extérieur

### Classification et durabilité

> **Classe 4 naturellement**
>
> Comparaison de durabilité en terre :
> - Pin traité : **2-6 ans**
> - Châtaignier : **20-30 ans**
> - Acacia : **60-80 ans, voire plus**

### Lames de terrasse

Massives ou aboutées (jointure verticale visible ou horizontale invisible).

_Note : Il existe 2-3 bons abouteurs d'acacia en Europe. Un bon abouteur de chêne, châtaignier ou mélèze ne fait pas forcément un bon abouteur d'acacia._

### Poteaux écorcés (3 types)

- **Écorcés** : Destinés au marché agricole
- **Écorcés poncés/brossés** : Le poteau est brossé pour un aspect très blanc
- **Désaubiéré/plané** : L'aubier est enlevé à la disqueuse

Ces éléments sont indispensables pour créer des aménagements à l'aspect rustique ou naturel.

### Bardage vertical

Utilisation fréquente des poteaux pour des bardages verticaux.

### Tavaillons ou bardeaux

Tuiles de bois d'acacia pour toitures et bardages.

## Aménagement intérieur

L'acacia est actuellement **peu demandé pour l'aménagement intérieur**, et pourtant il possède des atouts majeurs :

> #### Dureté exceptionnelle
> **2 fois supérieure au chêne**
>
> Idéal pour les sols à fort passage, escaliers, plans de travail.

### Acacia étuvé / thermo-traité — Produit Premium

- **Couleur** : Brun chocolat de toute beauté
- **Propriétés** : Plus léger et plus stable
- **Options** : Existe en version brossée, peut être utilisé huilé
- **Formats disponibles** :
  - Pièces massives
  - Placage épais de 4 mm d'épaisseur

## Défis techniques

### Nervosité du bois

L'acacia est réputé **très nerveux**, mais une fois le bois bien scié, 90 % des problèmes de nervosité sont éliminés.

_C'est un bois difficile à scier. Un bon scieur de chêne ne fait pas forcément un bon scieur d'acacia._

### Rendement de sciage

- Chêne : 100 m³ de grumes → 80-90 m³ de sciages
- Acacia : 100 m³ de grumes → parfois seulement 40 m³ de sciages

## Approvisionnement

**Fournisseurs principaux** : Europe centrale (notamment Hongrie).

**Production française** : Existe mais mal structurée. C'est là que notre association intervient pour faciliter la mise en relation.
`
);

writeMd(
  "pages",
  "contact",
  {
    title: "Contact",
    seo_description:
      "Contactez la Filière Robinia Acacia France pour vos projets, demandes d'information ou partenariats.",
    hero_title: "Contact",
    lead: "Nous sommes à votre écoute",
  },
  ""
);

console.log("\n✅ Génération terminée");
