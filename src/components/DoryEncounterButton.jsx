import { useEffect, useState } from "react";
import doryController from "../engine/DoryController";

function DoryEncounterButton() {
    const [state, setState] = useState(
        doryController.getState()
    );

    useEffect(() => {
        return doryController.subscribe(setState);
    }, []);

    if (state !== "button") return null;

    return (
        <button
            onClick={() => doryController.openCoralInfo()}
            style={{
                position: "fixed",

                left: "50%",
                bottom: 40,

                transform: "translateX(-50%)",

                padding: "14px 28px",

                background: "rgba(16,35,55,0.9)",

                color: "#ffffff",

                border: "2px solid rgba(120,220,255,0.7)",

                borderRadius: "999px",

                fontSize: "18px",

                fontWeight: 600,

                cursor: "pointer",

                backdropFilter: "blur(10px)",

                WebkitBackdropFilter: "blur(10px)",

                boxShadow:
                    "0 0 20px rgba(0,180,255,0.35)",

                transition:
                    "transform .25s ease, box-shadow .25s ease",

                zIndex: 9999,

                userSelect: "none",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateX(-50%) scale(1.06)";

                e.currentTarget.style.boxShadow =
                    "0 0 28px rgba(0,220,255,.55)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateX(-50%) scale(1)";

                e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(0,180,255,.35)";
            }}
        >
            🐠 Meet Dory
        </button>
    );
}

export default DoryEncounterButton;