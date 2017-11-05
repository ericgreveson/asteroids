// Game namespace
var asteroid = {
  // Constants
  constants: {
    canvasId: "gameCanvas",
    keyCodeLeftArrow: 37,
    keyCodeUpArrow: 38,
    keyCodeRightArrow: 39,
    keyCodeDownArrow: 40,
    ship: {
      // Speed in canvas units per second
      maxSpeed: 200,
      // "Radius" of ship
      radius: 20
    },
    asteroids: {
      minRadius: 20,
      maxRadius: 100,
      minSpeed: {
        x: 100,
        y: -20
      },
      maxSpeed: {
        x: 300,
        y: 20
      }
    },
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
    }
  },

  // "Global" variables
  globals: {
    canvas: null,
    interval: null,
    startTime: new Date().getTime(),
    lastTime: new Date().getTime(),
    frameTime: new Date().getTime(),
    frameDelta: 0,
    keyState: {
      upArrow: false,
      downArrow: false
    },
    ship: {
      pos: {
        x: 100,
        y: 400
      },
      speed: {
        x: 0,
        y: 0
      }
    },
    asteroids: [],
    score: 0,
    lives: 3
  },

  // Draw spaceship
  // ctx: Canvas context to use
  drawShip: function (ctx) {
    var g = asteroid.globals;
    var r = asteroid.constants.ship.radius;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(g.ship.pos.x - r, g.ship.pos.y - r / 2, r * 2, r);
  },

  // Draw asteroid
  // ctx: Canvas context to use
  // ast: Asteroid to draw
  drawAsteroid: function (ctx, ast) {
    ctx.fillStyle = ast.color;
    ctx.beginPath();
    ctx.arc(ast.pos.x, ast.pos.y, ast.radius, 0, 2 * Math.PI);
    ctx.fill();
  },

  // Draw overlays
  // ctx: Canvas context to use
  drawOverlays: function (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "Bold 20px Arial";

    // Score
    ctx.fillText("Score: " + asteroid.globals.score.toFixed(), asteroid.constants.scoreText.pos.x, asteroid.constants.scoreText.pos.y);

    // Lives
    ctx.fillText("Lives: " + asteroid.globals.lives.toString(), asteroid.constants.livesText.pos.x, asteroid.constants.livesText.pos.y);
  },

  // Clear the canvas
  // ctx: Canvas context to use
  clear: function (ctx) {
    ctx.clearRect(0, 0, asteroid.globals.canvas.width, asteroid.globals.canvas.height);
  },

  // Ship update
  updateShip: function () {
    // Update vertical speed
    asteroid.globals.ship.speed.y = 0;

    if (asteroid.globals.keyState.upArrow) {
      asteroid.globals.ship.speed.y -= asteroid.constants.ship.maxSpeed;
    }

    if (asteroid.globals.keyState.downArrow) {
      asteroid.globals.ship.speed.y += asteroid.constants.ship.maxSpeed;
    }

    // Update position
    asteroid.globals.ship.pos.x += asteroid.globals.ship.speed.x * asteroid.globals.frameDelta;
    asteroid.globals.ship.pos.y += asteroid.globals.ship.speed.y * asteroid.globals.frameDelta;

    // Clamp Y values
    if (asteroid.globals.ship.pos.y < asteroid.constants.ship.radius) {
      asteroid.globals.ship.pos.y = asteroid.constants.ship.radius;
    }

    if (asteroid.globals.ship.pos.y > asteroid.globals.canvas.height - asteroid.constants.ship.radius) {
      asteroid.globals.ship.pos.y = asteroid.globals.canvas.height - asteroid.constants.ship.radius;
    }
  },

  // Generate asteroid
  // scale: Asteroid scale
  // return: New asteroid object
  createAsteroid: function (scale) {
    // Create asteroid
    var ac = asteroid.constants.asteroids;
    var radius = scale * ac.minRadius * (1 + Math.random() * (ac.maxRadius / ac.minRadius - 1));
    var xPos = asteroid.globals.canvas.width + radius;
    var yPos = Math.random() * asteroid.globals.canvas.height;
    var xSpeed = -(ac.minSpeed.x + Math.random() * (ac.maxSpeed.x - ac.minSpeed.x));
    var ySpeed = -(ac.minSpeed.y + Math.random() * (ac.maxSpeed.y - ac.minSpeed.y));

    return {
      color: "#ff00ff",
      radius: radius,
      pos: {
        x: xPos,
        y: yPos
      },
      speed: {
        x: xSpeed,
        y: ySpeed
      }
    };
  },

  // Test if asteroid is beyond canvas
  // ast: Asteroid to test
  // return: True if beyond, false otherwise
  asteroidBeyondCanvas: function (ast) {
    // left edge test
    if (ast.speed.x <= 0 && (ast.pos.x + ast.radius) < 0) {
      return true;
    }

    // right edge test
    if (ast.speed.x >= 0 && (ast.pos.x - ast.radius) > asteroid.globals.canvas.width) {
      return true;
    }

    // top edge test
    if (ast.speed.y <= 0 && (ast.pos.y + ast.radius) < 0) {
      return true;
    }

    // bottom edge test
    if (ast.speed.y >= 0 && (ast.pos.y - ast.radius) > asteroid.globals.canvas.height) {
      return true;
    }

    return false;
  },

  // Collision detection
  // pos1: {x, y} of first object
  // radius1: radius of first object
  // pos1: {x, y} of second object
  // radius1: radius of second object
  // return: true if colliding, false otherwise
  collisionDetect: function (pos1, radius1, pos2, radius2) {
    var dx = pos2.x - pos1.x;
    var dy = pos2.y - pos1.y;
    var distSquared = dx * dx + dy * dy;
    var sumRadius = radius1 + radius2;
    return distSquared < sumRadius * sumRadius;
  },

  // Asteroid update
  updateAsteroids: function () {
    // Maybe generate new asteroids
    var gameTime = (asteroid.globals.frameTime - asteroid.globals.startTime) / 1000;
    var desiredAsteroidCount = Math.min(Math.floor(gameTime), 30);
    while (asteroid.globals.asteroids.length < desiredAsteroidCount) {
      asteroid.globals.asteroids.push(asteroid.createAsteroid(1.0));
    }

    // Update all asteroids
    var asteroidsToKeep = [];
    $.each(asteroid.globals.asteroids, function (index, ast) {
      // Update positions
      ast.pos.x += ast.speed.x * asteroid.globals.frameDelta;
      ast.pos.y += ast.speed.y * asteroid.globals.frameDelta;

      // Kill those asteroids which are outside and going away from the visible space
      var kill = asteroid.asteroidBeyondCanvas(ast);
      if (!kill) {
        // Collision-detect with all other asteroids in the preserve-list
        var asteroidsToDelete = [];
        $.each(asteroidsToKeep, function (index, otherAst) {
          var colliding = asteroid.collisionDetect(ast.pos, ast.radius, otherAst.pos, otherAst.radius);
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
    asteroid.globals.asteroids = asteroidsToKeep;

    // Collision-detect with ship
    $.each(asteroid.globals.asteroids, function (index, ast) {
      if (asteroid.collisionDetect(ast.pos, ast.radius, asteroid.globals.ship.pos, asteroid.constants.ship.radius)) {
        // Oh dear. Blow up the ship.
        asteroid.globals.lives -= 1;

        // And remove this asteroid
        asteroid.globals.asteroids.splice(index, 1);
        return false;
      }
    });
  },

  // Interval handler
  update: function () {
    // Get frame start time
    asteroid.globals.frameTime = new Date().getTime();
    asteroid.globals.frameDelta = (asteroid.globals.frameTime - asteroid.globals.lastTime) / 1000;

    // Update score
    asteroid.globals.score += asteroid.globals.frameDelta * 10;

    // Update ship state
    asteroid.updateShip();

    // Update asteroid state
    asteroid.updateAsteroids();

    // Clear canvas
    var ctx = asteroid.globals.canvas.getContext("2d");
    asteroid.clear(ctx);

    // Draw the ship
    asteroid.drawShip(ctx);

    // Draw the asteroids
    $.each(asteroid.globals.asteroids, function (index, ast) {
      asteroid.drawAsteroid(ctx, ast);
    });

    // Draw overlays
    asteroid.drawOverlays(ctx);

    // Update the last frame time
    asteroid.globals.lastTime = asteroid.globals.frameTime;
  },

  // Create keyboard handlers
  createKeyboardHandlers: function () {
    // Key down handlers
    $(document).keydown(function (event) {
      if (event.which == asteroid.constants.keyCodeUpArrow) {
        asteroid.globals.keyState.upArrow = true;
        event.preventDefault();
      } else if (event.which == asteroid.constants.keyCodeDownArrow) {
        asteroid.globals.keyState.downArrow = true;
        event.preventDefault();
      }
    });

    // Key up handlers
    $(document).keyup(function (event) {
      if (event.which == asteroid.constants.keyCodeUpArrow) {
        asteroid.globals.keyState.upArrow = false;
        event.preventDefault();
      } else if (event.which == asteroid.constants.keyCodeDownArrow) {
        asteroid.globals.keyState.downArrow = false;
        event.preventDefault();
      }
    });
  },

  // Program entry point
  main: function () {
    // Grab the canvas element
    asteroid.globals.canvas = document.getElementById(asteroid.constants.canvasId);

    // Set up input
    asteroid.createKeyboardHandlers();

    // Start the timer
    setInterval(asteroid.update, 20);
  },
};

// Start the whole thing up
$(document).ready(function () {
  asteroid.main();
});