define(["canvas"], function (canvas) {
  return {
    scoreText: {
      pos: {
        x: 50,
        y: 50
      }
    },
    livesText: {
      pos: {
        x: 1400,
        y: 50
      }
    },

    // Draw overlays
    // score: Current score
    // lives: Current lives
    draw: function (score, lives) {
      canvas.context.fillStyle = "#ffffff";
      canvas.context.font = "Bold 20px Arial";

      // Score
      canvas.context.fillText("Score: " + score.toFixed(), this.scoreText.pos.x, this.scoreText.pos.y);

      // Lives
      canvas.context.fillText("Lives: " + lives.toString(), this.livesText.pos.x, this.livesText.pos.y);
    },
  };
});