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

/*
function UserRatedGamesList({
  userRatedGames,
  onGameRemoved: onRemoveGame,
  onGameRatingChanged: onRatingChanged,
  onGameSearchTextChanged,
}: UserRatedGamesListProps) {
  return (
    <>
      {userRatedGames.map((game, index) => (
        <GameSelect
          key={index}
          gameName={game.name}
          gameRating={game.rating}
          isLoading={game.isLoading}
          data={game.searchData.map(
            (res) =>
              `${res.name} (${new Date(
                res.first_release_date * 1000
              ).getFullYear()})`
          )}
          onGameRemoved={() => onRemoveGame(index)}
          onRatingChanged={(newRating) => onRatingChanged(index, newRating)}
          onGameSearchTextChanged={(search: string) =>
            onGameSearchTextChanged(index, search)
          }
        />
      ))}
    </>
  );
}*/

export default UserRatedGamesList;
