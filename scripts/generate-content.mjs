#!/usr/bin/env node
/**
 * Génère :
 *   - 21 fiches produits  → src/content/products/*.md
 *   - 26 fiches projets   → src/content/projects/*.md
 *   - 7 pages éditoriales → src/content/pages/*.md
 *
 * Les pages utilisent un frontmatter YAML structuré qui correspond aux schémas
 * de src/content/config.ts. Tous les champs sont éditables via Sveltia CMS.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yamlLib from "js-yaml";

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

function writeMd(folder, slugName, fm, body = "") {
  const dir = join(root, "src", "content", folder);
  mkdirSync(dir, { recursive: true });
  const yamlOut = yamlLib.dump(fm, {
    lineWidth: 1000,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
  });
  const front = "---\n" + yamlOut + "---\n";
  writeFileSync(join(dir, `${slugName}.md`), front + (body ? "\n" + body + "\n" : ""), "utf8");
  console.log(`✓ ${folder}/${slugName}.md`);
}

/* ====================================================================
   PRODUITS — 21 fiches
   ==================================================================== */
const productFamilies = [
  {
    family: "poteaux",
    items: [
      { title: "Poteaux écorcés acacia", image: "/images/image2.jpg", alt: "Poteaux écorcés acacia", cat: "Poteaux", rows: [["Diamètre","6/8 à 20/24 cm (à mi-longueur)"],["Longueur","1 à 6 m"],["Origine","Hongrie, Slovaquie, France"],["Fournisseurs","± 12 · FSC & PeFC"]] },
      { title: "Poteaux écorcés poncés", image: "/images/image3.jpeg", alt: "Poteaux écorcés poncés", cat: "Poteaux", description: "L'aubier est poncé pour un aspect très blanc.", rows: [["Diamètre","6/8 à 20/24 cm"],["Longueur","1 à 6 m (excep. 12 m)"],["Origine","Hongrie, Slovaquie"],["Fournisseurs","± 8 · FSC"]] },
      { title: "Poteaux déaubiéré", image: "/images/image4.jpeg", alt: "Poteaux déaubiéré", cat: "Poteaux", description: "L'aubier est enlevé à la disqueuse.", rows: [["Diamètre","6/8 à 20/24 cm"],["Longueur","1 à 6 m (excep. 12 m)"],["Origine","Hongrie, Slovaquie"],["Fournisseurs","± 8 · FSC"]] },
      { title: "Poteaux fraisés en acacia", image: "/images/image5.JPG", alt: "Poteaux fraisés acacia", cat: "Poteaux", rows: [["Diamètre","4 à 20 cm"],["Longueur","0,4 à 2,5 m"],["Prix","2 000 € / m³", true],["Origine","Hongrie, Italie, France"]] },
      { title: "Poteaux carrés / Poutres", image: "/images/image6.jpg", alt: "Poteaux carrés et poutres", cat: "Poteaux", rows: [["Sections","4×4 à 15×15 cm"],["Longueur","jusqu'à 3 m"],["Prix","1 500–2 500 € / m³", true],["Origine","Hongrie, Italie, France"]] },
      { title: "Piquets « Quart de rond »", image: "/images/image8.jpg", alt: "Piquets sciés ou fendus quart de rond", cat: "Piquets", description: "Sciés ou fendus, écorcés ou non.", rows: [["Longueur","1,5 à 2,5 m"],["Origine","Hongrie, Croatie, France"],["Fournisseurs","± 10 · FSC & PeFC"]] },
      { title: "Piquets « marquant carrés »", image: "/images/image10.jpg", alt: "Piquets sciés marquant carrés", cat: "Piquets", rows: [["Sections","22×22, 25×25, 30×30 mm"],["Longueur","0,5 à 1,5 m"],["Origine","Hongrie"],["Fournisseurs","± 14"]] },
      { title: "Plots d'acacia", image: "/images/image23.jpg", alt: "Plots d'acacia", cat: "Poteaux", rows: [["Diamètre","mini 28 cm"],["Longueur","mini 2,0 m"],["Origine","Hongrie, Italie, Espagne, Croatie, France"],["Labels","FSC, PeFC"]] },
    ],
  },
  {
    family: "lames",
    items: [
      { title: "Lames de terrasse massives", image: "/images/image12.jpg", alt: "Lames de terrasse massives", cat: "Lames", description: "Rainurées ou non.", rows: [["Longueur","1 m à 2,5 m"],["Prix","56–72 € / m²", true],["Origine","Hongrie, France"],["Fournisseurs","± 10 · PeFC"]] },
      { title: "Lames de terrasse aboutées", image: "/images/image14.jpg", alt: "Lames de terrasse aboutées", cat: "Lames", description: "Joint transversal ou parallèle dit « invisible ».", rows: [["Longueur","jusqu'à 6 m"],["Largeur","80 à 120 mm"],["Prix","50–65 € / m²", true],["Origine","Roumanie, Allemagne"]] },
      { title: "Dalles en acacia", image: "/images/image15.jpg", alt: "Dalles en acacia", cat: "Dalles", rows: [["Formats","27×27, 50×50, 100×100 cm"],["Origine","France, Hongrie"],["Fournisseurs","2 · PeFC & 100 % FR"]] },
      { title: "Tavaillons en acacia", image: "/images/image16.jpg", alt: "Tavaillons en acacia", cat: "Toiture", description: "Tuiles de bois pour toitures et bardages.", rows: [["Largeur","7,5 · 10 · 12,5 cm"],["Longueur","50 cm"],["Prix","59 € / m² couvert", true],["Origine","Hongrie"]] },
      { title: "Frises & sciage sur liste", image: "/images/image30.jpg", alt: "Frises et sciage sur liste", cat: "Sciage", description: "Possibilité de séchoir.", rows: [["Largeur","jusqu'à 12/13 cm"],["Longueur","jusqu'à 250 cm"],["Origine","Hongrie, Italie, Croatie, France"],["Fournisseurs","8 · FSC & PeFC"]] },
    ],
  },
  {
    family: "amenagement",
    items: [
      { title: "Ganivelle en acacia", image: "/images/ganivelle_acacia.png", alt: "Ganivelle en acacia", cat: "Clôture", description: "Définie par la hauteur et l'espacement des échalas — sciés, écorcés…", rows: [["Origine","Hongrie"],["Fournisseurs","1"]] },
      { title: "Chevilles en acacia", image: "/images/image18.png", alt: "Chevilles en acacia", cat: "Fixation", rows: [["Dimensions","16–20 mm × 180–300 mm"],["Origine","Slovénie, France"],["Fournisseurs","1 · 100 % FR possible"]] },
      { title: "Tours de parterre", image: "/images/image20.jpeg", alt: "Tours de parterre en acacia", cat: "Jardin", rows: [["Dimensions","H 20–40 cm × L 200 cm"],["Origine","Hongrie"]] },
      { title: "Bacs à fleurs ronds", image: "/images/image21.jpeg", alt: "Bacs à fleurs ronds en acacia", cat: "Jardin", rows: [["Dimensions","Ø 30 à 60 cm"],["Origine","Hongrie"]] },
      { title: "Bacs à fleurs carrés", image: "/images/image22.jpeg", alt: "Bacs à fleurs carrés en acacia", cat: "Jardin", rows: [["Dimensions","30×60 à 30×100 × h30 cm"],["Origine","Hongrie"]] },
      { title: "Planches écorcées poncées", image: "/images/planches_ecorcees_poncees.png", alt: "Planches écorcées poncées", cat: "Rustique", description: "Pour des constructions à aspect rustique, en combinaison avec les poteaux écorcés poncés.", contain: true, rows: [["Origine","Hongrie"],["Fournisseurs","2"]] },
      { title: "Merrains en acacia", image: "/images/image28.png", alt: "Merrains en acacia", cat: "Tonnellerie", rows: [["Origine","Hongrie"]] },
    ],
  },
  {
    family: "interieur",
    items: [
      { title: "Acacia étuvé", image: "/images/image25.jpg", alt: "Acacia étuvé", cat: "Premium", description: "Parquet massif et lames de 4 mm pour parquet collé. Divers degrés d'étuvage (couleur). Pour parquet et lambris.", rows: [["Usage","Intérieur · parquet, lambris"],["Origine","Hongrie, Autriche, Italie"],["Fournisseurs","2"]] },
    ],
  },
];

