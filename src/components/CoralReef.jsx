import coralReef from "../assets/terrain/coralReef.png";

function CoralReef() {
  return (
    <img
      src={coralReef}
      alt="Coral Reef"
      draggable={false}
      style={{
        position: "absolute",

        left: 0,
        top: 1650,

        width: 2000,
        height: "auto",

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default CoralReef;