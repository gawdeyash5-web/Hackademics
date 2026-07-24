import barracudaSheet from "../assets/fauna/barracuda_sheet.png";
import BarracudaAnimator from "./BarracudaAnimator";

function Barracuda({
    x,
    y,
    rotation,
    facingRight,
    scale = 1,
}) {
    return (
        <BarracudaAnimator
            spriteSheet={barracudaSheet}

            x={x}
            y={y}

            width={100 * scale}
            height={70 * scale}

            frameWidth={1280}
            frameHeight={720}

            totalFrames={52}
            columns={10}
            fps={16}

            // Original sprite faces LEFT
            facingRight={facingRight}
            rotation={rotation}
        />
    );
}

export default Barracuda;