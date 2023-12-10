import { Select, Button, NumberInput } from "@mantine/core";
import "./index.css";

interface GameSelectProps {
  gameName?: string;
  gameRating?: number;
  onRemoveGameSelect?: () => void;
  onRatingChanged?: (newRating: number | string) => void;
}

function GameSelect({
  gameName,
  gameRating,
  onRemoveGameSelect,
  onRatingChanged,
}: GameSelectProps) {
  return (
    <div className="selection-list">
      <Button
        className="remove-button"
        variant="light"
        onClick={onRemoveGameSelect}
      >
        X
      </Button>
      <Select
        className="select"
        searchValue={gameName}
        placeholder="Select a game"
      />
      <NumberInput
        defaultValue={gameRating}
        pl={5}
        w={"15%"}
        onChange={onRatingChanged}
      />
    </div>
  );
}

export default GameSelect;
