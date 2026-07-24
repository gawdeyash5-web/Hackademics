import Background from "./Background";
import Submarine from "./Submarine";

import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  SUBMARINE_WIDTH,
  SUBMARINE_HEIGHT,
} from "../engine/Constants";

function World() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
        }}
      >
        <Background />

        <Submarine
          x={WORLD_WIDTH / 2 - SUBMARINE_WIDTH / 2}
          y={WORLD_HEIGHT / 2 - SUBMARINE_HEIGHT / 2}
          facingRight={true}
        />
      </div>
    </div>
  );
}

export default World;