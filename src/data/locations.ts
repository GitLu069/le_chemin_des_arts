
import { artworks } from './artworks';
import { supabase } from '@/lib/supabase';

export interface Location {
  id: number;
  name: string;
  slug: string;
  description: string;
  artists: string[];
  image: string;
}

// Fallback locations data in case Supabase is unavailable
export const fallbackLocations: Location[] = [
  {
    id: 1,
    name: "Jardin de la tour Risler",
    slug: "jardin-tour-risler",
    description: "Un espace verdoyant au pied de l'historique tour Risler, offrant un cadre naturel idéal pour les œuvres artistiques.",
    artists: ["Victor Caniato", "Henry Gautheret", "Pascale Roussel", "Diéry Dioum", "Les 3 Gaules"],
    image: "/lovable-uploads/5a036742-6bf5-4d21-9d08-ccb2328d4e95.png"
  },
  {
    id: 2,
    name: "Lavoir du Cruy",
    slug: "lavoir-cruy",
    description: "Ce lavoir historique témoigne du patrimoine rural de Poleymieux-au-Mont-d'Or, créant un dialogue entre architecture ancienne et art contemporain.",
    artists: ["Wojtek Hoeft"],
    image: "/lovable-uploads/7dd29a1d-799d-4225-8c8a-45c0519b34eb.png"
  },
  {
    id: 3,
    name: "Salle du Cruy",
    slug: "salle-cruy",
    description: "Un espace d'exposition intérieur permettant de découvrir des œuvres dans un cadre préservé des intempéries.",
    artists: ["Victor Caniato", "Henry Gautheret"],
    image: "/lovable-uploads/71aef2b4-a3a2-476d-8001-2c5eed03ba74.png"
  },
  {
    id: 4,
    name: "Parvis de l'église",
    slug: "parvis-eglise",
    description: "Ce lieu central du village offre une mise en valeur particulière des œuvres sculptées en dialogue avec l'architecture religieuse.",
    artists: ["Diéry Dioum"],
    image: "/lovable-uploads/40ac3381-22ea-4afc-a792-22ad0045cdc2.png"
  },
  {
    id: 5,
    name: "Prairie des Cabornes",
    slug: "prairie-cabornes",
    description: "Ce vaste espace naturel permet d'accueillir des œuvres monumentales en harmonie avec le paysage champêtre.",
    artists: ["Dominique Sagnard", "Diéry Dioum"],
    image: "/lovable-uploads/4187597f-6ee7-46d0-a0a8-5326f6393e43.png"
  },
  {
    id: 6,
    name: "Musée Ampère",
    slug: "musee-ampere",
    description: "Lieu de mémoire dédié au scientifique André-Marie Ampère, le musée accueille des œuvres en résonance avec l'univers scientifique.",
    artists: ["Véronique Ancelet", "Pascale Roussel", "Isabelle Garbil", "Dominique Sagnard"],
    image: "/lovable-uploads/e0c32db2-9831-49b0-83fc-6b4b38090df5.png"
  },
  {
    id: 7,
    name: "Lavoir de la Rivière",
    slug: "lavoir-riviere",
    description: "Ce petit lavoir offre un cadre intimiste pour des œuvres en lien avec l'eau et la nature environnante.",
    artists: ["Pascale Roussel"],
    image: "/lovable-uploads/97c243ff-2de5-4485-8a8b-8aa8bc75fe94.png"
  },
  {
    id: 8,
    name: "Croix Rampau",
    slug: "croix-rampau",
    description: "Lieu d'exposition ponctuelle accueillant diverses interventions artistiques au fil de l'événement.",
    artists: [],
    image: "/lovable-uploads/459a9b4b-a36a-4900-a1b2-1f5e8cbf37e2.png"
  }
];

// Variable to store fetched locations
let fetchedLocations: Location[] | null = null;

