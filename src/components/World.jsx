import { useEffect, useRef, useState } from "react";
import Background from "./Background";
import Submarine from "./Submarine";
import Bubbles from "./Bubbles";
import Cliff from "./Cliff";
import CliffContinue2 from "./CliffContinue2";
import CliffContinue from "./CliffContinue";
import BottomRock from "./BottomRock";
import DeepCliff from "./DeepCliff";
import CaveSystem from "./CaveSystem";
import CaveSystem2 from "./CaveSystem2";
import Bubble from "./Bubble";
import CoralReef from "./CoralReef";
import Turtle from "./Turtle";
import Jellyfish from "./Jellyfish";
import { updateTurtle } from "../engine/TurtleController";
import {
  reefJellyfish,
  caveJellyfish,
} from "../engine/JellyfishController";
import Barracuda from "./Barracuda";
import {
    createBarracuda,
    updateBarracuda,
} from "../engine/BarracudaController";
import Whale from "./Whale";

import {
    createWhale,
    updateWhale,
    startWhale,
} from "../engine/WhaleController";
import CoralFish from "./CoralFish";
import DoryVideo from "./DoryVideo";
import DoryEncounterButton from "./DoryEncounterButton";
import CoralInfoCard from "./CoralInfoCard";
import DoryNPC from "./DoryNPC";
import DoryDialogue from "./DoryDialogue";
import { doryFamily } from "../engine/DoryFamily";
import doryController from "../engine/DoryController";
import { coralFish } from "../engine/CoralFishController";
import {
  PROPELLER_OFFSET_X,
  PROPELLER_OFFSET_Y,
  MOVEMENT_BOX_HEIGHT,
  MOVEMENT_BOX_WIDTH,
  SUBMARINE_WIDTH,
  SUBMARINE_HEIGHT,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  SUBMARINE_SPEED,
} from "../engine/Constants";

function World() {
 
  const camera = useRef({ x: 0, y: 0 });
  const [isFollowing, setIsFollowing] = useState(true);
  

  const cameraRef = useRef({ x: 0, y: 0 });
  const bubbles = useRef([]);
  const bubbleId = useRef(0);
  const lastBubbleTime = useRef(0);
  const submarine = useRef({
    x: 2031,
    y: 531,
});

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const facingRight = useRef(true);
const turtle = useRef({
  t: 0,
  x: WORLD_WIDTH / 2,
  y: WORLD_HEIGHT / 2,
  facingRight: true,
});
  const [, forceRender] = useState(0);
const barracuda = useRef(createBarracuda());
const whale = useRef(createWhale());
const [whaleSequence, setWhaleSequence] = useState(false);
const [cameraMode, setCameraMode] = useState("submarine"); 
const doryTriggered = useRef(false);
  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const toggleFollow = (e) => {
      if (e.button === 0) {
        setIsFollowing((prev) => !prev);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", toggleFollow);

    let frame;

    const update = () => {
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      const left = screenCenterX - MOVEMENT_BOX_WIDTH / 2;
      const right = screenCenterX + MOVEMENT_BOX_WIDTH / 2;
      const top = screenCenterY - MOVEMENT_BOX_HEIGHT / 2;
      const bottom = screenCenterY + MOVEMENT_BOX_HEIGHT / 2;

      const targetScreenX = Math.max(left, Math.min(right, mouse.current.x));
      const targetScreenY = Math.max(top, Math.min(bottom, mouse.current.y));

      const targetWorldX = cameraRef.current.x + targetScreenX;
      const targetWorldY = cameraRef.current.y + targetScreenY;
      const dx = targetWorldX - submarine.current.x;

if (Math.abs(dx) > 2) {
  facingRight.current = dx > 0;
}

      if (isFollowing && !whaleSequence) {
  submarine.current.x +=
    (targetWorldX - submarine.current.x) * SUBMARINE_SPEED;

  submarine.current.y +=
    (targetWorldY - submarine.current.y) * SUBMARINE_SPEED;
}

      // ---------- WORLD LIMITS ----------
      const SURFACE_LEVEL = 520;

      submarine.current.x = Math.max(
        SUBMARINE_WIDTH / 2,
        Math.min(
          WORLD_WIDTH - SUBMARINE_WIDTH / 2,
          submarine.current.x
        )
      );

      submarine.current.y = Math.max(
        SURFACE_LEVEL,
        Math.min(
          WORLD_HEIGHT - SUBMARINE_HEIGHT / 2,
          submarine.current.y
        )
      );

      const now = performance.now();

if (now - lastBubbleTime.current > 120 && bubbles.current.length < 15) {
  lastBubbleTime.current = now;

  bubbles.current.push({
  id: bubbleId.current++,
  x:
    submarine.current.x +
    (facingRight.current
      ? -PROPELLER_OFFSET_X
      : PROPELLER_OFFSET_X),
  y: submarine.current.y + PROPELLER_OFFSET_Y,
  size: 5 + Math.random() * 5,
});
}

bubbles.current = bubbles.current.filter((bubble) => {
  bubble.y -= 1.2;
  bubble.x += Math.sin(now * 0.003 + bubble.id) * 0.3;
  bubble.size += 0.015;

  return bubble.y > submarine.current.y - 180;
});

updateTurtle(turtle.current);
updateBarracuda(barracuda.current, 1 / 60);
// -------------------------
// DORY ENCOUNTER TRIGGER
// -------------------------

const DORY_X = 1700;
const DORY_Y = 2600;

const distanceToDory = Math.hypot(
    submarine.current.x - DORY_X,
    submarine.current.y - DORY_Y
);

if (distanceToDory < 450) {

    if (!doryTriggered.current) {

        doryTriggered.current = true;
        doryController.playerEnteredZone();

    }

}
else {

    if (doryTriggered.current) {

        doryTriggered.current = false;
        doryController.playerLeftZone();

    }

}
if (whaleSequence) {
    updateWhale(whale.current, 1 / 60);

    if (whale.current.finished) {
        setWhaleSequence(false);
        setCameraMode("transitionToSubmarine");
    }
}
      // ---------- CAMERA ----------
      

let cameraFocus = submarine.current;

if (
  cameraMode === "whale" ||
  cameraMode === "transitionToWhale"
) {
  cameraFocus = whale.current;
}

const desiredCameraX =
  cameraFocus.x - window.innerWidth / 2;

const desiredCameraY =
  cameraFocus.y - window.innerHeight / 2;

      const maxX = WORLD_WIDTH - window.innerWidth;
      const maxY = WORLD_HEIGHT - window.innerHeight;

      camera.current.x += (desiredCameraX - camera.current.x) * 0.05;
camera.current.y += (desiredCameraY - camera.current.y) * 0.05;

camera.current.x = Math.max(0, Math.min(maxX, camera.current.x));
camera.current.y = Math.max(0, Math.min(maxY, camera.current.y));

cameraRef.current = {
  x: camera.current.x,
  y: camera.current.y,
};
if (cameraMode === "transitionToWhale") {
    const dx =
        desiredCameraX - camera.current.x;

    const dy =
        desiredCameraY - camera.current.y;

    if (Math.hypot(dx, dy) < 15) {
        setCameraMode("whale");
    }
}

if (cameraMode === "transitionToSubmarine") {
    const dx =
        desiredCameraX - camera.current.x;

    const dy =
        desiredCameraY - camera.current.y;

    if (Math.hypot(dx, dy) < 15) {
        setCameraMode("submarine");
    }
}

      forceRender((v) => v + 1);

      frame = requestAnimationFrame(update);
    };

    update();
    

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", toggleFollow);
    };
  }, [isFollowing]);
