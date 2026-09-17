export type Language = 'en' | 'hi' | 'bn';

export interface RelatedSpecies {
  name: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
  description: string;
}

export interface ExtinctAnimal {
  commonName: string;
  scientificName: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  habitat: string;
  diet: string;
  lifespan: string;
  size: string;
  weight: string;
  timePeriod: string;
  geographicDistribution: string;
  extinctionDate: string;
  causeOfExtinction: string;
  discoveryHistory: string;
  fossilEvidence: string;
  interestingFacts: string[];
  timeline: TimelineEvent[];
  conservationLessons: string;
  images: string[];
  relatedSpecies: RelatedSpecies[];
  summary: string;
  sourceUrl: string;
}

export interface UserSession {
  email: string | null;
  name: string;
  isGuest: boolean;
  photoUrl?: string;
}

export interface SearchSuggestion {
  name: string;
  type: string; // e.g. "Mammal", "Dinosaur", "Bird", "Reptile"
  period: string;
}
