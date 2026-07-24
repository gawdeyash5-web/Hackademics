import coralFishSheet from "../assets/fauna/coralfish_sheet.png";
import CoralFishAnimator from "./CoralFishAnimator";

function CoralFish({
    x,
    y,
    scale,
    speed,
    phase,
    driftX,
    driftY,
}) {

    const t = performance.now() * 0.001 * speed + phase;

    // Small playful movement
    const offsetX = Math.sin(t * 1.8) * driftX;
    const offsetY = Math.cos(t * 2.5) * driftY;

    // Velocity
    const vx = Math.cos(t * 1.8) * driftX * 1.8;
    const vy = -Math.sin(t * 2.5) * driftY * 2.5;

    // Sprite naturally faces RIGHT
    // Small nose-up / nose-down tilt
const rotation = Math.atan2(vy, Math.abs(vx)) * 180 / Math.PI * 0.35;

// Flip sprite when changing direction
const facingRight = vx >= 0;
    return (
        <CoralFishAnimator
            spriteSheet={coralFishSheet}

            x={x + offsetX}
            y={y + offsetY}

            width={26 * scale}
            height={26 * scale}

            frameWidth={1280}
            frameHeight={720}

            totalFrames={52}
            columns={10}
            fps={18}

           facingRight={facingRight}
            rotation={rotation}
        />
    );
}

export default CoralFish;