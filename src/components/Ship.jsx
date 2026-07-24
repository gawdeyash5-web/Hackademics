import ship from "../assets/terrain/ship.png";

function Ship() {
    return (
        <img
            src={ship}
            alt="Sunken Ship"
            draggable={false}
            style={{
                position: "absolute",
                left: 2245,
                top: 4083,

                width: "900px",
                height: "auto",

                pointerEvents: "none",
                userSelect: "none",
            }}
        />
    );
}

export default Ship;