import cliff from "../assets/terrain/cliff.png";

function Cliff() {
  return (
    <img
      src={cliff}
      alt="Cliff"
      style={{
        position: "absolute",

        left: -155,
        top: -350,

        width: 2500,
        height: "auto",

        zIndex: 2,

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default Cliff;