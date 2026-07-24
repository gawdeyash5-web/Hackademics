import caveSystem from "../assets/terrain/caveSystem.png";

function CaveSystem() {
  return (
    <img
      src={caveSystem}
      alt="Cave System"
      style={{
        position: "absolute",

        left: 6700,
        top: 3650,

        width: 3900,
        height: "auto",

        filter: "brightness(20%) contrast(95%) saturate(85%)",

        zIndex: 0,

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default CaveSystem;