import { Select, Button } from "@mantine/core";
import "./index.css";

function GameSelect() {
  return (
    <div className="selection-list">
      <Button className="remove-button" variant="light">
        X
      </Button>
      <Select className="select" placeholder="Select a game" />
    </div>
  );
}

export default GameSelect;
