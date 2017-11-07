define(function () {
  return {
    // Wrap an angle to a range [0, Math.PI*2)
    wrapAngle: function (angle) {
      // Angles shouldn't be more than 1 rev out, so the while loops should only execute once
      // Could do some cleverer arithmetic to get these to fixed-time for > 1 rev out angles,
      // but there's no point at the moment
      while (angle >= Math.PI * 2) {
        angle -= Math.PI * 2;
      }
      while (angle < 0) {
        angle += Math.PI * 2;
      }
      return angle;
    }
  };
});