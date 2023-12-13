import { Button } from "@mantine/core";
import "./index.css";

interface EngineControlsProps {
  onAddGame: () => void;
  onSubmitGames: () => void;
  isGeneratingRecommendations: boolean;
}

function EngineControls({
  onAddGame,
  onSubmitGames,
  isGeneratingRecommendations,
}: EngineControlsProps) {
  return (
    <div className="controls-container">
      <Button w={"100%"} mr={"1rem"} onClick={onAddGame}>
        Add Game
      </Button>
      <Button
        color={isGeneratingRecommendations ? "orange" : "teal"}
        w={"100%"}
        disabled={isGeneratingRecommendations}
        onClick={onSubmitGames}
      >
        {isGeneratingRecommendations ? "Generating Recommendations" : "Submit"}
      </Button>
    </div>
  );
}

export default EngineControls;
