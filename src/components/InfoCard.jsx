import { useEffect, useState } from "react";
import infoController from "../engine/InfoController";

function InfoCard() {
  const [point, setPoint] = useState(infoController.getActive());

  useEffect(() => {
    return infoController.subscribe(setPoint);
  }, []);

  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") {
        infoController.hide();
      }
    };

    window.addEventListener("keydown", key);

    return () => window.removeEventListener("keydown", key);
  }, []);

  if (!point || !point.open) return null;

  return (
    <div
      style={{
        position: "fixed",

        top: "50%",
        left: "50%",

        transform: "translate(-50%,-50%)",

        width: 700,

        background: "rgba(5,20,35,.82)",

        backdropFilter: "blur(18px)",

        borderRadius: "22px",

        border: "1px solid rgba(120,220,255,.25)",

        padding: "40px",

        color: "white",

        zIndex: 999999,

        boxShadow:
          "0 0 45px rgba(0,180,255,.25)",
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          marginBottom: 18,
        }}
      >
        {point.icon} {point.title}
      </div>

      <div
        style={{
          fontSize: 20,
          lineHeight: 1.8,
          opacity: .92,
        }}
      >
        {point.description}
      </div>

      <div
        style={{
          marginTop: 35,
          opacity: .6,
          textAlign: "center",
        }}
      >
        Press ESC to close
      </div>
    </div>
  );
}

export default InfoCard;