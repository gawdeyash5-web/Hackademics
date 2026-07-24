function Bubble({ x, y, size }) {
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.08)",
                pointerEvents: "none",
                zIndex: 30,
            }}
        />
    );
}

export default Bubble;