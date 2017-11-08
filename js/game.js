define(["jquery", "bullet", "canvas", "collision", "input", "overlays", "ship", "asteroid", "timing"],
function ($, bullet, canvas, collision, input, overlays, ship, asteroid, timing) {
  // Game namespace
  let game = {
    // Game variables
    cash: 0,
    lives: 3,
    level: 0,
    asteroids: [],

    // Fire rate is in bullets per second
    fireRate: 5,
    bullets: [],
    lastBulletCreatedTime: new Date().getTime(),

    // Level update
    // frameDelta: Time elapsed since previous frame, in seconds
    updateLevel: function (frameDelta) {
      // Do we need to progress to the next level?
      if (game.level == 0 || game.asteroids.length == 0) {
        // Level up
        game.level += 1;

        // Generate new asteroids
        let newAsteroidCount = 1 + game.level * 2;
        for (let i = 0; i < newAsteroidCount; ++i) {
          game.asteroids.push(asteroid.create(1.0));
        }
      }
    },

    // Asteroid update
    // frameDelta: Time elapsed since previous frame, in seconds
    updateAsteroids: function (frameDelta) {
      // Update all asteroids
      let asteroidsToKeep = [];
      for (let ast of game.asteroids) {
        asteroid.update(ast, frameDelta);

        // Kill those asteroids which are outside and going away from the visible space
        let kill = collision.testSphereBeyondCanvas(ast.pos, ast.radius, ast.speed);
        if (!kill) {
          // Collision-detect with all other asteroids in the preserve-list
          let asteroidsToDelete = [];
          $.each(asteroidsToKeep, function (index, otherAst) {
            let colliding = collision.detectSphereSphere(ast.pos, ast.radius, otherAst.pos, otherAst.radius);
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
      }
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

    // Bullet update
    // frameDelta: Time elapsed since previous frame, in seconds
    updateBullets: function (frameDelta) {
      if (input.keys.spaceBar.pressed) {
        // Check enough time has elapsed
        if ((timing.frameTime - game.lastBulletCreatedTime) / 1000 > 1.0 / game.fireRate) {
          game.bullets.push(bullet.create(ship.gunPosition(), ship.angle, ship.speed));
          game.lastBulletCreatedTime = timing.frameTime;
        }
      }

      // Update all bullets
      let bulletsToKeep = [];
      for (let blt of game.bullets) {
        bullet.update(blt, frameDelta);

        // Kill those bullets which are outside and going away from the visible space
        let killBullet = collision.testSphereBeyondCanvas(blt.pos, blt.radius, blt.speed);
        if (!killBullet) {
          // Collision-detect with all asteroids
          $.each(game.asteroids, function (index, ast) {
            let colliding = collision.detectSphereSphere(blt.pos, blt.radius, ast.pos, ast.radius);
            if (colliding) {
              // Kill bullet and asteroid
              killBullet = true;
              game.asteroids.splice(index, 1);
              return false;
            }
          });
        }

        if (!killBullet) {
          bulletsToKeep.push(blt);
        }
      }

      game.bullets = bulletsToKeep;
    },

    // Interval handler
    // frameDelta: Time in seconds since last update
    update: function (frameDelta) {
      // Update level
      game.updateLevel(frameDelta);

      // Update ship state
      ship.update(frameDelta);

      // Update asteroid state
      game.updateAsteroids(frameDelta);

      // Update bullet state
      game.updateBullets(frameDelta);

      // Clear canvas
      canvas.clear();

      // Draw the ship
      ship.draw();

      // Draw the asteroids
      for (let ast of game.asteroids) {
        asteroid.draw(ast);
      }

      // Draw the bullets
      for (let blt of game.bullets) {
        bullet.draw(blt);
      }

      // Draw overlays
      overlays.draw(game.cash, game.lives);
    },

    // Program entry point
    main: function () {
      // Set up input
      input.createKeyboardHandlers();

      // Register callbacks
      timing.registerCallback(game.update);

      // Start timers
      timing.start();
    },
  };

  return game;
});