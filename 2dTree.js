import { RangeNode, PointNode, RangePointNode } from "./Node.js";
import Point from "./Point.js";

const comparator = (yAxis) => {
    if (yAxis) {
        return (a, b) => {
            if (a.getY() < b.getY()) {
                return -1;
            } else if (a.getY() > b.getY()) {
                return 1;
            }
        
            return 0;
        }
    }
    return (a, b) => {
        if (a.getX() < b.getX()) {
            return -1;
        } else if (a.getX() > b.getX()) {
            return 1;
        }
    
        return 0;
    }
}

const pushValue = (leftArray, rightArray,point, median, yAxis) => {
    let value = point.getX();
    if (yAxis) {
        value = point.getY();
    }

    if (value > median) {
        rightArray.push(point);
    } else if (value <= median) {
        leftArray.push(point);
    }

}

const findMedian = (array, yAxis) => {
    let sum = 0;
    let length = array.length;
    for (let index = 0; index < length; index++) {
        let point = array[index];
        let value = point.getX();

        if (yAxis) {
            value = point.getY();
        }
        sum += value; 
    }

    let median = sum / length;

    return median;
}

class kdTree {
    static startDepth = false;
    #root = null;
    constructor() {
        this.#root = null;
    }

    _rangeQueryTraversalCollect(currentNode, boundary, resultArray) {
        let { x1 : minX, x2 : maxX, y1 : minY, y2 : maxY } = boundary;
        let value = currentNode.getValue();

        if (currentNode instanceof PointNode) {
            if (value.getX() >= minX && 
                    value.getX() <= maxX && 
                    value.getY() >= minY && 
                    value.getY() <= maxY) {
                resultArray.push(value);
            }
            return ;
        }

        let yAxis = currentNode.isYAxis();
        let max = maxX;
        let min = minX;

        let left = currentNode.getLeft();
        let right = currentNode.getRight();

        if (yAxis) {
            max = maxY;
            min = minY;
        }

        if (value > min && left) {
            this._rangeQueryTraversalCollect(left, boundary, resultArray);
        }

        if (currentNode instanceof RangePointNode && 
                    value >= min && value <= max) {
            currentNode.getPoints().forEach(point => {
                resultArray.push(point);
            })
        }

        if (value < max && right) {
            this._rangeQueryTraversalCollect(right, boundary, resultArray);
        }

    }

    _inorderDeletion(currentNode) {
        let left = currentNode.getLeft();
        let right = currentNode.getRight();
        if (left) {
            this._inorderDeletion(left);
            currentNode.setLeft(null);
        }

        currentNode.releaseValue();

        if (right) {
            this._inorderDeletion(right);
            currentNode.setRight(null);
        }
    }

    _addPoint(pointsArray, yAxis) {
        let leftArray = [];
        let rightArray = [];
        let length = pointsArray.length;
        let median = findMedian(pointsArray, yAxis);
        // Base cases when length is 0 or length is 1
        // or all the arrays are same
        if (length === 0) {
            return null;
        }

        if (length === 1) {
            let point = pointsArray[0];
            // return point node
            return new PointNode(point);
        }
        // This check is O(n) same as for loop below so it is okay
        if (Point.allEqual(pointsArray)) {
            return new RangePointNode(median, yAxis, pointsArray);
        }

        for (let index = 0; index < pointsArray.length; index++) {
            let point = pointsArray[index];
            pushValue(leftArray, rightArray, point, median, yAxis);
        }

        let left = this._addPoint(leftArray, !yAxis);
        let right = this._addPoint(rightArray, !yAxis);
        let rangeNode = new RangeNode(median, yAxis)

        rangeNode.setLeft(left);
        rangeNode.setRight(right);

        return rangeNode;
    }

    // Clears the tree
    clear() {
        let root = this.#root;
        if (root) {
            this._inorderDeletion(root);
            this.#root = null;
        }
    }

    addPoints(pointsArray) {
        let sortedArray = pointsArray.sort(comparator(false));
        let length = pointsArray.length;
        if (length) {
            // Sort if by x-axis
            this.#root =
                this._addPoint(sortedArray, kdTree.startDepth);
        }
        return sortedArray;
    }

    rangeQuery(boundary) {
        let root = this.#root;
        let queryResult = [];
        if (root) {
            this._rangeQueryTraversalCollect(root, boundary, queryResult);
        }

        return queryResult;
    }
    
}

export default kdTree;