let pOrder = 0;
for (const fam of productFamilies) {
  fam.items.forEach((it, i) => {
    pOrder++;
    const rows = it.rows.map((r) => ({ dt: r[0], dd: r[1], ...(r[2] ? { price: true } : {}) }));
    writeMd("products", slug(it.title), {
      title: it.title,
      image: it.image,
      image_alt: it.alt,
      family: fam.family,
      cat_label: it.cat,
      order: i + 1,
      ...(it.description ? { description: it.description } : {}),
      ...(it.contain ? { contain: true } : {}),
      rows,
    });
  });
}

/* ====================================================================
   PROJETS — 26 fiches
   ==================================================================== */
const projects = [
  ["archi","letzigrund-stadium-1.jpg","Stade Letzigrund — Zurich","Zurich, CH","Stade Letzigrund","Structure en acacia robinia pour les tribunes extérieures. Résistance naturelle aux intempéries sans traitement chimique."],
  ["archi","letzigrund-staduim-2.jpg","Stade Letzigrund — Tribune","Zurich, CH","Letzigrund — Tribune","Détail des éléments en acacia. La durabilité naturelle en fait un choix idéal pour les infrastructures sportives exposées."],
  ["archi","letzigrund-stadium-3.jpg","Stade Letzigrund — Détail","Zurich, CH","Letzigrund — Détail","Assemblage structurel en acacia robinia. Le bois est deux fois plus dur que le chêne, assurant une excellente longévité."],
  ["archi","letzigrund-stadium-4.jpg","Stade Letzigrund — Vue générale","Zurich, CH","Letzigrund — Vue générale","Vue d'ensemble de la structure. Un exemple emblématique de l'utilisation de l'acacia dans l'architecture sportive."],
  ["archi","westside-1.jpg","Centre WestSide — Berne","Berne, CH","Centre WestSide","Centre commercial et de loisirs. L'acacia robinia habille les revêtements extérieurs et les aménagements paysagers."],
  ["archi","westside-2.jpg","Centre WestSide — Terrasse","Berne, CH","WestSide — Terrasse","Terrasses et espaces extérieurs en acacia, alliant esthétique et durabilité en milieu urbain."],
  ["archi","west-side-3.jpg","Centre WestSide — Aménagement","Berne, CH","WestSide — Aménagement","Le vieillissement naturel du bois lui confère une patine dorée caractéristique."],
  ["archi","mons-congress-center.jpg","Centre de Congrès de Mons","Mons, BE","Centre de Congrès de Mons","Façades et espaces extérieurs en acacia robinia. Projet emblématique de l'architecture contemporaine belge."],
  ["archi","mons-congress-center-2.jpg","Centre de Congrès de Mons — Façade","Mons, BE","Mons — Façade","Bardage extérieur en acacia, durabilité naturelle comparable aux meilleurs bois tropicaux."],
  ["archi","cladding-full-minihouse.png","Bardage en acacia","Bardage","Bardage en Acacia","Revêtement de façade complet — une alternative durable et esthétique aux essences traditionnelles."],
  ["terrasse","robinia-rooftop.jpg","Toiture accessible Robinia","Rooftop","Toiture accessible","Toiture-terrasse en acacia robinia. Résistance optimale aux UV, aux cycles gel/dégel et à l'humidité sans traitement."],
  ["terrasse","robinia-rooftop-2.jpg","Rooftop vue panoramique","Rooftop","Vue panoramique","Terrasse en hauteur. Le bois ne nécessite pas d'entretien particulier et vieillit naturellement au doré."],
  ["terrasse","robinia-decking.jpeg","Terrasse en acacia","Terrasse","Terrasse en Acacia","Lames posées selon la règle recommandée : 2 vis tous les 50 cm maximum pour garantir la stabilité."],
  ["terrasse","robinia-decking-2.jpeg","Terrasse lames larges","Terrasse","Lames larges","Terrasse en lames d'acacia à l'aspect soigné. La siccité n'influence pas la stabilité comme pour le chêne."],
  ["terrasse","robinia-decking-with-pool.jpg","Terrasse avec piscine","Piscine","Terrasse avec piscine","Plage de piscine en acacia robinia. Résistance naturelle à l'eau et à l'humidité."],
  ["terrasse","robinien-pool-liege.jpg","Bord de piscine Liège","Liège, BE","Bord de piscine","Durabilité naturelle classe 1-2 recommandée pour tous les usages en contact permanent avec l'eau."],
  ["cloture","robinia-fence.jpg","Clôture en acacia","Clôture","Clôture en Acacia","Résistance naturelle aux insectes et champignons sans traitement chimique."],
  ["cloture","robinia-fence-2.jpg","Clôture design contemporain","Clôture","Design contemporain","Clôture avec finition contemporaine. Une alternative écologique aux matériaux synthétiques."],
  ["cloture","robinia-handrail.jpg","Main courante en acacia","Garde-corps","Main courante","Résistance mécanique supérieure au chêne, idéale pour les éléments de sécurité."],
  ["jardin","robinia-playing-tower.jpg","Tour de jeux Robinia","Aire de jeux","Tour de jeux","Structure de jeux certifiée pour aires publiques, sans traitement chimique, sécuritaire pour les enfants."],
  ["jardin","robinia-babyhouse.jpg","Maisonnette Robinia","Jardin","Maisonnette Robinia","Maisonnette de jardin intégralement en acacia. Durabilité et esthétique chaleureuse pour les espaces de jeux."],
  ["jardin","robinia-highbed.webp","Jardinière surélevée","Potager","Jardinière surélevée","Résistance naturelle au contact avec la terre, idéale pour les potagers et jardins urbains."],
  ["jardin","robinia-highbeds-2.jpg","Jardinières aménagement","Potager","Jardinières","Ensemble de jardinières surélevées. Durabilité exceptionnelle même en conditions d'humidité constante."],
  ["jardin","robinia-flowerboxes.webp","Bacs à fleurs Robinia","Urbain","Bacs à fleurs","Bacs à fleurs pour l'aménagement urbain. Durabilité et esthétique pour les espaces publics et privés."],
  ["jardin","robinie-garden.jpeg","Jardin en acacia","Jardin","Jardin en Acacia","Aménagement complet : terrasse, clôtures, mobilier. Un écosystème homogène et durable."],
  ["jardin","graveyard-block.jpg","Bloc funéraire en acacia","Application","Bloc funéraire","La durabilité naturelle de l'acacia (classe 1-2) lui permet de résister plusieurs décennies en conditions difficiles."],
];

