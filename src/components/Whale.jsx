import whaleSheet from "../assets/fauna/whale_sheet.png";
import WhaleAnimator from "./WhaleAnimator";

function Whale({
    x,
    y,
    rotation,
    scale = 1,
    facingRight = false, // Whale sprite naturally faces LEFT
}) {
    return (
        <WhaleAnimator
            spriteSheet={whaleSheet}
            x={x}
            y={y}
            width={520 * scale}
            height={336 * scale}
            frameWidth={1280}
            frameHeight={720}
            totalFrames={41}
            columns={10}
            fps={41 / 3.5}
            facingRight={facingRight}
            rotation={rotation}
        />
    );
}

export default Whale;