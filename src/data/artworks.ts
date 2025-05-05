
export interface Artwork {
  id: number;
  title: string;
  artist: string;
  description: string;
  slug: string;
  image: string;
  artistInfo?: {
    bio: string;
    email?: string;
    phone?: string;
    website?: string;
    instagram?: string;
  };
}

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "La Vengeance",
    artist: "Les 3 Gaules",
    description: "Une installation immersive et poétique mêlant art urbain et végétal, transformant une voiture abandonnée. Cette création est un appel à la conscience écologique et une invitation à réfléchir à l'interaction entre l'homme et son environnement.",
    slug: "oeuvre-1",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    artistInfo: {
      bio: "Les 3 Gaules est un collectif de trois artistes anonymes travaillant sur la relation entre art, nature et environnement. Leur œuvre La Vengeance transforme une voiture abandonnée en une installation immersive et poétique mêlant art urbain et végétal. Cette création est un appel à la conscience écologique et une invitation à réfléchir à l'interaction entre l'homme et son environnement. La Vengeance n'est pas une menace, mais une prise de parole artistique."
    }
  },
  {
    id: 2,
    title: "Deux visions d'une même réalité",
    artist: "Diéry Dioum",
    description: "Œuvre taillée dans un tronc de frêne, jouant sur le vide et le plein, révélant deux visions d'une même réalité : l'apparence et la profondeur cachée.",
    slug: "oeuvre-2",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    artistInfo: {
      bio: "Originaire du Sénégal, Diéry Dioum sculpte principalement le chêne. Autodidacte nourri par sa culture, il transmet émotions et récits à travers ses œuvres. Il réalise également des performances en direct, sculptant la matière en public.",
      email: "dioumdiery@yahoo.fr",
      phone: "07 58 34 40 77"
    }
  },
  {
    id: 3,
    title: "Vibrations de l'être",
    artist: "Isabelle Garbil",
    description: "Sculpture en métal explorant les notions de présence, d'absence, d'impermanence et d'interconnexion cosmique, révélant la vibration essentielle de l'être en devenir.",
    slug: "oeuvre-3",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    artistInfo: {
      bio: "Ancienne ingénieure, Isabelle Garbil devient céramiste en 2009, puis diplômée des Beaux-Arts de Versailles. Elle travaille le métal et le vide pour révéler la vibration essentielle de l'être en devenir. Ses sculptures explorent les notions de présence, d'absence, d'impermanence et d'interconnexion cosmique.",
      email: "ifauvepiot@gmail.com",
      phone: "06 15 41 20 13"
    }
  },
  {
    id: 4,
    title: "En suspensions",
    artist: "Véronique Ancelet",
    description: "Des pendeloques textiles baroques suspendues dans une bergerie, racontant rêves et différences, une installation participative réalisée avec les habitants de la commune.",
    slug: "oeuvre-4",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    artistInfo: {
      bio: "Avec Pascale Roussel et les habitants de la commune, elle propose deux installations participatives : En suspensions, des pendeloques textiles baroques suspendues dans une bergerie, racontant rêves et différences, et Volent au vent, des bandelettes poétiques flottant dans le paysage comme des drapeaux tibétains, porteurs de vœux et d'énergie collective.",
      email: "veronique-ancelet@hotmail.fr",
      phone: "06 16 12 37 12",
      instagram: "parfoislabas"
    }
  },
  {
    id: 5,
    title: "Volent au vent",
    artist: "Pascale Roussel",
    description: "Des bandelettes poétiques flottant dans le paysage comme des drapeaux tibétains, porteurs de vœux et d'énergie collective, une installation participative réalisée avec les habitants de la commune.",
    slug: "oeuvre-5",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    artistInfo: {
      bio: "Diplômée en art-thérapie en 2014, elle anime des ateliers autour du textile. Autodidacte, elle rafistole et recompose des rebuts textiles pour créer des œuvres qui interrogent. Elle cherche à ralentir le temps, à faire surgir une atmosphère plus qu'un objet fini.",
      website: "www.entretissures.com",
      instagram: "entretissures"
    }
  },
  {
    id: 6,
    title: "Corps en mouvement",
    artist: "Wojtek Hoeft",
    description: "Sculpture figurative explorant le corps humain, interrogeant les émotions et l'image de soi à travers des formes puissantes, en mouvement, souvent à la limite du physiquement possible.",
    slug: "oeuvre-6",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    artistInfo: {
      bio: "Wojtek Hoeft explore le corps humain par la sculpture figurative en bronze ou résine. Il interroge les émotions et l'image de soi à travers des formes puissantes, en mouvement, souvent à la limite du physiquement possible. Ses œuvres questionnent notre rapport au corps et à la perception.",
      email: "ulueli@wanadoo.fr",
      phone: "04 74 03 89 94"
    }
  },
  {
    id: 7,
    title: "Dans la tête d'Ampère",
    artist: "Marie Fontaine",
    description: "Cette œuvre monumentale représente la fusion entre art et science, rendant hommage aux découvertes révolutionnaires d'André-Marie Ampère sur l'électromagnétisme.",
    slug: "oeuvre-7",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    artistInfo: {
      bio: "L'artiste Marie Fontaine a créé une installation interactive qui permet aux visiteurs d'explorer les concepts d'électromagnétisme de façon visuelle et sensorielle, créant un pont entre science, histoire et création artistique."
    }
  },
  {
    id: 8,
    title: "Fusion métal et terre",
    artist: "Dominique Sagnard & Marc Da Costa",
    description: "Une création à quatre mains, puissante et poétique, fusionnant céramique et métal pour sculpter et raconter l'humanité, un travail commun autour de la matière, de la lumière et de l'énergie.",
    slug: "oeuvre-8",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    artistInfo: {
      bio: "Lui, ferronnier dès l'adolescence. Elle, céramiste. Ensemble, ils fusionnent leurs univers pour sculpter le métal et raconter l'humanité. Un travail commun autour de la matière, de la lumière et de l'énergie. Une création à quatre mains, puissante et poétique.",
      email: "marc.da-costa@orange.fr, sagnard.dom@orange.fr",
      phone: "06 71 65 74 40"
    }
  },
  {
    id: 9,
    title: "Oiseaux en vol",
    artist: "Henry Gautheret",
    description: "Mobiles évoquant des murmures graphiques : une sculpture entre matière, mouvement et abstraction, explorant les oiseaux en vol avec une approche minimaliste révélant une sensualité discrète et tactile.",
    slug: "oeuvre-9",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    artistInfo: {
      bio: "Henri Gautheret travaille sur la rigueur, l'équilibre et le vide. Son œuvre minimaliste, parfois qualifiée « d'austère », révèle une sensualité discrète et tactile. Depuis vingt ans, il explore les oiseaux en vol sous forme de mobiles évoquant des murmures graphiques : une sculpture entre matière, mouvement et abstraction.",
      email: "pegaz.gautheret@gmail.com",
      phone: "06 07 70 73 08"
    }
  },
  {
    id: 10,
    title: "Contes et symboles",
    artist: "Victor Caniato",
    description: "Sculpture inspirée des contes et symboles primitifs, créant une œuvre universelle qui joue avec les échelles entre socle et sculpture, mêlant différents matériaux comme le béton, le bronze, le bois ou encore l'acier.",
    slug: "oeuvre-10",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    artistInfo: {
      bio: "Arrivé en France à 8 ans, ancien métallurgiste, Victor Caniato est marqué par la découverte de Brancusi. Il puise dans les contes et symboles primitifs pour créer des œuvres universelles. Il travaille le béton, le bronze, le bois ou encore l'acier, et joue avec les échelles entre socle et sculpture. Il développe également un jardin artistique accueillant d'autres créateurs."
    }
  },
  {
    id: 11,
    title: "Éclosion",
    artist: "Collectif Le Chemin des Arts",
    description: "Une œuvre collaborative réalisée par plusieurs artistes du parcours, symbolisant l'émergence de la créativité et le dialogue entre différentes sensibilités artistiques.",
    slug: "oeuvre-11",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    artistInfo: {
      bio: "Le collectif Le Chemin des Arts réunit plusieurs artistes locaux et internationaux dans une démarche collaborative. Cette œuvre est le fruit d'un travail commun, symbolisant la richesse du partage artistique."
    }
  },
  {
    id: 12,
    title: "Équilibre fragile",
    artist: "Collectif Le Chemin des Arts",
    description: "Installation éphémère évoquant la délicate balance de nos écosystèmes et la précarité de l'équilibre naturel, réalisée avec des matériaux contrastants pour souligner notre responsabilité collective.",
    slug: "oeuvre-12",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    artistInfo: {
      bio: "Cette installation éphémère est le fruit d'une collaboration entre différents artistes du parcours, questionnant notre rapport à l'environnement et à la fragilité des écosystèmes."
    }
  }
];
