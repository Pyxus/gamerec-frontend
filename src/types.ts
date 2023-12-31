export interface GameSearchResult {
  id: number;
  name: string;
  first_release_date: number;
}

export interface UserRatedGame {
  rating: number;
  id: number;
  name: string;
  searchResults: GameSearchResult[];
  isSearchingDatabase: boolean;
}

export interface RecommendedGame {
  rating: number;
  game: { id: number; name: string };
}