projects.forEach(([cat, img, alt, idx, title, desc], i) => {
  writeMd("projects", slug(title) + "-" + (i + 1), {
    title,
    image: `/images/projets/${img}`,
    image_alt: alt,
    idx,
    desc,
    filter_cat: cat,
    order: i + 1,
  });
});

/* ====================================================================
   PAGES ÉDITORIALES — 7 fichiers
   ==================================================================== */

// HOME
writeMd("pages", "home", {
  title: "Accueil",
  seo_description: "Filière Robinia Acacia France — Une ressource d'avenir : disponibilité, qualités, usages du bois d'acacia robinier.",
  screen_label: "Accueil",
  hero: {
    eyebrow: "Robinier faux-acacia · Golden Timber",
    title: "Filière Robinia Acacia France",
    baseline: "Une ressource d'avenir — disponibilité, qualités, usages.",
    image: "/images/robinia-bg.jpg",
    image_alt: "Robinier faux-acacia au soleil, feuillage doré",
    cta1: { label: "En savoir plus", url: "/association" },
    cta2: { label: "Nos produits", url: "/produits" },
    scroll_label: "Défiler",
  },
  stats: [
    { num: "60–80", suffix: " ans", label: "Durabilité en terre" },
    { num: "Classe 4", label: "Naturellement, sans chimie" },
    { num: "×2", label: "Plus dur que le chêne" },
    { num: "0", label: "Traitement chimique" },
  ],
  intro_split: {
    scheme: "paper",
    eyebrow: "La ressource",
    eyebrow_variant: "forest",
    title: "Un bois noble,<br />local et durable",
    lead: "Surnommé le « Teck français », le Robinier faux-acacia possède une durabilité naturelle de classe 4 — comparable aux meilleurs bois tropicaux, sans aucun traitement chimique.",
    body: "Notre association rassemble les acteurs de la filière, de la forêt à la transformation, pour structurer une production française encore mal connue et révéler tout le potentiel de cette essence d'avenir.",
    image: "/images/image7.jpg",
    image_alt: "Grumes d'acacia sciées, cernes du bois apparents",
    image_tag_num: "Teck",
    image_tag_rest: " français",
    image_tall: true,
    image_position: "left",
    narrow_text: true,
    cta1: { label: "Découvrir l'acacia", url: "/acacia" },
    cta2: { label: "L'association", url: "/association" },
  },
  products_section: {
    scheme: "sand",
    eyebrow: "Nos produits",
    title: "Produits existant en acacia",
    lead: "Du poteau écorcé à la lame de terrasse aboutée — trois grandes familles d'usages, de l'extérieur rustique à l'aménagement intérieur premium.",
    cards: [
      { idx: "01", title: "Poteaux & Piquets", image: "/images/image2.jpg", image_alt: "Poteaux et piquets en acacia", url: "/produits#poteaux" },
      { idx: "02", title: "Terrasse & Extérieur", image: "/images/image12.jpg", image_alt: "Lames de terrasse en acacia", url: "/produits#lames" },
      { idx: "03", title: "Aménagement Intérieur", image: "/images/image24.jpg", image_alt: "Acacia étuvé pour aménagement intérieur", url: "/produits#interieur" },
    ],
    more_label: "Tous les produits",
    more_url: "/produits",
  },
  projects_section: {
    scheme: "paper",
    eyebrow: "Réalisations",
    eyebrow_variant: "forest",
    title: "Projets industriels & architecturaux",
    lead: "De stades suisses aux centres de congrès belges, l'acacia robinier s'impose en architecture contemporaine pour sa résistance naturelle aux intempéries.",
    cards: [
      { idx: "Zurich", title: "Stade Letzigrund", image: "/images/projets/letzigrund-stadium-1.jpg", image_alt: "Stade Letzigrund, Zurich", desc: "Structure en acacia robinia pour les tribunes extérieures — résistance naturelle aux intempéries sans traitement.", url: "/projets", filter_cat: "archi" },
      { idx: "Belgique", title: "Centre de Congrès de Mons", image: "/images/projets/mons-congress-center.jpg", image_alt: "Centre de Congrès de Mons", desc: "Façades et espaces extérieurs en acacia — projet emblématique de l'architecture contemporaine belge.", url: "/projets", filter_cat: "archi" },
      { idx: "Terrasse", title: "Plage de piscine", image: "/images/projets/robinia-decking-with-pool.jpg", image_alt: "Terrasse avec piscine en acacia", desc: "Résistance naturelle à l'eau et à l'humidité, idéale pour les abords de piscine.", url: "/projets", filter_cat: "terrasse" },
    ],
    more_label: "Tous les projets",
    more_url: "/projets",
  },
  cta_band: {
    eyebrow: "Architectes & prescripteurs",
    title: "Un matériau d'exception pour vos projets",
    cta1: { label: "Espace architectes", url: "/architectes" },
    cta2: { label: "Nous contacter", url: "/contact" },
  },
});

