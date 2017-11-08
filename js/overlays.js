define(["canvas"], function (canvas) {
  return {
    cashText: {
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
    // cash: Current cash
    // lives: Current lives
    draw: function (cash, lives) {
      canvas.context.fillStyle = "#ffffff";
      canvas.context.font = "Bold 20px Arial";

      // Cash
      canvas.context.fillText("Cash: £" + cash.toFixed(), this.cashText.pos.x, this.cashText.pos.y);

      // Lives
      canvas.context.fillText("Lives: " + lives.toString(), this.livesText.pos.x, this.livesText.pos.y);
    },
  };
});