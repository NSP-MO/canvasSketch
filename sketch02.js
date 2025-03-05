const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  context: '2d',
  attributes: { antialias: true }
};

const sketch = ({ context, canvas }) => {
  const circle = {
    radius: 25,
    targetRadius: 0,
    isDragging: false,
    isAnimating: false,
    animationStartTime: 0,
    scale: 1
  };

  const mouse = {
    x: 0,
    y: 0,
    isDown: false,
    dragX: 0,
    dragY: 0
  };

  canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      mouse.isDown = true;
      mouse.dragX = mouse.x;
      mouse.dragY = mouse.y;
      circle.isDragging = true;
      circle.isAnimating = false;
      circle.scale = 1;
      circle.targetRadius = 25;
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (mouse.isDown) {
      mouse.dragX = mouse.x;
      mouse.dragY = mouse.y;
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      mouse.isDown = false;
      circle.isDragging = false;
      circle.isAnimating = true;
      circle.animationStartTime = Date.now();
      circle.x = mouse.dragX;
      circle.y = mouse.dragY;
    }
  });

  return ({ context, width, height, time }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    if (circle.isAnimating) {
      const elapsed = Date.now() - circle.animationStartTime;
      const progress = Math.min(elapsed / 2000, 1);
      circle.scale = progress;
      
      if (progress === 1) {
        circle.isAnimating = false;
      }
    }

    if (circle.isDragging) {
      circle.x = mouse.dragX;
      circle.y = mouse.dragY;
    }

    if (circle.isDragging || circle.isAnimating) {
      context.beginPath();
      context.arc(
        circle.x,
        circle.y,
        circle.targetRadius * (circle.isAnimating ? circle.scale : 1),
        0,
        Math.PI * 2
      );
      context.fillStyle = 'white';
      context.fill();
      context.strokeStyle = 'white';
      context.lineWidth = 2;
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);