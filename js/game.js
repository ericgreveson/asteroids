define(["jquery", "canvas", "collision", "input", "overlays", "ship", "asteroid"],
  function ($, canvas, collision, input, overlays, ship, asteroid) {
  // Game namespace
  var game = {
    // Game variables
    interval: null,
    startTime: new Date().getTime(),
    lastTime: new Date().getTime(),
    frameTime: new Date().getTime(),
    score: 0,
    lives: 3,
    asteroids: [],

    // Asteroid update
    // frameDelta: Time elapsed since previous frame, in seconds
    updateAsteroids: function (frameDelta) {
      // Maybe generate new asteroids
      var gameTime = (game.frameTime - game.startTime) / 1000;
      var desiredAsteroidCount = Math.min(Math.floor(gameTime), 30);
      while (game.asteroids.length < desiredAsteroidCount) {
        game.asteroids.push(asteroid.create(1.0));
      }

      // Update all asteroids
      var asteroidsToKeep = [];
      $.each(game.asteroids, function (index, ast) {
        asteroid.update(ast, frameDelta);

        // Kill those asteroids which are outside and going away from the visible space
        var kill = asteroid.testBeyondCanvas(ast);
        if (!kill) {
          // Collision-detect with all other asteroids in the preserve-list
          var asteroidsToDelete = [];
          $.each(asteroidsToKeep, function (index, otherAst) {
            var colliding = collision.detectSphereSphere(ast.pos, ast.radius, otherAst.pos, otherAst.radius);
            if (colliding) {
              // Break up both asteroids. Remove the existing other asteroid, and don't add this one
              asteroidsToDelete.push(index);
              kill = true;
            }
          });

          if (!kill) {
            asteroidsToKeep.push(ast);
          }
        }
      });
      game.asteroids = asteroidsToKeep;

      // Collision-detect with ship
      $.each(game.asteroids, function (index, ast) {
        if (collision.detectSphereSphere(ast.pos, ast.radius, ship.pos, ship.radius)) {
          // Oh dear. Blow up the ship.
          game.lives -= 1;

          // And remove this asteroid
          game.asteroids.splice(index, 1);
          return false;
        }
      });
    },

    // Interval handler
    update: function () {
      // Get frame start time
      game.frameTime = new Date().getTime();
      var frameDelta = (game.frameTime - game.lastTime) / 1000;

      // Update score
      game.score += frameDelta * 10;

      // Update ship state
      ship.update(frameDelta);

      // Update asteroid state
      game.updateAsteroids(frameDelta);

      // Clear canvas
      canvas.clear();

      // Draw the ship
      ship.draw();

      // Draw the asteroids
      $.each(game.asteroids, function (index, ast) {
        asteroid.draw(ast);
      });

      // Draw overlays
      overlays.draw(game.score, game.lives);

      // Update the last frame time
      game.lastTime = game.frameTime;
    },

    // Program entry point
    main: function () {
      // Set up input
      input.createKeyboardHandlers();

      // Start the timer
      setInterval(game.update, 20);
    },
  };

  return game;
});