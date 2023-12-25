import "./index.css";
import { useEffect, useState } from "react";
import { Card, Container } from "@mantine/core";
import EngineControls from "./EngineControls";
import axios from "axios";
import { UserRatedGame, GameSearchResult, RecommendedGame } from "@/types";
import UserRatedGamesList from "@/components/UserRatedGameList";

const DefaultUserRatedGame: UserRatedGame = {
  rating: 1,
  id: -1,
  name: "",
  searchResults: [],
  isSearchingDatabase: false,
};

function RecommendationMenu() {
  const [userRatedGames, setUserRatedGames] = useState<UserRatedGame[]>([
    { ...DefaultUserRatedGame },
  ]);

  const [activeGameIndex, setActiveGameIndex] = useState<number | null>(null);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] =
    useState(false);
  const [recommendedGames, setRecommendedGames] = useState<RecommendedGame[]>(
    []
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      userRatedGames.forEach(async (userRatedGame) => {
        if (activeGameIndex != null && userRatedGame.name !== "") {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/search_games?name=${
                userRatedGames[activeGameIndex].name
              }`
            );
            setUserRatedGames((prev) =>
              prev.map((prevGame, index) =>
                index === activeGameIndex
                  ? {
                      ...prevGame,
                      searchResults: response.data,
                      isSearchingDatabase: false,
                    }
                  : prevGame
              )
            );
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      });
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [userRatedGames]);

  const onAddGame = () => {
    setUserRatedGames([...userRatedGames, { ...DefaultUserRatedGame }]);
  };

  const onGameRemoved = (index: number) => {
    if (userRatedGames.length > 1) {
      //TODO: Show Warning when attempt to make list empty
      const newSelectedGames = userRatedGames.filter(
        (_, gameIndex) => index !== gameIndex
      );

      setUserRatedGames(newSelectedGames);
    }
  };

  const onGameRatingChanged = (index: number, newRating: number | string) => {
    const newSelectedGames = [...userRatedGames];
    newSelectedGames[index].rating = Math.max(1, Number(newRating));
    setUserRatedGames(newSelectedGames);
  };

  const onGameSearchTextChanged = (index: number, searchText: string) => {
    const newUserRatedGames = [...userRatedGames];
    newUserRatedGames[index].name = searchText;
    newUserRatedGames[index].isSearchingDatabase = true;

    setActiveGameIndex(index);
    setUserRatedGames(newUserRatedGames);
  };

  const onGameSelected = (index: number, game: GameSearchResult) => {
    const newUserRatedGames = [...userRatedGames];
    newUserRatedGames[index].name = game.name;
    newUserRatedGames[index].id = game.id;
    setUserRatedGames(newUserRatedGames);
  };

  const onSubmitGames = async () => {
    try {
      setIsGeneratingRecommendations(true);
      const gameDict: { [key: number]: number } = {};
      userRatedGames.forEach((game) => (gameDict[game.id] = game.rating));

      const response = await axios.post<RecommendedGame[]>(
        `${import.meta.env.VITE_BACKEND_URL}/game_recommendations`,
        gameDict
      );

      setRecommendedGames(response.data);

      setIsGeneratingRecommendations(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="centered-container">
      <Container size="sm" w={"100rem"}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          pl="5rem"
          pr="5rem"
          pb="3rem"
          withBorder
        >
          <Card.Section m={"auto"}>
            <h2>Game Recommendation Engine</h2>
          </Card.Section>
          <Card.Section>
            <UserRatedGamesList
              userRatedGames={userRatedGames}
              onGameRemoved={onGameRemoved}
              onGameRatingChanged={onGameRatingChanged}
              onGameSearchTextChanged={onGameSearchTextChanged}
              onGameSelected={onGameSelected}
            />
          </Card.Section>
          <Card.Section>
            <EngineControls
              onAddGame={onAddGame}
              onSubmitGames={onSubmitGames}
              isGeneratingRecommendations={isGeneratingRecommendations}
            />
          </Card.Section>
        </Card>
        <Card shadow="sm" mt={"10"} padding="lg" withBorder>
          <Card.Section p="1rem">
            <ul>
              {recommendedGames.map((game, index) => (
                <li key={index}>{`${game.game.name} (${game.rating.toFixed(
                  2
                )})`}</li>
              ))}
            </ul>
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
}

export default RecommendationMenu;
