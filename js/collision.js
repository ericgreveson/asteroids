define(["canvas"], function (canvas) {
  return {
    // Collision detection
    // pos1: {x, y} of first object
    // radius1: radius of first object
    // pos1: {x, y} of second object
    // radius1: radius of second object
    // return: true if colliding, false otherwise
    detectSphereSphere: function (pos1, radius1, pos2, radius2) {
      var dx = pos2.x - pos1.x;
      var dy = pos2.y - pos1.y;
      var distSquared = dx * dx + dy * dy;
      var sumRadius = radius1 + radius2;
      return distSquared < sumRadius * sumRadius;
    },

    // Test if sphere is travelling beyond canvas
    // pos: Centre of sphere
    // radius: Radius of sphere
    // speed: Speed of sphere
    // return: True if beyond, false otherwise
    testSphereBeyondCanvas: function (pos, radius, speed) {
      // left edge test
      if (speed.x <= 0 && (pos.x + radius) < 0) {
        return true;
      }

      // right edge test
      if (speed.x >= 0 && (pos.x - radius) > canvas.canvas.width) {
        return true;
      }

      // top edge test
      if (speed.y <= 0 && (pos.y + radius) < 0) {
        return true;
      }

      // bottom edge test
      if (speed.y >= 0 && (pos.y - radius) > canvas.canvas.height) {
        return true;
      }

      return false;
    },
  };
});