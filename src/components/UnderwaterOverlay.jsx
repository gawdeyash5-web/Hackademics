import overlay from "../assets/world/underwaterOverlay.png";

function UnderwaterOverlay() {
  return (
    <img
      src={overlay}
      alt=""
      draggable={false}
      style={{
  position: "fixed",

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  width: "100%",
  height: "100%",

  objectFit: "cover",

  pointerEvents: "none",

  opacity: 0.55,

  zIndex: 9000,
}}
    />
  );
}

export default UnderwaterOverlay;