const bob = Math.sin(performance.now() * 0.002) * 5;
const worldMouseX = Math.round(camera.current.x + mouse.current.x);
const worldMouseY = Math.round(camera.current.y + mouse.current.y);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
  style={{
    position: "fixed",
    top: 10,
    left: 10,
    padding: "10px 14px",
    background: "rgba(0,0,0,0.75)",
    color: "#00ff99",
    fontFamily: "monospace",
    fontSize: "18px",
    borderRadius: "8px",
    zIndex: 9999,
    userSelect: "none",
  }}
>
  <div>X: {worldMouseX}</div>
<div>Y: {worldMouseY}</div>
</div>
      <div
        style={{
          position: "absolute",
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate(${-camera.current.x}px, ${-camera.current.y}px)`,
        }}
      >
        <Background />

         <CoralReef />
         {doryFamily.map((fish) => (
    <DoryVideo
        key={fish.id}
        x={fish.x}
        y={fish.y}
        width={85}
        height={48}
    />
))}
        <DeepCliff />
        <CliffContinue2 />
        <CliffContinue />
        <BottomRock />
        <Cliff />
        <CaveSystem />
        <CaveSystem2 />
        
        <Bubbles />
        {bubbles.current.map((bubble) => (
    <Bubble
        key={bubble.id}
        x={bubble.x}
        y={bubble.y}
        size={bubble.size}
    />
))}
<Turtle
  x={turtle.current.x}
  y={turtle.current.y}
  facingRight={turtle.current.facingRight}
/>
{reefJellyfish.map((jelly) => (
  <Jellyfish
    key={jelly.id}
    {...jelly}
  />
))}

{caveJellyfish.map((jelly) => (
  <Jellyfish
    key={jelly.id}
    {...jelly}
  />
))}
{coralFish.map((fish) => (
  <CoralFish
    key={fish.id}
    {...fish}
  />
))}
<Barracuda
    x={barracuda.current.x}
    y={barracuda.current.y}
    rotation={barracuda.current.rotation}
    facingRight={barracuda.current.facingRight}
/>
<Whale
    x={whale.current.x}
    y={whale.current.y}
    rotation={whale.current.rotation}
    facingRight={whale.current.facingRight}
/>
<button
  onClick={() => {
    startWhale(whale.current);
    setWhaleSequence(true);
    setCameraMode("transitionToWhale");
  }}
  style={{
    position: "absolute",
    left: 7244,
    top: 5239,

    width: "220px",
    height: "60px",

    borderRadius: "18px",
    border: "2px solid rgba(120,220,255,0.6)",

    background:
      "linear-gradient(180deg, rgba(40,120,180,0.95) 0%, rgba(12,55,90,0.95) 100%)",

    color: "#EAFBFF",

    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "1px",

    cursor: "pointer",

    boxShadow:
      "0 0 15px rgba(0,180,255,0.35), inset 0 0 10px rgba(255,255,255,0.15)",

    backdropFilter: "blur(4px)",

    transition: "all .2s ease",

    zIndex: 1000,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow =
      "0 0 25px rgba(0,220,255,.8), inset 0 0 15px rgba(255,255,255,.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow =
      "0 0 15px rgba(0,180,255,0.35), inset 0 0 10px rgba(255,255,255,0.15)";
  }}
>
  🐋 Whale Encounter
</button>
<Submarine
  x={submarine.current.x - SUBMARINE_WIDTH / 2}
  y={
    submarine.current.y -
    SUBMARINE_HEIGHT / 2 +
    bob
  }
  facingRight={facingRight.current}
/>
      </div>

<DoryEncounterButton />

<CoralInfoCard />

<DoryNPC />

<DoryDialogue />

</div>
);

}

export default World;