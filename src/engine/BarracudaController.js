const points = [
    { x: 4903, y: 500 },
    { x: 6492, y: 566 },
    { x: 7133, y: 1198 },
    { x: 8346, y: 2182 },
    { x: 6062, y: 2631 },
    { x: 4411, y: 3281 },
    { x: 6138, y: 3178 },
    { x: 4453, y: 1111 },
];

const segmentSpeeds = [
    2.2, // 1 -> 2 FAST
    0.9, // 2 -> 3 SLOW
    0.9, // 3 -> 4 SLOW
    2.0, // 4 -> 5 FAST
    0.8, // 5 -> 6 SLOW
    2.1, // 6 -> 7 FAST
    0.8, // 7 -> 8 SLOW
    0.9, // 8 -> 1 SLOW
];

function catmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    return {
        x:
            0.5 *
            ((2 * p1.x) +
                (-p0.x + p2.x) * t +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),

        y:
            0.5 *
            ((2 * p1.y) +
                (-p0.y + p2.y) * t +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    };
}

export function createBarracuda() {
    return {
        segment: 0,
        t: 0,
        x: points[0].x,
        y: points[0].y,
        rotation: 0,
    };
}

export function updateBarracuda(fish, delta) {

    fish.t += delta * segmentSpeeds[fish.segment] * 0.08;

    while (fish.t >= 1) {
        fish.t -= 1;
        fish.segment = (fish.segment + 1) % points.length;
    }

    const i = fish.segment;

    const p0 = points[(i - 1 + points.length) % points.length];
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];

    const pos = catmullRom(
        p0,
        p1,
        p2,
        p3,
        fish.t
    );

    fish.x = pos.x;
    fish.y = pos.y;

    const next = catmullRom(
        p0,
        p1,
        p2,
        p3,
        Math.min(fish.t + 0.01, 1)
    );

    const dx = next.x - pos.x;
    const dy = next.y - pos.y;
let angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;

// Is the fish travelling to the right?
fish.facingRight = dx < 0;

// Prevent upside-down swimming
if (angle > 90 && angle < 270) {
    angle -= 180;
}

fish.rotation = angle;}