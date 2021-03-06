﻿define(["canvas", "input", "mathutil"], function (canvas, input, mathutil) {
  var ship = {
    // Engine thrust in N
    thrust: 2000000,

    // Mass in kg
    mass: 20000,

    // Rotation speed in radians per second, when rotating
    rotationSpeed: Math.PI,

    // "Radius" of ship
    radius: 20,

    // Current ship position
    pos: {
      x: canvas.canvas.width / 2,
      y: canvas.canvas.height / 2
    },

    // Current ship speed
    speed: {
      x: 0,
      y: 0
    },

    // Current ship angle, in radians, from the +X axis
    angle: 0,

    // Draw spaceship
    draw: function () {
      canvas.context.save();
      canvas.context.fillStyle = "#ffffff";
      canvas.context.translate(ship.pos.x, ship.pos.y);
      canvas.context.rotate(ship.angle);
      canvas.context.scale(ship.radius, ship.radius);
      canvas.context.beginPath();
      canvas.context.moveTo(-1.0, -0.5);
      canvas.context.lineTo(-0.5, -0.5);
      canvas.context.lineTo(1.0, 0.0);
      canvas.context.lineTo(-0.5, 0.5);
      canvas.context.lineTo(-1.0, 0.5);
      canvas.context.closePath();
      canvas.context.fill();
      canvas.context.restore();
    },

    // Update ship parameters
    // frameDelta: current frame time step delta, in seconds
    update: function (frameDelta) {
      // Update angle
      var rotationDelta = 0;
      if (input.keys.leftArrow.pressed) {
        rotationDelta -= ship.rotationSpeed * frameDelta;
      }

      if (input.keys.rightArrow.pressed) {
        rotationDelta += ship.rotationSpeed * frameDelta;
      }

      ship.angle = mathutil.wrapAngle(ship.angle + rotationDelta);

      // Update speed
      if (input.keys.upArrow.pressed) {
        let accel = ship.thrust / ship.mass;
        ship.speed.x += Math.cos(ship.angle) * accel * frameDelta;
        ship.speed.y += Math.sin(ship.angle) * accel * frameDelta;
      }

      // Update position
      ship.pos.x += ship.speed.x * frameDelta;
      ship.pos.y += ship.speed.y * frameDelta;

      canvas.wrapCoord(ship.pos);
    },

    // Get the ship gun position
    gunPosition: function () {
      return {
        x: ship.pos.x + Math.cos(ship.angle) * ship.radius,
        y: ship.pos.y + Math.sin(ship.angle) * ship.radius
      };
    }
  };

  return ship;
});