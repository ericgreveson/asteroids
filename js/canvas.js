define(function () {
  // HTML element that this maps to. Canvas units map to metres in the game.
  let canvasId = "gameCanvas";
  let canvas = document.getElementById(canvasId);

  return {
    id: canvasId,
    canvas: canvas,
    context: canvas.getContext("2d"),

    // Clear the canvas
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // Wrap a coordinate into the canvas
    // coord: The coordinate to wrap (in-place)
    wrapCoord: function (coord) {
      while (coord.y < 0) {
        coord.y += canvas.height;
      }
      while (coord.y >= canvas.height) {
        coord.y -= canvas.height;
      }

      while (coord.x < 0) {
        coord.x += canvas.width;
      }
      while (coord.x >= canvas.width) {
        coord.x -= canvas.width;
      }
    }
  };
});