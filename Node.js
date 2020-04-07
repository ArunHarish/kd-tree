class Node {
    #value;
    #left;
    #right;
    
    constructor(value) {
        this.#value = value;
        this.#left = null;
        this.#right = null;
    }

    getLeft() {
        return this.#left;
    }

    setLeft(leftNode) {
        this.#left = leftNode;
    }

    getRight() {
        return this.#right;
    }

    setRight(rightNode) {
        this.#right = rightNode;
    }

    getValue() {
        return this.#value;
    }

    releaseValue() {
        this.#value = null;
    }
    
}

export class RangeNode extends Node {
    #isYAxis = false;
    constructor(value, yAxis) {
        super(value);
        this.#isYAxis = yAxis;
    }
    
    isYAxis() {
        return this.#isYAxis;
    }

    releaseValue() {
        super.releaseValue();
        this.#isYAxis = false;
    }
}

export class RangePointNode extends RangeNode {
    #points;
    constructor(median, yAxis, points = []) {
        super(median, yAxis);
        this.#points = points;
    }

    getPoints() {
        return this.#points;
    }
}

export class PointNode extends Node {
    constructor(value) {
        super(value);
    }
}

export default Node;