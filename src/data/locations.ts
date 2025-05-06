
import { artworks } from './artworks';

export interface Location {
  id: number;
  name: string;
  slug: string;
  description: string;
  artists: string[];
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Jardin de la tour Risler",
    slug: "jardin-tour-risler",
    description: "Un espace verdoyant au pied de l'historique tour Risler, offrant un cadre naturel idéal pour les œuvres artistiques.",
    artists: ["Victor Caniato", "Henry Gautheret", "Pascale Roussel", "Diéry Dioum", "Les 3 Gaules"]
  },
  {
    id: 2,
    name: "Lavoir du Cruy",
    slug: "lavoir-cruy",
    description: "Ce lavoir historique témoigne du patrimoine rural de Poleymieux-au-Mont-d'Or, créant un dialogue entre architecture ancienne et art contemporain.",
    artists: ["Wojtek Hoeft"]
  },
  {
    id: 3,
    name: "Salle du Cruy",
    slug: "salle-cruy",
    description: "Un espace d'exposition intérieur permettant de découvrir des œuvres dans un cadre préservé des intempéries.",
    artists: ["Victor Caniato", "Henry Gautheret"]
  },
  {
    id: 4,
    name: "Parvis de l'église",
    slug: "parvis-eglise",
    description: "Ce lieu central du village offre une mise en valeur particulière des œuvres sculptées en dialogue avec l'architecture religieuse.",
    artists: ["Diéry Dioum"]
  },
  {
    id: 5,
    name: "Prairie des Cabornes",
    slug: "prairie-cabornes",
    description: "Ce vaste espace naturel permet d'accueillir des œuvres monumentales en harmonie avec le paysage champêtre.",
    artists: ["Dominique Sagnard", "Diéry Dioum"]
  },
  {
    id: 6,
    name: "Musée Ampère",
    slug: "musee-ampere",
    description: "Lieu de mémoire dédié au scientifique André-Marie Ampère, le musée accueille des œuvres en résonance avec l'univers scientifique.",
    artists: ["Véronique Ancelet", "Pascale Roussel", "Isabelle Garbil", "Dominique Sagnard"]
  },
  {
    id: 7,
    name: "Lavoir de la Rivière",
    slug: "lavoir-riviere",
    description: "Ce petit lavoir offre un cadre intimiste pour des œuvres en lien avec l'eau et la nature environnante.",
    artists: ["Pascale Roussel"]
  },
  {
    id: 8,
    name: "Croix Rampau",
    slug: "croix-rampau",
    description: "Lieu d'exposition ponctuelle accueillant diverses interventions artistiques au fil de l'événement.",
    artists: []
  }
];

// Helper function to get artworks by artist name
export const getArtworksByArtist = (artistName: string) => {
  return artworks.filter(artwork => artwork.artist === artistName);
};

// Helper function to get artworks by location
export const getArtworksByLocation = (locationId: number) => {
  const location = locations.find(loc => loc.id === locationId);
  if (!location) return [];
  
  return artworks.filter(artwork => 
    location.artists.includes(artwork.artist)
  );
};
