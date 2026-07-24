import deepCliff from "../assets/terrain/deepCliff.png";

function DeepCliff() {
  return (
    <img
      src={deepCliff}
      alt="Deep Cliff"
      style={{
        position: "absolute",

        left: 1000,
        top: 1380,

        width: 10024,
        height: "auto",

        filter: "brightness(60%) contrast(90%) saturate(80%)",

        zIndex: -1,

        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export default DeepCliff;