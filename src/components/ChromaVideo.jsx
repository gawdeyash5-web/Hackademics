import { useEffect, useRef } from "react";

function ChromaVideo({
    src,
    x,
    y,
    width,
    facingRight = true,
}) {

    const videoRef = useRef(null);
const canvasRef = useRef(null);
    useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    video.play().catch(() => {});

    function draw() {
        if (video.readyState >= 2) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );
//             const imageData = ctx.getImageData(
//     0,
//     0,
//     canvas.width,
//     canvas.height
// );

// const pixels = imageData.data;

// // Key color (#DDB32F)
// const keyR = 221;
// const keyG = 179;
// const keyB = 47;

// // Tolerance (we'll tweak this later)
// const threshold = 60;

// for (let i = 0; i < pixels.length; i += 4) {

//     const r = pixels[i];
//     const g = pixels[i + 1];
//     const b = pixels[i + 2];

//     const distance = Math.sqrt(
//         (r - keyR) ** 2 +
//         (g - keyG) ** 2 +
//         (b - keyB) ** 2
//     );

//     if (distance < threshold) {
//         pixels[i + 3] = 0; // Make pixel transparent
//     }
// }

// ctx.putImageData(imageData, 0, 0);
        }

        requestAnimationFrame(draw);
    }

    draw();
}, []);

    return (
        <>
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                style={{
                    display: "none",
                }}
            />

            <canvas
    ref={canvasRef}
    width={width}
    height={width}
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width,
                    height: width,
                    pointerEvents: "none",
                }}
            />
        </>
    );
}

export default ChromaVideo;