import cliffContinue2 from "../assets/terrain/cliffContinue2.png";

function CliffContinue2() {
  return (
    <img
      src={cliffContinue2}
      alt="Cliff Continue 2"
      style={{
        position: "absolute",

        left: -100,
        top: 400,

        width: 4200,
        height: "auto",

        zIndex: 0,

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default CliffContinue2;