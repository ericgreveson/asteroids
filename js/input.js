define(["jquery"], function ($) {
  return {
    // Key code constants
    keyCodeLeftArrow: 37,
    keyCodeUpArrow: 38,
    keyCodeRightArrow: 39,
    keyCodeDownArrow: 40,

    // Current key state
    keyState: {
      upArrow: false,
      downArrow: false
    },

    // Create keyboard handlers
    createKeyboardHandlers: function () {
      var input = this;

      // Key down handlers
      $(document).keydown(function (event) {
        if (event.which == input.keyCodeUpArrow) {
          input.keyState.upArrow = true;
          event.preventDefault();
        } else if (event.which == input.keyCodeDownArrow) {
          input.keyState.downArrow = true;
          event.preventDefault();
        }
      });

      // Key up handlers
      $(document).keyup(function (event) {
        if (event.which == input.keyCodeUpArrow) {
          input.keyState.upArrow = false;
          event.preventDefault();
        } else if (event.which == input.keyCodeDownArrow) {
          input.keyState.downArrow = false;
          event.preventDefault();
        }
      });
    }
  };
});