define(["canvas", "input"], function (canvas, input) {
  return {
    // Max speed in canvas units per second
    maxSpeed: 200,

    // "Radius" of ship
    radius: 20,

    // Current ship position
    pos: {
      x: 100,
      y: 400
    },

    // Current ship speed
    speed: {
      x: 0,
      y: 0
    },

    // Draw spaceship
    draw: function () {
      canvas.context.fillStyle = "#ffffff";
      canvas.context.fillRect(this.pos.x - this.radius, this.pos.y - this.radius / 2, this.radius * 2, this.radius);
    },

    // Update ship parameters
    // frameDelta: current frame time step delta, in seconds
    update: function (frameDelta) {
      // Update vertical speed
      this.speed.y = 0;

      if (input.keyState.upArrow) {
        this.speed.y -= this.maxSpeed;
      }

      if (input.keyState.downArrow) {
        this.speed.y += this.maxSpeed;
      }

      // Update position
      this.pos.x += this.speed.x * frameDelta;
      this.pos.y += this.speed.y * frameDelta;

      // Clamp Y values
      if (this.pos.y < this.radius) {
        this.pos.y = this.radius;
      }

      if (this.pos.y > canvas.height - this.radius) {
        this.pos.y = canvas.height - this.radius;
      }
    },
  };
});