/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

function lanzarJuego (){
  //cw.limpiar();
  game = new Phaser.Game(config);
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update // aqui se define todo
  }
};

//const game = new Phaser.Game(config);
  let game;// = new Phaser.Game(config);
  let cursors;
  let player;
  let player2;
  let jugadores=[];
  let showDebug = false;
  let camera;
  let worldLayer;
  let map;
  var crear;
  var recursos=[{frame:0,sprite:"ana"},{frame:3,sprite:"pepe"},{frame:6,sprite:"tom"},{frame:9,sprite:"rayo"}];


function preload() {
  this.load.image("tiles", "client/assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "client/assets/tilemaps/tuxemon-town.json");

  // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
  // the player animations (walking left, walking right, etc.) in one image. For more info see:
  //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
  // If you don't use an atlas, you can do the same thing with a spritesheet, see:
  //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
  //this.load.atlas("atlas", "client/assets/atlas/atlas.png", "client/assets/atlas/atlas.json");
  
  // cargar los sprites
    // solo de una hoja
  //this.load.spritesheet("gabe","client/assets/images/ch003.png",{frameWidth:32,frameHeight:32});
    // de varias hojas
  this.load.spritesheet("varios","client/assets/images/final2.png",{frameWidth:32,frameHeight:32});
  // repetir esto por cada personaje diferente  o usar una hoja con 10 caracteres diferentes.

}

function create() {
  crear=this;
  const map = crear.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
  // player = this.physics.add
  //   .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
  //   .setSize(30, 40)
  //   .setOffset(0, 24);

  //player = crear.physics.add.sprite(spawnPoint.x, spawnPoint.y,"gabe");
  player = crear.physics.add.sprite(spawnPoint.x, spawnPoint.y,"varios",recursos[0].frame);

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  crear.physics.add.collider(player, worldLayer);

  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  //const anims = this.anims;
  // anims.create({
  //   key: "misa-left-walk",
  //   frames: anims.generateFrameNames("atlas", {
  //     prefix: "misa-left-walk.",
  //     start: 0,
  //     end: 3,
  //     zeroPad: 3
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // });
  // anims.create({
  //   key: "misa-right-walk",
  //   frames: anims.generateFrameNames("atlas", {
  //     prefix: "misa-right-walk.",
  //     start: 0,
  //     end: 3,
  //     zeroPad: 3
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // });
  // anims.create({
  //   key: "misa-front-walk",
  //   frames: anims.generateFrameNames("atlas", {
  //     prefix: "misa-front-walk.",
  //     start: 0,
  //     end: 3,
  //     zeroPad: 3
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // });
  // anims.create({
  //   key: "misa-back-walk",
  //   frames: anims.generateFrameNames("atlas", {
  //     prefix: "misa-back-walk.",
  //     start: 0,
  //     end: 3,
  //     zeroPad: 3
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // });

  //let nombre = recursos[0].nombre;
  //Animaciones de Gabe
  // const anims = crear.anims;
  //     anims.create({
  //       key: "gabe-left-walk", //key: nombre+"left-walk",
  //       frames: anims.generateFrameNames("gabe", {//aqui iria varios
  //         //prefix: "misa-left-walk.",
  //         start: 8,
  //         end: 11,
  //         //zeroPad: 3
  //       }),
  //       //frameRate: 10,
  //       repeat: -1
  //     });
  //     anims.create({
  //       key: "gabe-right-walk",
  //       frames: anims.generateFrameNames("gabe", {
  //         //prefix: "misa-left-walk.",
  //         start: 12,
  //         end: 15,
  //         //zeroPad: 3
  //       }),
  //       //frameRate: 10,
  //       repeat: -1
  //     });
  //     anims.create({
  //       key: "gabe-front-walk",
  //       frames: anims.generateFrameNames("gabe", {
  //         //prefix: "misa-left-walk.",
  //         start: 0,
  //         end: 3,
  //         //zeroPad: 3
  //       }),
  //       //frameRate: 10,
  //       repeat: -1
  //     });
  //     anims.create({
  //       key: "gabe-back-walk",
  //       frames: anims.generateFrameNames("gabe", {
  //         //prefix: "misa-left-walk.",
  //         start: 4,
  //         end: 7,
  //         //zeroPad: 3
  //       }),
  //       //frameRate: 10,
  //       repeat: -1
  //     });


      //// animaciones de ana 
      const anims2 = crear.anims;
      anims2.create({
        key: "ana-left-walk",
        frames: anims2.generateFrameNames("varios", {
          start: 36,
          end: 38,
        }),
        repeat: -1
      });
      anims2.create({
        key: "ana-right-walk",
        frames: anims2.generateFrameNames("varios", {
          start: 12,
          end: 14,
        }),
        repeat: -1
      });
      anims2.create({
        key: "ana-front-walk",
        frames: anims2.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 24,
          end: 26,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims2.create({
        key: "ana-back-walk",
        frames: anims2.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 0,
          end: 2,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });


      //// animaciones de pepe
      const anims3 = crear.anims;
      anims3.create({
        key: "pepe-left-walk",
        frames: anims3.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 39,
          end: 41,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims3.create({
        key: "pepe-right-walk",
        frames: anims3.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 15,
          end: 17,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims3.create({
        key: "pepe-front-walk",
        frames: anims3.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 27,
          end: 29,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims3.create({
        key: "pepe-back-walk",
        frames: anims3.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 3,
          end: 5,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });

      /// animaciones de tom 
      const anims4 = crear.anims;
      anims4.create({
        key: "tom-left-walk",
        frames: anims4.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 39,
          end: 41,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims4.create({
        key: "tom-right-walk",
        frames: anims4.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 15,
          end: 17,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims4.create({
        key: "tom-front-walk",
        frames: anims4.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 27,
          end: 29,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims4.create({
        key: "tom-back-walk",
        frames: anims4.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 3,
          end: 5,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });

      //// animaciones de rayo

      const anims5 = crear.anims;
      anims5.create({
        key: "rayo-left-walk",
        frames: anims5.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 39,
          end: 41,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims5.create({
        key: "rayo-right-walk",
        frames: anims5.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 15,
          end: 17,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims5.create({
        key: "rayo-front-walk",
        frames: anims5.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 27,
          end: 29,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims5.create({
        key: "rayo-back-walk",
        frames: anims5.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 3,
          end: 5,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });


  // const camera = this.cameras.main;
  // camera.startFollow(player);
  // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  cursors = crear.input.keyboard.createCursorKeys();// le decimos que use el teclado
  lanzarJugador(ws.numJugador);
  ws.estoyDentro();

}

function lanzarJugador(numJugador){
    // player = crear.physics.add
    //   .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    //   .setSize(30, 40)
    //   .setOffset(0, 24);

    player = crear.physics.add.sprite(spawnPoint.x, spawnPoint.y,"varios",recursos[numJugador].frame);

    //player2 = crear.physics.add.sprite(spawnPoint.x+15, spawnPoint.y,"varios",3);
    
    //player.play("walk");
    
    // Watch the player and worldLayer for collisions, for the duration of the scene:
    crear.physics.add.collider(player, worldLayer);
    //crear.physics.add.collider(player2, worldLayer);

    camera = crear.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  }

  function lanzarJugadorRemoto(nick,numJugador){
    var frame = recursos[numJugador].frame;
    jugadores[nick]=crear.physics.add.sprite(spawnPoint.x+15*numJugador, spawnPoint.y,"varios",frame);   
    crear.physics.add.collider(jugadores[nick], worldLayer);
  }

  function moverRemoto(direccion,nick,numJugador){

      const speed = 175;

      var remoto = jugadores[nick];

      if(direccion=="left"){
        remoto.boconst speed = 175;dy.setVelocityX(-speed);
      }
  }

function update(time, delta) {
    
    const prevVelocity = player.body.velocity.clone();

    const nombre=recursos[ws.numJugador].nombre;

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);
    //player2.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
      ws.movimiento("left");
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
      player.anims.play(nombre+"-left-walk", true);
    } else if (cursors.right.isDown) {
      player.anims.play(nombre+"-right-walk", true);
    } else if (cursors.up.isDown) {
      player.anims.play(nombre+"-back-walk", true);
    } else if (cursors.down.isDown) {
      player.anims.play(nombre+"-front-walk", true);
    } else {
      player.anims.stop();

      // If we were moving, pick and idle frame to use
      // if (prevVelocity.x < 0) player.setTexture("gabe", "gabe-left-walk");
      // else if (prevVelocity.x > 0) player.setTexture("gabe", "gabe-right-walk");
      // else if (prevVelocity.y < 0) player.setTexture("gabe", "gabe-back-walk");
      // else if (prevVelocity.y > 0) player.setTexture("gabe", "gabe-front-walk");
    }
  }