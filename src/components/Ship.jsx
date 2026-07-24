import ship from "../assets/terrain/ship.png";

function Ship() {
    return (
        <img
            src={ship}
            alt="Sunken Ship"
            draggable={false}
            style={{
                position: "absolute",
                left: 2745,
                top: 4383,

                width: "900px", // Adjust if needed
                height: "auto",

                pointerEvents: "none",
                userSelect: "none",
            }}
        />
    );
}

export default Ship;