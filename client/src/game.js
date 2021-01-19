

/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

function lanzarJuego(){
  game = new Phaser.Game(config);
}

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
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
      update: update
    }
  };

  let game;// = new Phaser.Game(config);
  let cursors;
  let player;
  //let player2;
  var jugadores={}; //la colección de jugadores remotos
  let showDebug = false;
  let camera;
  var worldLayer;
  var capaTareas;
  let map;
  var crear;
  var remotos;
  var muertos;
  var spawnPoint;
  var tareasOn = true;
  var ataquesOn = true;
  var votarOn = true;
  var final = false;
  var id;
  var recursos=[{frame:0,sprite:"ana"},{frame:3,sprite:"pepe"},{frame:6,sprite:"tom"},{frame:9,sprite:"rayo"},
                {frame:48,sprite:"mago"},{frame:51,sprite:"coletas"},{frame:54,sprite:"luchadora"},{frame:57,sprite:"luchador"}];

  function resetVar(){
       game = null;// = new Phaser.Game(config);
       cursors = null;
       player = null;
       player2 = null;
       jugadores={}; //la colección de jugadores remotos
       showDebug = false;
       camera = null;
       worldLayer = null;
       capaTareas = null;
       map = null;
       crear = null;
       remotos = null;
       muertos = null;
       spawnPoint = null;
       tareasOn = true;
       ataquesOn = true;
       votarOn = true;
       final = false;
       id = null;
  }

  function preload() {
    this.load.image("tiles", "client/assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "client/assets/tilemaps/tuxemon-town.json");

    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
    //this.load.atlas("atlas", "cliente/assets/atlas/atlas.png", "cliente/assets/atlas/atlas.json");

    //Sprites
    //this.load.spritesheet("gabe","cliente/assets/images/gabe.png",{frameWidth:24,frameHeight:24});
    //this.load.spritesheet("gabe","cliente/assets/images/male01-2.png",{frameWidth:32,frameHeight:32});
    this.load.spritesheet("varios","client/assets/images/final2.png",{frameWidth:24,frameHeight:32});
    this.load.spritesheet("tumba","client/assets/images/tumba.png",{frameWidth:32,frameHeight:64});
  }

  function create() {
    crear=this;
    map = crear.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    capaTareas = map.createStaticLayer("CapaTareas", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    capaTareas.setCollisionByProperty({ collides: true });

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

    // // Watch the player and worldLayer for collisions, for the duration of the scene:
    //this.physics.add.collider(player, worldLayer);

     const anims = crear.anims;
      anims.create({
        key: "gabe-left-walk",
        frames: anims.generateFrameNames("gabe", {
          //prefix: "misa-left-walk.",
          start: 3,
          end: 5,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims.create({
        key: "gabe-right-walk",
        frames: anims.generateFrameNames("gabe", {
          //prefix: "misa-left-walk.",
          start: 6,
          end: 8,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims.create({
        key: "gabe-front-walk",
        frames: anims.generateFrameNames("gabe", {
          //prefix: "misa-left-walk.",
          start: 0,
          end: 2,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims.create({
        key: "gabe-back-walk",
        frames: anims.generateFrameNames("gabe", {
          //prefix: "misa-left-walk.",
          start: 9,
          end: 11,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      /////////////////////
      //Primera animacion de varios
      ////////
      const anims2 = crear.anims;
      anims2.create({
        key: "ana-left-walk",
        frames: anims.generateFrameNames("varios", {
          start: 36,
          end: 38,
        }),
        repeat: -1
      });
      anims2.create({
        key: "ana-right-walk",
        frames: anims.generateFrameNames("varios", {
          start: 12,
          end: 14,
        }),
        repeat: -1
      });
      anims2.create({
        key: "ana-front-walk",
        frames: anims.generateFrameNames("varios", {
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
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 0,
          end: 2,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      ////////
      // Segunda animacion de varios
      ///////
      const anims3 = crear.anims;
      anims3.create({
        key: "pepe-left-walk",
        frames: anims.generateFrameNames("varios", {
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
        frames: anims.generateFrameNames("varios", {
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
        frames: anims.generateFrameNames("varios", {
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
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 3,
          end: 5,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      /////////////
      //Tercera animacion de varios
      ///////
    const anims4 = crear.anims;
      anims4.create({
        key: "tom-left-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 42,
          end: 44,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims4.create({
        key: "tom-right-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 18,
          end: 20,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims4.create({
        key: "tom-front-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 30,
          end: 32,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims4.create({
        key: "tom-back-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 6,
          end: 8,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      ////////////
      //Cuarta animacion de varios
      //
      const anims5 = crear.anims;
      anims5.create({
        key: "rayo-left-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 45,
          end: 47,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims5.create({
        key: "rayo-right-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 21,
          end: 23,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims5.create({
        key: "rayo-front-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 33,
          end: 35,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims5.create({
        key: "rayo-back-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 9,
          end: 11,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      ///////////////
      // Quinta animacion de varios
      const anims6 = crear.anims;
      anims6.create({
        key: "mago-left-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 84,
          end: 86,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims6.create({
        key: "mago-right-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 60,
          end: 62,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims6.create({
        key: "mago-front-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 72,
          end: 74,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims6.create({
        key: "mago-back-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 48,
          end: 50,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });

      ///////////////
      // Seis animacion de varios
      const anims7 = crear.anims;
      anims7.create({
        key: "coletas-left-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 87,
          end: 89,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims7.create({
        key: "coletas-right-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 63,
          end: 65,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims7.create({
        key: "coletas-front-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 75,
          end: 77,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims7.create({
        key: "coletas-back-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 51,
          end: 53,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });

      ///////////////
      // Septima animacion de varios
      const anims8 = crear.anims;
      anims8.create({
        key: "luchadora-left-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 90,
          end: 92,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims8.create({
        key: "luchadora-right-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 66,
          end: 68,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims8.create({
        key: "luchadora-front-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 78,
          end: 80,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims8.create({
        key: "luchadora-back-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 54,
          end: 56,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });

      ///////////////
      // Octava animacion de varios
      const anims9 = crear.anims;
      anims9.create({
        key: "luchador-left-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 93,
          end: 95,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims9.create({
        key: "luchador-right-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 69,
          end: 71,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims9.create({
        key: "luchador-front-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 81,
          end: 83,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });
      anims9.create({
        key: "luchador-back-walk",
        frames: anims.generateFrameNames("varios", {
          //prefix: "misa-left-walk.",
          start: 57,
          end: 59,
          //zeroPad: 3
        }),
        //frameRate: 10,
        repeat: -1
      });

    // const camera = this.cameras.main;
    // camera.startFollow(player);
    // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = crear.input.keyboard.createCursorKeys();
    remotos = crear.add.group();
    muertos= crear.add.group();
    teclaA=crear.input.keyboard.addKey('a');
    teclaV=crear.input.keyboard.addKey('v');
    teclaT=crear.input.keyboard.addKey('t');

    lanzarJugador(ws.nick,ws.numJugador);
    ws.estoyDentro();
  }

  function crearColision(){
    if(ws.impostor && crear){
      crear.physics.add.overlap(player,remotos,kill,()=>{return ataquesOn});
    }
  }

  function kill(sprite,inocente){
    //dibujar el sprite inocente muerto
    //avisar al servidor del ataque
    var nick = inocente.nick;
    
    if(teclaA.isDown){
      ataquesOn=false;
      ws.console("Estoy atacando a:"+nick);
      ws.atacar(nick);
    }
  }

  function dibujarMuereInocente(inocente){
    //añadir un sprite en la posicion del inocente
    //meter el sprite en un grupo de muertos(para gestionar la colision y poder lanzar la votacion)
    //crear la funcion que gestiona la colision de los vivos con los muertos.
    var x = jugadores[inocente].x;
    var y = jugadores[inocente].y;
    var numJugador= jugadores[inocente].numJugador;

    var muerto = crear.physics.add.sprite(x,y,"tumba",8); 
    //ws.console("He dibujado la tumba")
    muertos.add(muerto);

    crear.physics.add.overlap(player,muertos,votacion,()=>{return votarOn});
  }

  function votacion(sprite,muerto){
    //comprobar si e jugador local si pulsa la tecla de votacion por ejemplo la v
    //en ese caso, llamamos al servidor para lanzar la votacion
    if(teclaV.isDown){
      votarOn=false;
      ws.console("He lanzado la votacion");
      ws.lanzarVotacion();

    }
  }

  function report(){
    /*Esta funcion se encarga de eliminar todos las tumbas, 
      si se ha llamado ha reportar*/
    var i = 0;
    for(i=0;i<muertos.children.size;i++){
        muertos.children.entries[0].destroy();
      }
  }

  function tareas(sprite,objeto){
    //ver si el sprite local puede realizar la tarea
    //en tal caso, dibujar el modal de la tarea permitiendo realizarla
    //dibujar la tarea
    // cuando tenga los atributos en el tiled map -- ese if
    //objeto.nombre="jardines";
    if(ws.encargo==objeto.properties.tarea && teclaT.isDown){
    //if(ws.encargos==tareas.nombre){
       //console.log("Realizar tarea"+ws.encargo);
       tareasOn=false;
       ws.realizarTarea();
       cw.mostrarModalRealizarTarea(ws.encargo);
    }
  }

  function lanzarJugador(nick,numJugador){
    //var x =spawnPoint.x*numJugador*4+2;
    id = numJugador;

    player = crear.physics.add.sprite(spawnPoint.x, spawnPoint.y,"varios",recursos[id].frame);    
    // Watch the player and worldLayer for collisions, for the duration of the scene:
    crear.physics.add.collider(player, worldLayer);
    crear.physics.add.collider(player, capaTareas,tareas,()=>{return tareasOn});
    //crear.physics.add.collider(player2, worldLayer);
    jugadores[nick]=player;
    jugadores[nick].nick=nick;
    jugadores[nick].numJugador=numJugador;

    camera = crear.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  function lanzarJugadorRemoto(nick,numJugador){
    var frame=recursos[numJugador].frame;
    //var x =spawnPoint.x*numJugador*4+2;
    jugadores[nick]=crear.physics.add.sprite(spawnPoint.x, spawnPoint.y,"varios",frame);   
    crear.physics.add.collider(jugadores[nick], worldLayer);
    jugadores[nick].nick=nick;
    jugadores[nick].numJugador=numJugador;
    remotos.add(jugadores[nick]);
    
  }


  // function mover(nick,x,y){
  //   var remoto=jugadores[nick];
  //   if(remoto){
  //     remoto.setX(x);
  //     remoto.setY(y);
  //   }
    

  // }
  function mover(datos)
  {
     var direccion = datos.direccion;
     var nick = datos.nick;
     var numJugador = datos.numJugador;
     var x = datos.x;
     var y = datos.y;

    var remoto=jugadores[nick];
    const speed = 175;
    //const prevVelocity = player.body.velocity.clone();
    const nombre=recursos[numJugador].sprite;

   
   if (remoto){
    if (datos.estado != "abandonado" && (datos.estado!="fantasma" || ws.estado == "fantasma")) {

      remoto.body.setVelocity(0);
      remoto.setX(x);
      remoto.setY(y);
      remoto.body.velocity.normalize().scale(speed);
      if (direccion=="left") {
        remoto.anims.play(nombre+"-left-walk", true);
      } else if (direccion=="right") {
        remoto.anims.play(nombre+"-right-walk", true);
      } else if (direccion=="up") {
        remoto.anims.play(nombre+"-back-walk", true);
      } else if (direccion=="down") {
        remoto.anims.play(nombre+"-front-walk", true);
      } else {
        remoto.anims.stop();
      }
    }else{
      remoto.visible = false;
    }
  }
  }

  function quitarSprite(nick){

    jugadores[nick].destroy();

  }

  function finPartida (data){
    final=true;
    //cw.mostrarModalSimple("Fin de la partida "+ data);
    cw.mostrarFinalPartida("Fin de la partida: "+ data);
  }

  // function moverRemoto(direccion,nick,numJugador)
  // {
  //   const speed = 175;
  //   var remoto=jugadores[nick];

  //   if (direccion=="left"){
  //     remoto.body.setVelocityX(-speed);
  //   }
  // }

  function update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();
    var direccion="stop";

    
    //const nombre=recursos[ws.numJugador].sprite;
    const nombre = recursos[id].sprite;

    
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);
    //player2.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
      direccion="left";
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
      direccion="right";
    }
    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
      direccion="up";
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
      direccion="down";
    }
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
    
    ws.movimiento(direccion,player.x,player.y);

    //Update the animation last and give left/right animations precedence over up/down animations
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
    }

      // If we were moving, pick and idle frame to use
      // if (prevVelocity.x < 0) player.setTexture("gabe", "gabe-left-walk");
      // else if (prevVelocity.x > 0) player.setTexture("gabe", "gabe-right-walk");
      // else if (prevVelocity.y < 0) player.setTexture("gabe", "gabe-back-walk");
      // else if (prevVelocity.y > 0) player.setTexture("gabe", "gabe-front-walk");
    //}
  //}
  }