import "./index.css";
import { UserRatedGame } from "@/types";
import GameSelect from "@/components/GameSelect";

interface UserRatedGamesListProps {
  userRatedGames: UserRatedGame[];
  onGameRemoved: (index: number) => void;
  onGameRatingChanged: (index: number, newRating: number | string) => void;
  onGameSearchTextChanged: (index: number, serachText: string) => void;
  onGameSelected: (index: number, gameName: string) => void;
}

function UserRatedGamesList({
  userRatedGames,
  onGameRemoved,
  onGameRatingChanged,
  onGameSearchTextChanged,
  onGameSelected,
}: UserRatedGamesListProps) {
  return (
    <>
      {userRatedGames.map((game, index) => (
        <GameSelect
          key={index}
          gameSearchResults={game.searchResults}
          isSearchingDatabase={game.isSearchingDatabase}
          selectedGameName={game.name}
          onGameRemoved={() => onGameRemoved(index)}
          onGameRatingChanged={(newRating) =>
            onGameRatingChanged(index, newRating)
          }
          onGameSelected={(gameName) => onGameSelected(index, gameName)}
          onGameSearchTextChanged={(newSearchText) =>
            onGameSearchTextChanged(index, newSearchText)
          }
        />
      ))}
    </>
  );
}
export default UserRatedGamesList;
