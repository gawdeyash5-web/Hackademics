import caveSystem2 from "../assets/terrain/caveSystem2.png";

function CaveSystem2() {
  return (
    <img
      src={caveSystem2}
      alt="Cave System 2"
      style={{
        position: "absolute",

        left: 6700,
        top: 3650,

        width: 3900,
        height: "auto",

        filter: "brightness(20%) contrast(95%) saturate(85%)",

        zIndex: 20,

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default CaveSystem2;