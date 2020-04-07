class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    static allEqual(pointArray) {
        if (pointArray.length === 1) {
            return false;
        }

        let startingPoint = pointArray[0];
        
        for (let index = 1; index < pointArray.length; index++) {
            let currentPoint = pointArray[index];
            if (currentPoint.getX() !== startingPoint.getX() || 
                    currentPoint.getY() !== startingPoint.getY()) {
                return false;
            }
        }

        return true;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setSelected() {
        this.selected = true;
    }

    removeSelected() {
        this.selected = false;
    }

    isSelected() {
        return this.selected;
    }
}
export default Point;