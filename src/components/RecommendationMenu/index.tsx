import { Card, Container } from "@mantine/core";
import GameSelect from "./GameSelect";
import EngineControls from "./EngineControls";
import "./index.css";

function RecommendationMenu() {
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
          <Card.Section>
            <h2>Game Recommendation Engine</h2>
          </Card.Section>
          <Card.Section>
            <GameSelect />
            <GameSelect />
            <GameSelect />
            <GameSelect />
          </Card.Section>
          <Card.Section>
            <EngineControls />
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
}

export default RecommendationMenu;
