export const distance = (x1, y1, x2, y2) => {
    const x = x2 - x1;
    const y = y2 - y1;
    return Math.sqrt(x * x + y * y);
};

export const lineCircle = (x1, y1, x2, y2, cx, cy, r) => {
    const lineLt = distance(x1, y1, x2, y2);
    const point = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / lineLt ** 2;

    const px = x1 + (point * (x2 - x1));
    const py = y1 + (point * (y2 - y1));

    return (distance(px, py, cx, cy) < r);
};
