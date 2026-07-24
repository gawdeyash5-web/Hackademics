import bottomrock from "../assets/terrain/bottomrock.png";

function BottomRock() {
  return (
    <img
      src={bottomrock}
      alt="Bottom Rock"
      style={{
        position: "absolute",

        left: 0,
        top: 2200,

        width: 6050,
        height: "auto",

        zIndex: 0,
        filter: "brightness(60%) contrast(90%)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default BottomRock;