// Modified fetchLocations function to ensure we always return data
export const fetchLocations = async (): Promise<Location[]> => {
  try {
    console.log('Attempting to fetch locations from Supabase...');
    
    // If we already fetched the locations, return them
    if (fetchedLocations !== null) {
      console.log('Using cached locations:', fetchedLocations);
      return fetchedLocations;
    }

    // Try to fetch locations from Supabase using a type-safe approach
    const { data: locationsData, error: locationsError } = await supabase
      .from('locations')
      .select('*') as { data: any[], error: any };

    if (locationsError) {
      console.error('Error fetching locations from Supabase:', locationsError);
      console.log('Falling back to static data');
      // Important: Set fetchedLocations to fallback to cache it
      fetchedLocations = fallbackLocations;
      return fallbackLocations;
    }

    console.log('Locations data from Supabase:', locationsData);

    // If Supabase returns empty data, use fallback
    if (!locationsData || locationsData.length === 0) {
      console.log('No locations found in Supabase, using fallback data');
      fetchedLocations = fallbackLocations;
      return fallbackLocations;
    }

    // Try to fetch location-artists relationships
    const { data: locationArtistsData, error: relationshipError } = await supabase
      .from('location_artists')
      .select(`
        location_id,
        artists:artist_id(name)
      `) as { data: any[], error: any };

    if (relationshipError) {
      console.error('Error fetching location-artist relationships:', relationshipError);
      console.log('Using locations without artist relationships');
    } else {
      console.log('Location-artist relationships:', locationArtistsData);
    }

    // Group artists by location
    const artistsByLocation: Record<number, string[]> = {};
    if (locationArtistsData && locationArtistsData.length > 0) {
      locationArtistsData.forEach((item: any) => {
        if (!artistsByLocation[item.location_id]) {
          artistsByLocation[item.location_id] = [];
        }
        artistsByLocation[item.location_id].push(item.artists.name);
      });
    }

    // Map the data to our Location interface format
    const locations: Location[] = locationsData.map((location: any) => {
      const locationObj = {
        id: location.id,
        name: location.name,
        slug: location.slug,
        description: location.description,
        artists: artistsByLocation[location.id] || [],
        image: location.image
      };
      console.log(`Processed location: ${locationObj.id} - ${locationObj.name}`);
      return locationObj;
    });

    console.log(`Total locations processed: ${locations.length}`);

    // Cache fetched locations
    fetchedLocations = locations;
    return locations;
  } catch (error) {
    console.error('Unexpected error in fetchLocations:', error);
    console.log('Falling back to static data due to error');
    // Important: Set fetchedLocations to fallback to cache it
    fetchedLocations = fallbackLocations;
    return fallbackLocations;
  }
};

// Modified getLocations to always return data (either from Supabase or fallback)
export const getLocations = async (): Promise<Location[]> => {
  try {
    console.log('getLocations called');
    const locations = await fetchLocations();
    
    // If locations is empty (unlikely now), return fallback
    if (!locations || locations.length === 0) {
      console.log('fetchLocations returned empty, using fallback data');
      return fallbackLocations;
    }
    
    console.log(`getLocations returning ${locations.length} locations`);
    return locations;
  } catch (error) {
    console.error('Error in getLocations:', error);
    console.log('Falling back to static fallback data');
    return fallbackLocations;
  }
};

// Export synchronous access to locations (may return cached or fallback)
export const locations = fetchedLocations || fallbackLocations;

// Helper function to get artworks by artist name
export const getArtworksByArtist = (artistName: string) => {
  return artworks.filter(artwork => artwork.artist === artistName);
};

// Helper function to get artworks by location
export const getArtworksByLocation = async (locationId: number) => {
  try {
    const locations = await getLocations();
    const location = locations.find(loc => loc.id === locationId);
    if (!location) return [];
    
    return artworks.filter(artwork => 
      location.artists.includes(artwork.artist)
    );
  } catch (error) {
    console.error('Error getting artworks by location:', error);
    
    // Fallback to static data
    const location = fallbackLocations.find(loc => loc.id === locationId);
    if (!location) return [];
    
    return artworks.filter(artwork => 
      location.artists.includes(artwork.artist)
    );
  }
};
