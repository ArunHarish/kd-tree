import Point from "./Point.js";

class Random {
    static generate(a, b, size) {
        const points = [];
        for (let index = 0; index < size; index++) {
            points.push(
                ~~(Math.random() * (b - a) + a)
            )
        }
        return points;
    }

    static generatePoints(a, b, size) {
        const points = [];
        for (let index = 0; index < size; index++) {
            let maxX = Math.max(b[0], a[0]);
            let minX = Math.min(b[0], a[0]);
            let maxY = Math.max(b[1], a[1]);
            let minY = Math.min(b[1], a[1]);

            let x = ~~(
                Math.random() * (maxX - minX) + minX 
            );
            let y = ~~(
                Math.random() * (maxY - minY) + minY 
            );

            points.push(
                new Point(
                    x , y
                )
            )
        }
        return points;
    }
}

export default Random;