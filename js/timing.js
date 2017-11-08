define(["canvas"], function (canvas) {
  let timing = {
    // Time variables
    startTime: new Date().getTime(),
    lastTime: new Date().getTime(),
    frameTime: new Date().getTime(),

    // Callbacks registered with this module
    callbacks: [],

    // Get the current game time, in seconds
    gameTime: function () {
      return (timing.frameTime - timing.startTime) / 1000;
    },

    // Timer handler
    update: function () {
      // Get frame start time
      timing.frameTime = new Date().getTime();
      let frameDelta = (timing.frameTime - timing.lastTime) / 1000;

      // Don't keep callbacks that return false
      let callbacksToKeep = [];
      for (let callback of timing.callbacks) {
        if (callback(frameDelta) !== false) {
          callbacksToKeep.push(callback);
        }
      }
      timing.callbacks = callbacksToKeep;

      // Update the last frame time
      timing.lastTime = timing.frameTime;
    },

    // Register an update callback
    // callback: A function of the form callback(frameDelta). frameDelta will be in seconds.
    registerCallback: function (callback) {
      timing.callbacks.push(callback);
    },

    // Start the frame callback
    start: function () {
      setInterval(timing.update, 10);
    }
  };

  return timing;
});