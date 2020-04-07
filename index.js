"use strict";
import kdTree from "./2dTree.js";
import Random from "./Random.js";
(function(d) {
    const tree = new kdTree();
    const canvas = d.querySelector(".ui");
    const rectangleWrapper = d.querySelector(".rectangleWrapper");
    const rectangle = d.querySelector(".rectangle");

    const { top, left } = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");
    
    const generateBtn = d.querySelector("button.generateBtn");
    const resetBtn = d.querySelector("button.resetBtn");
    
    let randomPoints = [];

    let mouse = {
        down : null,
        up : null,
        isDown : false
    }

    const resetMouse = () => {
        mouse = {
            down : null,
            up : null,
            isDown : false
        }
    }

    const drawPoint = (x, y, isSelected) => {
        let color = "red";
        if (!isSelected) {
            color = "black";
        }

        context.beginPath();
        context.fillStyle = color;
        context.moveTo(x, y);
        context.arc(x, y, 2, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    const render = dataPoints => {
        let { width, height } = canvas;
        context.clearRect(0, 0, width, height);
        // Here for each point draw the circle
        dataPoints.forEach(point => {
            let x = point.getX();
            let y = point.getY();
            let selected = point.isSelected();
            drawPoint(x, y, selected);
        });
    }

    const renderRect = (x1, x2, y1, y2) => {
        rectangle.style.setProperty("display", "block");
        rectangle.style.setProperty("transform", 
            `matrix(1, 0, 0, 1, ${x1}, ${y1})`
        );

        let width = x2 - x1;
        let height = y2 - y1;

        rectangle.style.setProperty("width", `${width}px`)
        rectangle.style.setProperty("height", `${height}px`)

    }

    const findRange = () => {
        let x1 = Math.min(mouse.up[0], mouse.down[0]);
        let x2 = Math.max(mouse.up[0], mouse.down[0]);

        let y1 = Math.min(mouse.up[1], mouse.down[1]);
        let y2 = Math.max(mouse.up[1], mouse.down[1]);

        return {
            x1, x2, y1, y2
        }
    }

    const resetUI = () => {
        resetMouse();
        rectangle.style.setProperty("display", "none");
    }

    rectangleWrapper.addEventListener("mousedown", function(event) {
        mouse.down = [
            event.clientX - left,
            event.clientY - top
        ]
        mouse.isDown = true;
    });

    rectangleWrapper.addEventListener("mousemove", function(event) {
        if (mouse.isDown) {
            mouse.up = [
                event.clientX - left,
                event.clientY - top
            ];
            let { x1, x2, y1, y2 } = findRange();
            renderRect(x1, x2, y1, y2);
        }
    })

    let mouseEventCluster = [
        "mouseleave",
        "mouseup"
    ]

    mouseEventCluster.forEach(e => rectangleWrapper.addEventListener(e, function() {
        if (mouse.isDown) {
            // Here find all points that are in the boundary
            let mouseBoundary = findRange();
            let results = tree.rangeQuery(
                mouseBoundary
            );
            results.forEach(point => {
                point.setSelected();
            })
            // Re-render points
            render(randomPoints);
            resetUI();
        }
    }))

    generateBtn.addEventListener("click", function() {
        // Generate random points and then render
        randomPoints = Random.generatePoints(
            [0, 0],
            [500, 500],
            5000
        );
        
        tree.clear();

        tree.addPoints(randomPoints);
        render(
            randomPoints
        );              
    });

    resetBtn.addEventListener("click", function() {
        tree.clear();
        randomPoints = [];
        render([]);
    });

})(document);