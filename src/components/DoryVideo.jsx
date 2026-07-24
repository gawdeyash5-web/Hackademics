import { useEffect, useRef, useState } from "react";
import SpriteAnimator from "./SpriteAnimator";

import dorySheet from "../assets/fauna/doryFamily_sheet.png";

function DoryVideo({
    x,
    y,

    width = 60,
    height = 34,

    anchorRadius = 80,

    fps = 12,
}) {
    const position = useRef({
        x,
        y,
    });

    const target = useRef({
        x,
        y,
    });

    const speed = useRef(0.12 + Math.random() * 0.08);

    const [renderPosition, setRenderPosition] = useState({
        x,
        y,
    });

    // Sprite naturally faces LEFT
    const [facingRight, setFacingRight] = useState(true);

    useEffect(() => {
        let animationFrame;

        function pickNewTarget() {
            target.current = {
                x: x + (Math.random() * 2 - 1) * anchorRadius,
                y: y + (Math.random() * 2 - 1) * anchorRadius,
            };
        }

        pickNewTarget();

        function animate() {
            const dx = target.current.x - position.current.x;
            const dy = target.current.y - position.current.y;

            const distance = Math.hypot(dx, dy);

            if (distance < 3) {
                pickNewTarget();
            } else {
                position.current.x += (dx / distance) * speed.current;
                position.current.y += (dy / distance) * speed.current;

                if (Math.abs(dx) > 0.2) {
                    setFacingRight(dx < 0);
                }
            }

            setRenderPosition({
                x: position.current.x,
                y: position.current.y,
            });

            animationFrame = requestAnimationFrame(animate);
        }

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [x, y, anchorRadius]);

    return (
        <SpriteAnimator
            spriteSheet={dorySheet}
            x={renderPosition.x}
            y={renderPosition.y}
            width={width}
            height={height}
            frameWidth={1800}
            frameHeight={920}
            totalFrames={76}
            columns={10}
            fps={fps}
            facingRight={facingRight}
        />
    );
}

export default DoryVideo;