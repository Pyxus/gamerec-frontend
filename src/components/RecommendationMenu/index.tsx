import "./index.css";
import React, { useEffect, useState } from "react";
import { Card, Container } from "@mantine/core";
import EngineControls from "./EngineControls";
import axios from "axios";
import { UserRatedGame, GameSearchResult } from "@/types";
import UserRatedGamesList from "@/components/UserRatedGameList";

const DefaultUserRatedGame: UserRatedGame = {
  rating: 0,
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
    newSelectedGames[index].rating = Number(newRating);
    setUserRatedGames(newSelectedGames);
  };

  const onGameSearchTextChanged = (index: number, searchText: string) => {
    const newUserRatedGames = [...userRatedGames];
    newUserRatedGames[index].name = searchText;
    newUserRatedGames[index].isSearchingDatabase = true;

    setActiveGameIndex(index);
    setUserRatedGames(newUserRatedGames);
  };

  const onGameSelected = (index: number, gameName: string) => {
    const newUserRatedGames = [...userRatedGames];
    newUserRatedGames[index].name = gameName;
    setUserRatedGames(newUserRatedGames);
  };

  return (
    <div className="centered-container">
      <Container size="sm">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ padding: "3rem" }}
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
            <EngineControls onAddGame={onAddGame} />
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
}

export default RecommendationMenu;
