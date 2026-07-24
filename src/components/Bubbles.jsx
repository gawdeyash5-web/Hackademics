import { useEffect, useRef, useState } from "react";

const WORLD_WIDTH = 10000;
const WORLD_HEIGHT = 3000;

function createBubble() {
  return {
    x: Math.random() * WORLD_WIDTH,
    y: Math.random() * WORLD_HEIGHT,
    size: 4 + Math.random() * 8,
    speed: 0.3 + Math.random() * 0.7,
    opacity: 0.1 + Math.random() * 0.25,
  };
}

function Bubbles() {
  const bubbles = useRef(
    Array.from({ length: 250 }, () => createBubble())
  );

  const [, forceRender] = useState(0);

  useEffect(() => {
    let frame;

    const animate = () => {
      bubbles.current.forEach((bubble) => {
        bubble.y -= bubble.speed;

        if (bubble.y < -20) {
          bubble.y = WORLD_HEIGHT + 20;
          bubble.x = Math.random() * WORLD_WIDTH;
        }
      });

      forceRender((v) => v + 1);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {bubbles.current.map((bubble, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            background: `rgba(255,255,255,${bubble.opacity})`,
          }}
        />
      ))}
    </>
  );
}

export default Bubbles;