// ASSOCIATION
writeMd("pages", "association", {
  title: "L'Association",
  seo_description: "L'Association Filière Acacia Français — Mission et valeurs pour promouvoir une essence d'avenir locale et durable.",
  screen_label: "L'Association",
  page_hero: {
    title: "L'Association Filière Acacia Français",
    lead: "De la forêt à la transformation, nous structurons une filière française d'avenir.",
    breadcrumb_label: "L'Association",
    image: "/images/image26.png",
    image_alt: "Grumes de robinier acacia stockées",
  },
  intro_split: {
    scheme: "paper",
    eyebrow: "Depuis 2024",
    eyebrow_variant: "forest",
    title: "Réunir les acteurs<br />d'une essence d'avenir",
    lead: "Créée en 2024, l'association rassemble les acteurs de la filière, de la forêt à la transformation.",
    body: "Le Robinier faux-acacia est une ressource encore mal connue et mal structurée en France. Notre rôle : faciliter la mise en relation entre exploitants forestiers, scieurs et professionnels, et révéler tout le potentiel de ce bois local et durable.",
    image_position: "right",
  },
  mission_section: {
    scheme: "sand",
    eyebrow: "Notre mission",
    title: "Promouvoir le Robinier comme une essence d'avenir, locale et durable",
    body: "Nous œuvrons sur quatre fronts pour faire émerger une filière structurée, de la plantation jusqu'aux marchés finaux.",
    items: [
      "Structurer la filière de production et de transformation.",
      "Développer les marchés — agriculture, aménagements urbains, particuliers.",
      "Garantir la qualité et la provenance des produits.",
      "Encourager la plantation et la gestion durable des peuplements.",
    ],
  },
  values_section: {
    scheme: "paper",
    eyebrow: "Nos valeurs",
    eyebrow_variant: "forest",
    title: "Trois convictions",
    items: [
      { idx: "01", title: "Durabilité", body: "Valoriser une essence naturellement résistante — classe 4 — sans aucun traitement chimique." },
      { idx: "02", title: "Proximité", body: "Favoriser les circuits courts et l'économie locale, du peuplement à l'atelier." },
      { idx: "03", title: "Innovation", body: "Développer de nouveaux produits techniques — aboutage, lamellé-collé, étuvage." },
    ],
  },
  cta_band: {
    eyebrow: "Rejoindre la filière",
    title: "Exploitant, scieur ou professionnel ?",
    lead: "Nous mettons en relation tous les acteurs intéressés par l'acacia français.",
    cta1: { label: "Nous contacter", url: "/contact" },
  },
});

