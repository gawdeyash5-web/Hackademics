
import jellyfishSheet from "../assets/fauna/jellyfish_sheet.png";
import JellyfishAnimator from "./JellyfishAnimator";
function Jellyfish({
    x,
    y,
    scale,
    speed,
    phase,
    driftX,
    driftY,
}) {

    const t = performance.now() * 0.0002 * speed + phase;

    const offsetX = Math.cos(t) * driftX;
    const offsetY = Math.sin(t) * driftY;

    // Velocity of ellipse
    const vx = -Math.sin(t) * driftX;
    const vy = Math.cos(t) * driftY;

    // Sprite naturally faces LEFT
    const rotation =
        Math.atan2(vy, vx) * 180 / Math.PI + 180;

    return (
    <JellyfishAnimator
            spriteSheet={jellyfishSheet}

            x={x + offsetX}
            y={y + offsetY}

            width={50 * scale}
            height={50 * scale}

            frameWidth={1280}
            frameHeight={720}

            totalFrames={86}
            columns={10}
            fps={12}

            facingRight={true}
            rotation={rotation}
        />
    );
}

export default Jellyfish;