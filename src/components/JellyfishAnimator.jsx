import { useEffect, useRef, useState } from "react";

function JellyfishAnimator({
    spriteSheet,
    x,
    y,
    width,
    height,
    frameWidth,
    frameHeight,
    totalFrames,
    columns,
    fps = 12,
    facingRight = true,
    rotation = 0,
}) {
    const [frame, setFrame] = useState(0);
    const lastTime = useRef(0);

    useEffect(() => {
        let animationId;

        function animate(time) {
            if (time - lastTime.current >= 1000 / fps) {
                setFrame((prev) => (prev + 1) % totalFrames);
                lastTime.current = time;
            }

            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [fps, totalFrames]);

    const column = frame % columns;
    const row = Math.floor(frame / columns);

    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                width,
                height,
                overflow: "hidden",
                pointerEvents: "none",
                transform: `rotate(${rotation}deg) scaleX(${facingRight ? 1 : -1})`,
                transformOrigin: "center center",
            }}
        >
            <img
                src={spriteSheet}
                draggable={false}
                alt=""
                style={{
                    position: "absolute",
                    left: -(column * width),
                    top: -(row * height),
                    width: columns * width,
                    height: Math.ceil(totalFrames / columns) * height,
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}

export default JellyfishAnimator;