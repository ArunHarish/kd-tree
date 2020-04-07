import Node from "./Node.js";

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

class kdTree {
    static startDepth = false;
    #root = null;
    constructor() {
        this.#root = null;
    }

    _rangeQueryTraversal(currentNode, boundary) {
        let left = currentNode.getLeft();
        let right = currentNode.getRight();

        if (left) {
            this._rangeQueryTraversal(left, boundary);
        }

        
                
        if (right) {
            this._rangeQueryTraversal(right, boundary);
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
        if (!pointsArray.length) {
            return null;
        }

        let length = pointsArray.length;
        let sortedArray = pointsArray.sort(comparator(yAxis));
        let median = ~~(length / 2);
        let point = sortedArray[median];
        let node = new Node(
            point,
            yAxis
        );
        
        let leftArray = [];
        let rightArray = [];

        for (let index = 0; index < median; index++) {
            leftArray.push(
                pointsArray[index]
            );
        }

        for (let index = median + 1; index < length; index++) {
            rightArray.push(
                pointsArray[index]
            );
        }

        let left = this._addPoint(leftArray, !yAxis);
        let right = this._addPoint(rightArray, !yAxis);;

        node.setLeft(left);
        node.setRight(right);

        return node;
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
        if (pointsArray.length) {
            this.#root =
                this._addPoint(pointsArray, kdTree.startDepth);
        }
    }

    rangeQuery(boundary) {
        let root = this.#root;
        if (root) {
            this._rangeQueryTraversal(root, boundary)
        }
    }

    traverse() {
        // this._inorderTraversal(
        //     this.#root
        // );
        console.log(this.#root);
    }
    
}

export default kdTree;