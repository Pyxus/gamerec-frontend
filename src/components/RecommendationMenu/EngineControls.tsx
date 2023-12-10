import { Button } from "@mantine/core";
import "./index.css";

function EngineControls() {
  return (
    <div className="controls-container">
      <Button style={{ width: "100%", marginRight: "1rem" }}>Add Game</Button>
      <Button color="teal" style={{ width: "100%" }}>
        Submit
      </Button>
    </div>
  );
}

export default EngineControls;
