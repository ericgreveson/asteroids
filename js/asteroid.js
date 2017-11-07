define(["canvas"], function (canvas) {
  return {
    // Constants
    minRadius: 20,
    maxRadius: 100,
    minSpeed: {
      x: 100,
      y: -20
    },
    maxSpeed: {
      x: 300,
      y: 20
    },

    // Draw asteroid
    // ast: Asteroid to draw
    draw: function (ast) {
      canvas.context.fillStyle = ast.color;
      canvas.context.beginPath();
      canvas.context.arc(ast.pos.x, ast.pos.y, ast.radius, 0, 2 * Math.PI);
      canvas.context.fill();
    },

    // Generate asteroid
    // scale: Asteroid scale
    // return: New asteroid object
    create: function (scale) {
      // Create asteroid
      var radius = scale * this.minRadius * (1 + Math.random() * (this.maxRadius / this.minRadius - 1));
      var xPos = canvas.canvas.width + radius;
      var yPos = Math.random() * canvas.canvas.height;
      var xSpeed = -(this.minSpeed.x + Math.random() * (this.maxSpeed.x - this.minSpeed.x));
      var ySpeed = -(this.minSpeed.y + Math.random() * (this.maxSpeed.y - this.minSpeed.y));

      return {
        color: "#ff00ff",
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
});