// ACACIA — page éditoriale en blocs
writeMd("pages", "acacia", {
  title: "L'Acacia",
  seo_description: "L'Acacia — Robinia Pseudo-Acacia : caractéristiques techniques, propriétés et usages du bois.",
  screen_label: "L'Acacia",
  page_hero: {
    title: "L'Acacia<br />Robinia Pseudo-Acacia",
    lead: "Le « Teck français » — un bois nerveux, dense et doré, aussi exigeant que remarquable.",
    breadcrumb_label: "L'Acacia",
    image: "/images/image7.jpg",
    image_alt: "Grumes d'acacia sciées, cernes du bois",
  },
  blocks: [
    {
      type: "split",
      scheme: "paper",
      body: "## Le Bois\n\nLe bois est nerveux. S'il est bien scié, **80 % de la nervosité est éliminée**. C'est un bois difficile à travailler : un bon scieur de chêne ne fait pas forcément un bon scieur d'acacia.\n\n## Couleur\n\nL'acacia non exposé au soleil a une teinte qui varie du jaune au vert. Au soleil, il vire au doré — d'où son surnom de **Golden Timber**. Rien à voir avec de la moisissure : c'est sa patine naturelle.",
      image: "/images/image24.jpg",
      image_alt: "Acacia étuvé, teinte dorée à brune",
      image_tag_num: "Golden",
      image_tag_rest: " Timber",
      image_tall: true,
      image_position: "right",
    },
    {
      type: "pull",
      scheme: "paper",
      num: "×2",
      body: "**Deux fois plus dur que le chêne.**\nUne densité exceptionnelle qui en fait un bois idéal pour les sols à fort passage, escaliers et plans de travail.",
    },
    {
      type: "two-prose",
      scheme: "sand",
      body_left: "## Les Nœuds\n\nLes nœuds sont soit très fermes et sains — indissociables du bois lui-même, sauf le dessin — soit complètement morts avec un trou. La dosse adhère bien, contrairement au châtaignier.",
      body_right: "## Stabilité & Dureté\n\nLa siccité n'influence pas la stabilité comme pour le chêne. Pour l'extérieur, on privilégie des bois réessuyés à environ **30 %** ; certains poseurs allemands utilisent du bois frais de sciage.",
    },
    {
      type: "prose-narrow",
      scheme: "paper",
      body: "## Lames de Terrasse\n\nLa pose recommandée est de **2 vis tous les 50 cm maximum**. Un bon scieur de chêne ne fait pas un bon scieur d'acacia — la matière exige un savoir-faire propre.\n\n## Aboutage\n\nIl existe un ou deux bons abouteurs d'acacia en Europe. Deux entreprises françaises ont autrefois fait scandale en utilisant des collages inadaptés ; ces expériences ont injustement ruiné la réputation de l'acacia abouté.\n\n> Un bon abouteur de chêne, châtaignier ou mélèze ne fait pas forcément un bon abouteur d'acacia. **Le savoir-faire est tout.**",
    },
    {
      type: "split",
      scheme: "sand",
      body: "## Acacia Étuvé\n\nEncore mal connu, l'étuvage rend le bois **plus léger et plus stable**, avec une couleur brun chocolat de toute beauté. Il peut s'utiliser en extérieur, en version brossée ou huilée.\n\nDisponible en pièces massives ou en placage épais de 4 mm — idéal pour le parquet et le lambris d'intérieur premium.",
      image: "/images/image25.jpg",
      image_alt: "Acacia étuvé brun chocolat",
      image_tag_num: "Premium",
      image_tag_rest: " · Étuvé",
      image_position: "left",
      cta1: { label: "Produits d'intérieur", url: "/produits#interieur" },
    },
  ],
  cta_band: {
    eyebrow: "Aller plus loin",
    title: "L'acacia pour vos projets d'architecture",
    cta1: { label: "Espace architectes", url: "/architectes" },
    cta2: { label: "Nos produits", url: "/produits" },
  },
});

