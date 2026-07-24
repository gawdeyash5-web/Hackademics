import { useEffect, useState } from "react";

import doryController from "../engine/DoryController";

import doryNpc from "../assets/fauna/doryNpc.png";

function DoryNPC() {
    const [controllerState, setControllerState] = useState(
        doryController.getState()
    );

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        return doryController.subscribe(setControllerState);
    }, []);

    useEffect(() => {
        if (
    controllerState === "dialogue" ||
    controllerState === "completed"
) {
    setVisible(true);
    return;
}

        setVisible(false);
    }, [controllerState]);

    useEffect(() => {
    if (controllerState !== "completed") return;

    const timer = setTimeout(() => {
        setVisible(false);
    }, 100);

    return () => clearTimeout(timer);
}, [controllerState]);

    return (
        <img
            src={doryNpc}
            alt="Dory"

            draggable={false}

            style={{
                position: "fixed",

                left: visible ? 40 : -520,

                bottom: 30,

                width: 420,

                height: "auto",

                zIndex: 10000,

                pointerEvents: "none",

                userSelect: "none",

                transition:
                    "left 700ms cubic-bezier(.22,.8,.25,1)",
            }}
        />
    );
}

export default DoryNPC;