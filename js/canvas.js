define(function () {
  // HTML element that this maps to
  var canvasId = "gameCanvas";
  var canvas = document.getElementById(canvasId);

  return {
    id: canvasId,
    canvas: canvas,
    context: canvas.getContext("2d"),

    // Clear the canvas
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };
});