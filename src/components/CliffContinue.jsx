import cliffContinue from "../assets/terrain/cliffContinue.png";

function CliffContinue() {
  return (
    <img
      src={cliffContinue}
      alt="Cliff Continue"
      style={{
        position: "absolute",

        left: -80,
        top:295,

        width: 2500,
        height: "auto",

        zIndex: 1,

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default CliffContinue;