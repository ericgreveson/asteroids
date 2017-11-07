define(function () {
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
    }
  };
});