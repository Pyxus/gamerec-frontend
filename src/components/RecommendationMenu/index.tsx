import React, { useEffect, useState } from "react";
import { Card, Container } from "@mantine/core";
import GameSelect from "./GameSelect";
import EngineControls from "./EngineControls";
import "./index.css";

type SelectedGame = {
  rating: number;
  id: number;
  name: string;
};

const DefaultSelectedGame: SelectedGame = {
  rating: 1.0,
  id: -1,
  name: "Test",
};

function RecommendationMenu() {
  const [selectedGames, setSelectedGames] = useState<SelectedGame[]>([
    DefaultSelectedGame,
  ]);

  const onAddGame = () => {
    setSelectedGames([...selectedGames, DefaultSelectedGame]);
  };

  const onRemoveGameSelect = (index: number) => {
    const newSelectedGames = selectedGames.filter(
      (_, gameIndex) => index !== gameIndex
    );

    setSelectedGames(newSelectedGames);
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
            {selectedGames.map((game, index) => (
              <GameSelect
                key={index}
                gameName={game.name}
                gameRating={game.rating}
                onRemoveGameSelect={() => onRemoveGameSelect(index)}
              />
            ))}
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
