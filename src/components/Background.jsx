import ocean from "../assets/world/ocean.png";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../engine/Constants";

function Background() {
  return (
    <img
      src={ocean}
      alt="Ocean"
      draggable={false}
      style={{
        position: "absolute",
        left: 0,
        top: 0,

        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,

        objectFit: "cover",

        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}

export default Background;