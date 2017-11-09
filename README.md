# asteroids
HTML5 game experiment

# Notes on compatibility
I'm assuming ECMAScript 2015 compatibility. It might not work on some browsers. Can always compile using babel or something if need be.

# Idea list
Some things that might work:

* Materials might support some kind of mining mechanic in future (with resource acquisition / trading perhaps)
* Asteroids, ships, and bullets can collide. They could bounce (coeff of restitution?) or split, or be destroyed
* Give asteroids a "health" (dependent on initial mass / radius / material?) which is reduced in collisions
* Should you be able to shoot yourself (given powerful enough engines etc)
* Bullets and ships should have material / mass etc, like asteroids.
* Bullets probably shouldn't bounce, but imagine if a laser-type weapon was supported: maybe mirrors / diamond / ice asteroids etc for an interesting weaponry mechanic?
* Get rid of score and use money as a principal counter instead
* Allow purchase of upgrades: weapons, shields, targeting computers, AI firing control, AI ship control, thrusters, ...
* Storyline: why do you get money for shooting asteroids? Maybe you don't initially, you have to gain enough "reputation" before someone gives you a paid asteroid-clearance gig
* Ship repair: allow the ship to break down (collisions / overheating / random chance / whatever) and allow player to repair it (money / effort / mini-game)
* For a repair mini-game: you ship could have a procedurally generated schematic diagram (function of chance, ship type and upgrades) and some parameters like coolant pressure, coolant temperature, cabin pressure, oxygen level, CO2 level, even broken valves in pipes, corrupt computer code, etc.
* This could be shown at the same time as you fly around, but you have to diagnose the problem based on the schematic and value read-outs, and fix it by e.g. selecting appropriate tools and clicking in the right places.
* Maybe you can hire engineers to repair the ship while you're flying - or dock at spaceports to give you time to repair it yourself - or hire a pilot (or autopilot AI) to fly the ship while you do the engineering jobs
* Could even require you to buy spare parts (and / or have an inventory of such things on your ship)
* Allow you to hire a squad of other pilots + ships who are AI controlled and fly around helping you out. Problem: doesn't scale much on small screen.
* Solution: add another "zoomed out" squad mode once you have more than 1 or 2 automatically-flying ships, with more asteroids and bigger maps with more stuff to do collaboratively
* Another level of conceptual zooming out: could have a spaceship business empire where you have to develop technologies and hire / fire your pilots, engineers and researchers to take part in bigger missions or battles
* Enemy ships! Could be other corporations, pirates, military etc. Can you pay the shadier ones to join your side? Or can your pilots defect to them?
* Maybe some of the pilots you hire are secret agents for the government and will turn on you at inopportune times
* Maybe you could run for office once you have enough reputation / money and become part of the government!
* Instead of lives, you could have escape pods (and buy more) that get jettisoned from your ship and you have to wait for someone to rescue you. If you're unlucky, you get obliterated by an asteroid before this happens
* Possible limited (or recharging) fuel mechanic? If you mine certain asteroids you could get more rocket fuel.
* Gravity (not sure how, scales are a bit wrong for this)
* Flying into the interior of a large asteroid (maybe in a zoomed-out view)?
* Sweary mode to increase storyline amusement value (over 18s only - see TD2192 for example)
* Graphics: different renderers, like vector / raster (bitmap graphics) / WebGL (nicely lit 3D graphics). More of a long term project...
* Levels: after killing asteroids, or within a certain period of time, more asteroids come along, so you can't hang about too long
* Background moving starfield, to make your eyes go funny

Done:
* Give asteroids a material, defining their color, density and so on
* Bullets wrap around and have a time-to-live