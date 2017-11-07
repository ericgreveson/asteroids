define(["canvas"], function (canvas) {
  var bullet = {
    // Radius of a bullet
    radius: 3,

    // Speed of a bullet (relative to emitter)
    speed: 200,

    // Generate bullet
    // pos: Position of the emitter {x, y}
    // angle: Angle of the emitter, in radians from +X axis
    // speed: Speed of the emitter {x, y}
    // return: New bullet object
    create: function (pos, angle, speed) {
      // Create bullet
      var xSpeed = speed.x + Math.cos(angle) * bullet.speed;
      var ySpeed = speed.y + Math.sin(angle) * bullet.speed;

      return {
        color: "#00ff00",
        pos: pos,
        radius: bullet.radius,
        speed: {
          x: xSpeed,
          y: ySpeed
        }
      };
    },

    // Draw a bullet
    // blt: Bullet to draw
    draw: function (blt) {
      canvas.context.fillStyle = blt.color;
      canvas.context.beginPath();
      canvas.context.arc(blt.pos.x, blt.pos.y, blt.radius, 0, 2 * Math.PI);
      canvas.context.fill();
    },

    // Update a bullet
    // blt: Bullet to update
    // frameDelta: Time since last frame, in seconds
    update: function (blt, frameDelta) {
      // Update positions
      blt.pos.x += blt.speed.x * frameDelta;
      blt.pos.y += blt.speed.y * frameDelta;
    },
  };

  return bullet;
});