// --------------------------------------------------
// Whale Controller
// --------------------------------------------------

const PATH = [
    { x: 10550, y: 1623 }, // Outside screen

    { x: 9992, y: 1623 },
    { x: 8664, y: 1405 },
    { x: 7334, y: 913 },
    { x: 6870, y: 583 },
    { x: 7707, y: 687 },
    { x: 9227, y: 1507 },
    { x: 9998, y: 1948 },

    { x: 10650, y: 2150 } // Outside screen
];

const DURATION = 20; // seconds

//--------------------------------------------------

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

//--------------------------------------------------

export function createWhale() {
    return {
       x: PATH[0].x,
       y: PATH[0].y,
        rotation: 0,

        facingRight: false,

        active: false,

        finished: false,

        progress: 0,
    };
}

//--------------------------------------------------

export function startWhale(whale) {
    whale.active = true;
    whale.finished = false;
    whale.progress = 0;

    whale.x = PATH[0].x;
    whale.y = PATH[0].y;
}

//--------------------------------------------------

export function resetWhale(whale) {
    whale.active = false;
    whale.finished = false;
    whale.progress = 0;

    whale.x = PATH[0].x;
    whale.y = PATH[0].y;
}

//--------------------------------------------------

export function updateWhale(whale, dt) {
    if (!whale.active) return;

    whale.progress += dt / DURATION;

    if (whale.progress >= 1) {
        whale.progress = 1;
        whale.active = false;
        whale.finished = true;
    }

    const segmentCount = PATH.length - 3;

    const value = whale.progress * segmentCount;

    const seg = Math.min(
        Math.floor(value),
        segmentCount - 1
    );

    const t = value - seg;

    const pos = catmullRom(
        PATH[seg],
        PATH[seg + 1],
        PATH[seg + 2],
        PATH[seg + 3],
        t
    );

    whale.x = pos.x;
    whale.y = pos.y;

    const next = catmullRom(
        PATH[seg],
        PATH[seg + 1],
        PATH[seg + 2],
        PATH[seg + 3],
        Math.min(t + 0.01, 1)
    );

    const dx = next.x - pos.x;
    const dy = next.y - pos.y;

    whale.rotation =
        Math.atan2(dy, Math.abs(dx)) *
        180 /
        Math.PI *
        0.25;

    whale.facingRight = dx > 0;
}