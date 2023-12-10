import { Button } from "@mantine/core";
import "./index.css";

interface EngineControlsProps {
  onAddGame?: () => void;
}

function EngineControls({ onAddGame }: EngineControlsProps) {
  return (
    <div className="controls-container">
      <Button w={"100%"} mr={"1rem"} onClick={onAddGame}>
        Add Game
      </Button>
      <Button color="teal" w={"100%"}>
        Submit
      </Button>
    </div>
  );
}

export default EngineControls;
