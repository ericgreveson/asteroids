define(["jquery"], function ($) {
  let input = {
    // Current key state
    keys: {
      leftArrow: {
        pressed: false,
        code: 37
      },
      upArrow: {
        pressed: false,
        code: 38
      },
      rightArrow: {
        pressed: false,
        code: 39
      },
      downArrow: {
        pressed: false,
        code: 40
      },
      spaceBar: {
        pressed: false,
        code: 32
      }
    },

    // Create keyboard handlers
    createKeyboardHandlers: function () {
      // Key down handlers
      $(document).keydown(function (event) {
        for (key in input.keys) {
          if (event.which == input.keys[key].code) {
            input.keys[key].pressed = true;
            event.preventDefault();
          }
        }
      });

      // Key up handlers
      $(document).keyup(function (event) {
        for (key in input.keys) {
          if (event.which == input.keys[key].code) {
            input.keys[key].pressed = false;
            event.preventDefault();
          }
        }
      });
    }
  };

  return input;
});