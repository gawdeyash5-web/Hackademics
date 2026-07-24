import { useEffect, useState } from "react";

import DORY_DIALOGUE from "../engine/DoryDialogue";
import doryController from "../engine/DoryController";

function DoryDialogue() {
    const [controllerState, setControllerState] = useState(
        doryController.getState()
    );

    const [dialogueIndex, setDialogueIndex] = useState(0);

    useEffect(() => {
        return doryController.subscribe(setControllerState);
    }, []);

    useEffect(() => {
        if (controllerState !== "dialogue") {
            setDialogueIndex(0);
            return;
        }

        function nextDialogue() {
            setDialogueIndex((current) => {
                if (current >= DORY_DIALOGUE.length - 1) {
                    doryController.finishDialogue();
                    return current;
                }

                return current + 1;
            });
        }

        function handleKey(event) {
            if (event.key === "Enter") {
                nextDialogue();
            }
        }

        function handleMouse(event) {
            if (event.button === 0) {
                nextDialogue();
            }
        }

        window.addEventListener("keydown", handleKey);
        window.addEventListener("mousedown", handleMouse);

        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("mousedown", handleMouse);
        };
    }, [controllerState]);

    if (controllerState !== "dialogue") return null;

    const currentDialogue = DORY_DIALOGUE[dialogueIndex];

    return (
        <div
            style={{
                position: "fixed",
                left: 460,
                bottom: 140,

                width: 520,

                background: "rgba(255,255,255,0.96)",

                borderRadius: 20,

                padding: 24,

                color: "#222",

                boxShadow:
                    "0 10px 40px rgba(0,0,0,0.35)",

                zIndex: 10001,

                userSelect: "none",

                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    lineHeight: 1.7,
                    fontWeight: 500,
                }}
            >
                {currentDialogue.text}
            </div>

            <div
                style={{
                    marginTop: 18,

                    textAlign: "right",

                    fontSize: 13,

                    color: "#777",
                }}
            >
                ENTER or Click
            </div>
        </div>
    );
}

export default DoryDialogue;