// ARCHITECTES
writeMd("pages", "architectes", {
  title: "Architectes",
  seo_description: "L'Acacia pour les architectes — Un matériau noble aux performances exceptionnelles pour vos projets.",
  screen_label: "Architectes",
  page_hero: {
    title: "L'Acacia pour les Architectes",
    lead: "Un matériau noble aux performances exceptionnelles.",
    breadcrumb_label: "Architectes",
    image: "/images/projets/mons-congress-center-2.jpg",
    image_alt: "Bardage en acacia, Centre de Congrès de Mons",
  },
  intro_split: {
    scheme: "paper",
    eyebrow: "Un bois à la mode",
    eyebrow_variant: "forest",
    title: "Le « Teck français »",
    lead: "Auprès des clientèles aisées et cultivées, l'acacia est un bois à la mode.",
    body: "Il possède les mêmes caractéristiques que beaucoup de bois exotiques et a été surnommé le « Teck français » — bien que cette appellation soit abusive. Une noblesse naturelle, sans l'empreinte carbone de l'import.",
    image_position: "right",
  },
  blocks: [
    {
      type: "bars",
      scheme: "sand",
      eyebrow: "Classe 4 naturellement",
      title: "Durabilité en terre comparée",
      lead: "À conditions égales, le robinier surclasse largement les essences européennes traditionnelles.",
      bars: [
        { name: "Pin traité", value: "2–6 ans", percent: 8 },
        { name: "Châtaignier", value: "20–30 ans", percent: 37 },
        { name: "Acacia", value: "60–80 ans, voire +", percent: 100, hero: true },
      ],
    },
    {
      type: "split",
      scheme: "paper",
      body: "## Applications en paysage extérieur\n\n### Lames de terrasse\n\nMassives ou aboutées — jointure verticale visible ou horizontale invisible. Il existe 2-3 bons abouteurs d'acacia en Europe ; un bon abouteur de chêne ne l'est pas forcément pour l'acacia.\n\n### Poteaux écorcés — 3 types\n\n- **Écorcés** — destinés au marché agricole.\n- **Écorcés poncés / brossés** — pour un aspect très blanc.\n- **Désaubiéré / plané** — l'aubier est enlevé à la disqueuse.\n\n### Bardage vertical & tavaillons\n\nUtilisation fréquente des poteaux pour des bardages verticaux. Tavaillons (bardeaux) en bois d'acacia pour toitures et bardages, à l'aspect rustique ou naturel.",
      image: "/images/projets/cladding-full-minihouse.png",
      image_alt: "Bardage vertical en acacia",
      image_tag_num: "Classe 4",
      image_tag_rest: " sans chimie",
      image_tall: true,
      image_position: "right",
    },
    {
      type: "pull",
      scheme: "sand",
      num: "×2",
      body: "**Dureté exceptionnelle — deux fois supérieure au chêne.**\nIdéal pour les sols à fort passage, les escaliers et les plans de travail.",
    },
    {
      type: "split",
      scheme: "sand",
      body: "## Aménagement intérieur\n\nL'acacia est aujourd'hui **peu demandé en intérieur**, et pourtant ses atouts sont majeurs. L'acacia étuvé / thermo-traité est un véritable produit premium :\n\n- **Couleur** — brun chocolat de toute beauté.\n- **Propriétés** — plus léger et plus stable.\n- **Finitions** — version brossée, peut être huilé.\n- **Formats** — pièces massives ou placage épais de 4 mm.",
      image: "/images/image24.jpg",
      image_alt: "Acacia étuvé brun chocolat",
      image_tag_num: "Premium",
      image_tag_rest: " · Étuvé",
      image_position: "left",
    },
    {
      type: "values",
      scheme: "paper",
      eyebrow: "À savoir",
      eyebrow_variant: "forest",
      title: "Défis techniques & approvisionnement",
      items: [
        { idx: "90%", title: "Nervosité", body: "L'acacia est réputé très nerveux, mais une fois bien scié, 90 % des problèmes sont éliminés. Un bon scieur de chêne ne fait pas forcément un bon scieur d'acacia." },
        { idx: "~40 m³", title: "Rendement de sciage", body: "Chêne : 100 m³ de grumes → 80-90 m³ de sciages. Acacia : 100 m³ → parfois seulement 40 m³. Une matière exigeante, donc précieuse." },
        { idx: "FR", title: "Approvisionnement", body: "Fournisseurs principaux en Europe centrale (Hongrie). La production française existe mais reste mal structurée — c'est là que notre association intervient." },
      ],
    },
  ],
  cta_band: {
    eyebrow: "Architectes & prescripteurs",
    title: "Intéressé par l'acacia pour vos projets ?",
    lead: "Nous facilitons la mise en relation avec les bons fournisseurs et abouteurs.",
    cta1: { label: "Contactez-nous", url: "/contact" },
  },
});

