import turtleSheet from "../assets/fauna/turtle_sheet.png";
import SpriteAnimator from "./SpriteAnimator";

function Turtle({ x, y, facingRight }) {
    return (
        <SpriteAnimator
            spriteSheet={turtleSheet}
            x={x}
            y={y}
            width={55}
            height={55}
            frameWidth={1920}
            frameHeight={1080}
            totalFrames={87}
            columns={10}
            fps={12}
            facingRight={facingRight}
        />
    );
}

export default Turtle;