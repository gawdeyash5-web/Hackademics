import submarineImage from "../assets/submarine/submarine.png";
import {
  SUBMARINE_WIDTH,
  SUBMARINE_HEIGHT,
} from "../engine/Constants";

function Submarine({
  x,
  y,
  facingRight,
}) {
  return (
    <div
      style={{
  position: "absolute",
  left: x,
  top: y,
  transform: `scaleX(${facingRight ? -1 : 1})`,
  transformOrigin: "center center",
}}
    >
      <img
        src={submarineImage}
        alt="Submarine"
        draggable={false}
        style={{
          width: SUBMARINE_WIDTH,
          height: SUBMARINE_HEIGHT,
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}

export default Submarine;