// PROJETS — hero only (la grille vient de la collection projects)
writeMd("pages", "projets", {
  title: "Projets Industriels",
  seo_description: "Galerie de projets industriels et architecturaux réalisés en Acacia Robinia.",
  screen_label: "Projets Industriels",
  page_hero: {
    title: "Projets Industriels en Acacia",
    lead: "De stades suisses aux centres de congrès belges — 26 réalisations qui prouvent l'acacia.",
    breadcrumb_label: "Projets",
    image: "/images/projets/letzigrund-stadium-4.jpg",
    image_alt: "Stade Letzigrund en acacia",
    short: true,
  },
  intro_split: {
    eyebrow: "Galerie",
    eyebrow_variant: "forest",
    title: "L'acacia à l'œuvre",
    image_position: "left",
  },
  cta_band: {
    eyebrow: "Votre projet",
    title: "Un projet en acacia à réaliser ?",
    cta1: { label: "Espace architectes", url: "/architectes" },
    cta2: { label: "Nous contacter", url: "/contact" },
  },
});

// PRODUITS — hero only (la grille vient de la collection products)
writeMd("pages", "produits", {
  title: "Nos Produits",
  seo_description: "Découvrez tous les produits en acacia : poteaux, piquets, lames, parquet, mobilier extérieur.",
  screen_label: "Nos Produits",
  page_hero: {
    title: "Nos Produits en Acacia",
    lead: "21 références — du poteau écorcé brut à la lame de terrasse aboutée et au parquet étuvé.",
    breadcrumb_label: "Nos Produits",
    image: "/images/image10.jpg",
    image_alt: "Piquets en acacia conditionnés",
    short: true,
  },
  cta_band: {
    eyebrow: "Approvisionnement",
    title: "Besoin d'un sourcing acacia ?",
    lead: "Nous vous mettons en relation avec les bons fournisseurs et abouteurs.",
    cta1: { label: "Nous contacter", url: "/contact" },
  },
});

// CONTACT
writeMd("pages", "contact", {
  title: "Contact",
  seo_description: "Contactez la Filière Robinia Acacia France pour vos projets, demandes d'information ou partenariats.",
  screen_label: "Contact",
  page_hero: {
    title: "Contact",
    lead: "Nous sommes à votre écoute.",
    breadcrumb_label: "Contact",
    image: "/images/image9.jpg",
    image_alt: "Poutre d'acacia équarrie",
    short: true,
  },
});

console.log("\n✅ Génération terminée");
