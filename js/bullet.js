define(["canvas", "collision"], function (canvas, collision) {
  let bullet = {
    Bullet: class {
      // Constructor
      // pos: Position of the emitter {x, y}
      // angle: Angle of the emitter, in radians from +X axis
      // speed: Speed of the emitter {x, y}
      constructor(pos, angle, speed) {
        // Speed of a bullet (relative to emitter)
        let bulletRelativeSpeed = 200;
        let xSpeed = speed.x + Math.cos(angle) * bulletRelativeSpeed;
        let ySpeed = speed.y + Math.sin(angle) * bulletRelativeSpeed;

        // Initialize properties
        this.spawnTime = new Date().getTime();
        this.timeToLive = 1.2; // seconds
        this.radius = 3;
        this.color = "#00ff00";
        this.pos = {
          x: pos.x,
          y: pos.y
        }
        this.speed = {
          x: xSpeed,
          y: ySpeed
        };
      }

      // Draw this bullet
      draw() {
        canvas.context.fillStyle = this.color;
        canvas.context.beginPath();
        canvas.context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        canvas.context.fill();
      }

      // Update this bullet
      // frameDelta: Time since last frame, in seconds
      // return: true to keep this object, false to kill it
      update(frameDelta) {
        // Update positions
        this.pos.x += this.speed.x * frameDelta;
        this.pos.y += this.speed.y * frameDelta;

        // Wrap bullets around the canvas
        canvas.wrapCoord(this.pos);

        // Kill timed-out bullets
        return (new Date().getTime() - this.spawnTime < this.timeToLive * 1000);
      }
    }
  };

  return bullet;
});