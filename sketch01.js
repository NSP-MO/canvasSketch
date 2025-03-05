const canvasSketch = require("canvas-sketch");
const p5 = require("p5");

new p5();

const settings = {
  p5: true,
  animate: true
};

const sketch = ({ p5 }) => {
  let lines = [];

  return ({ width, height }) => {
    p5.background(255);
    const centerX = width/2;

    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
      lines.push({ 
        x: p5.mouseX,
        y: p5.mouseY
      });
    }

    lines.forEach(line => {
      p5.stroke(0);
      p5.strokeWeight(4);
      p5.line(line.x, line.y, centerX, line.y);
    });
  };
};

canvasSketch(sketch, settings);