import { useEffect, useState } from "react";
import doryController from "../engine/DoryController";

function CoralInfoCard() {
    const [state, setState] = useState(
        doryController.getState()
    );

    useEffect(() => {
        return doryController.subscribe(setState);
    }, []);

    useEffect(() => {
        if (state !== "info") return;

        function handleKeyDown(event) {
            if (event.key === "Enter") {
                doryController.startDialogue();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
    }, [state]);

    if (state !== "info") return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9998,
            }}
        >
            <div
                style={{
                    width: 700,
                    maxWidth: "90%",
                    background: "rgba(8,18,28,0.96)",
                    border: "2px solid rgba(110,220,255,0.35)",
                    borderRadius: 22,
                    padding: 35,
                    color: "#ffffff",
                    boxShadow:
                        "0 0 40px rgba(0,170,255,0.25)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: 20,
                        fontSize: 32,
                    }}
                >
                    🪸 Coral Reef
                </h2>

                <p
                    style={{
                        lineHeight: 1.8,
                        color: "#d8e7ef",
                        fontSize: 18,
                    }}
                >
                    Coral reefs are one of the most diverse
                    ecosystems on Earth. Although they cover
                    less than one percent of the ocean floor,
                    they support nearly twenty five percent of
                    all known marine species.
                </p>

                <p
                    style={{
                        lineHeight: 1.8,
                        color: "#d8e7ef",
                        fontSize: 18,
                    }}
                >
                    Corals are living animals called polyps.
                    Over thousands of years they build massive
                    limestone structures that provide food,
                    shelter and breeding grounds for countless
                    fish, turtles, crustaceans and other
                    marine life.
                </p>

                <p
                    style={{
                        lineHeight: 1.8,
                        color: "#d8e7ef",
                        fontSize: 18,
                    }}
                >
                    Healthy coral reefs also protect coastlines
                    from storms and play an essential role in
                    maintaining the balance of ocean ecosystems.
                </p>

                <div
                    style={{
                        marginTop: 35,
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: 17,
                        color: "#79dfff",
                        letterSpacing: 1,
                    }}
                >
                    Press <b>ENTER</b> to continue
                </div>
            </div>
        </div>
    );
}

export default CoralInfoCard;