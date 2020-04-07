import Node from "./Node.mjs";


class BinaryTree {
    constructor() {
        this.root = null;
    }

    addPoint(point) {
        // Logic to construct the tree
        if (!this.root) {
            this.root = new Node(point, null);
            return ;
        }

        let currentNode = this.root;
        while (currentNode) {
            let left = currentNode.getLeft(),
                right = currentNode.getRight();

            if (point > currentNode.getValue()) {
                // Go right
                if (!right) {
                    currentNode.setRight(
                        new Node(point, currentNode)
                    );
                    break;
                }
                currentNode = right;
            } else {
                // Go left
                if (!left) {
                    currentNode.setLeft(
                        new Node(point, currentNode)
                    );
                    break;
                }
                currentNode = left;
            }
        }
    }
    
    _inorderRecursiveTraversal(currentNode, collector) {
        let value = currentNode.getValue();
        let left = currentNode.getLeft();
        let right = currentNode.getRight();
        
        if (left) {
            this._inorderRecursiveTraversal(left, collector);
        }

        collector.push(
            value
        );

        if (right) {
            this._inorderRecursiveTraversal(right, collector);
        }

    }

    _inorderRecursiveRange(currentNode, min, max, collector) {
        let value = currentNode.getValue();
        let left = currentNode.getLeft();
        let right = currentNode.getRight();
         
        if (value > min && left) {
            this._inorderRecursiveRange(left, min, max, collector);
        }

        if (value >= min && value <= max) {
            collector.push(value);
        }

        if (value < max && right) {
            this._inorderRecursiveRange(right, min, max, collector);
        }

    }

    traverse() {
        // In-order traversal go left then root and finally go right
        let sortedArray = [];
        this._inorderRecursiveTraversal(
            this.root,
            sortedArray
        );
        return sortedArray;
    }

    rangeSearch(a, b) {
        // Collect all values that are in range [a,b]
        let array = [];
        // Starts from root
        this._inorderRecursiveRange(
            this.root,
            a, b,
            array
        );

        return array;
    }
    /**
     * @returns Node containing the value of a or the node with nearest value
     * @param a The value to check for the node to exist in the tree 
     */
    search(a) {
        let currentNode = this.root;
        while (currentNode) {
            let left = currentNode.getLeft();
            let right = currentNode.getRight();
            let value = currentNode.getValue();

            if (a < value) {
                if (!left) {
                    break;
                }
                currentNode = left
            } else if (a > value) {
                if (!right) {
                    break;
                }
                currentNode = right;
            } else {
                break;
            }
            
        }

        return currentNode;
    };
}

export default BinaryTree;