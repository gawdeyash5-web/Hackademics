const PATH = [
    { x: 3012, y: 550 },
    { x: 4023, y: 581 },
    { x: 5436, y: 854 },
    { x: 4298, y: 1973 },
    { x: 2963, y: 3042 },
    { x: 2009, y: 3042 },
    { x: 2009, y: 2395 },
    { x: 614, y: 2469 },
    { x: 356, y: 2338 },
    { x: 1280, y: 2123 },
    { x: 2432, y: 1910 },
    { x: 2706, y: 1123 },
];

const SPEED = 0.0002;

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

export function updateTurtle(turtle) {
    if (turtle.segment === undefined) {
        turtle.segment = 0;
        turtle.t = 0;

        turtle.x = PATH[0].x;
        turtle.y = PATH[0].y;
    }

    turtle.t += SPEED;

    if (turtle.t >= 1) {
        turtle.t = 0;
        turtle.segment = (turtle.segment + 1) % PATH.length;
    }

    const len = PATH.length;

    const p0 = PATH[(turtle.segment - 1 + len) % len];
    const p1 = PATH[turtle.segment];
    const p2 = PATH[(turtle.segment + 1) % len];
    const p3 = PATH[(turtle.segment + 2) % len];

    const previousX = turtle.x;

    const pos = catmullRom(
        p0,
        p1,
        p2,
        p3,
        turtle.t
    );

    turtle.x = pos.x;
    turtle.y = pos.y;

    turtle.facingRight = turtle.x > previousX;
}