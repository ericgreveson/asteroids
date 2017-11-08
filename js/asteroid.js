define(["canvas", "material", "mathutil"], function (canvas, material, mathutil) {
  let asteroid = {
    // Constants
    minRadius: 20,
    maxRadius: 100,
    minSpeed: 100,
    maxSpeed: 300,
    velocityAngleSpread: 0.7,

    // Draw asteroid
    // ast: Asteroid to draw
    draw: function (ast) {
      canvas.context.fillStyle = ast.material.color;
      canvas.context.beginPath();
      canvas.context.arc(ast.pos.x, ast.pos.y, ast.radius, 0, 2 * Math.PI);
      canvas.context.fill();
    },

    // Generate asteroid
    // scale: Asteroid scale
    // return: New asteroid object
    create: function (scale) {
      // Create asteroid
      let radius = scale * asteroid.minRadius * (1 + Math.random() * (asteroid.maxRadius / asteroid.minRadius - 1));
      let mat = material.iron;

      // Put it at a random place just outside the canvas, heading in
      let spawnAngle = Math.random() * Math.PI * 2;
      let canvasXEdgeAngle = Math.atan2(canvas.canvas.height, canvas.canvas.width);
      let xPos = 0;
      let yPos = 0;
      if (spawnAngle > Math.PI * 2 - canvasXEdgeAngle || spawnAngle < canvasXEdgeAngle) {
        // Spawn it off the right edge
        xPos = radius + canvas.canvas.width;
        yPos = 0.5 * canvas.canvas.height + (xPos - 0.5 * canvas.canvas.width) * Math.tan(spawnAngle);
      } else if (spawnAngle < Math.PI - canvasXEdgeAngle) {
        // Spawn it off the bottom edge
        yPos = canvas.canvas.height + radius;
        xPos = 0.5 * canvas.canvas.width + (yPos - 0.5 * canvas.canvas.height) / Math.tan(spawnAngle);
      } else if (spawnAngle < Math.PI + canvasXEdgeAngle) {
        // Spawn it off the left edge
        xPos = -radius;
        yPos = 0.5 * canvas.canvas.height + (xPos - 0.5 * canvas.canvas.width) * Math.tan(spawnAngle);
      } else {
        // Spawn it off the top edge
        yPos = -radius;
        xPos = 0.5 * canvas.canvas.width + (yPos - 0.5 * canvas.canvas.height) / Math.tan(spawnAngle);
      }

      let moveAngle = mathutil.wrapAngle(spawnAngle + Math.PI + (Math.random() - 0.5) * asteroid.velocityAngleSpread);
      let speed = asteroid.minSpeed + Math.random() * (asteroid.maxSpeed - asteroid.minSpeed);
      let xSpeed = Math.cos(moveAngle) * speed;
      let ySpeed = Math.sin(moveAngle) * speed;

      return {
        material: mat,
        radius: radius,
        pos: {
          x: xPos,
          y: yPos
        },
        speed: {
          x: xSpeed,
          y: ySpeed
        }
      };
    },

    // Update asteroid
    // ast: Asteroid to update
    // frameDelta: Time since last frame, in seconds
    update: function (ast, frameDelta) {
      // Update positions
      ast.pos.x += ast.speed.x * frameDelta;
      ast.pos.y += ast.speed.y * frameDelta;
    }
  };

  return asteroid;
});