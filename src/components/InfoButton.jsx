import { useEffect, useState } from "react";
import infoController from "../engine/InfoController";

function InfoButton() {
  const [point, setPoint] = useState(infoController.getActive());

  useEffect(() => {
    return infoController.subscribe(setPoint);
  }, []);

  if (!point) return null;

  return (
    <button
      onClick={() => infoController.show({ ...point, open: true })}
      style={{
        position: "fixed",
        left: "50%",
        bottom: 45,
        transform: "translateX(-50%)",

        padding: "16px 30px",

        borderRadius: "18px",
        border: "1px solid rgba(120,220,255,.35)",

        background:
          "linear-gradient(180deg,rgba(18,45,70,.95),rgba(8,20,35,.95))",

        color: "#EAFBFF",

        fontSize: "18px",
        fontWeight: "700",

        cursor: "pointer",

        backdropFilter: "blur(12px)",

        boxShadow:
          "0 0 25px rgba(0,170,255,.35)",

        zIndex: 99999,
      }}
    >
      {point.icon} {point.button}
    </button>
  );
}

export default InfoButton;