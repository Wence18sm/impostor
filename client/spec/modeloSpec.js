describe("El juego del impostor", function() {
  var juego;
  var usr;
  // si le pones delante una x y pones xit ese text no se ejecuta.
  beforeEach(function() {
    juego = new Juego();
    usr = new Usuario("Pepe",juego);
  });

  it("El juego incialmente no tiene partidas", function() {
  	expect(Object.keys(juego.partidas).length).toEqual(0);
  	expect(usr.nick).toEqual("Pepe");
  	//el juego esta definido
  	expect(usr.juego).not.toBe(undefined);
  });

  it("El usuario Pepe crea una partida de 4 jugadores", function() {
  	var codigo = usr.crearPartida(4);
  	//comprobamos que el creador es el dueño de la partida
  	expect(juego.partidas[codigo].nickOwner).toEqual(usr.nick);
  	//comprobamos que el codigo este definido.
  	expect(codigo).not.toBe(undefined);
  	//comprobamos el nuemro maximo de jugadores 
  	expect(juego.partidas[codigo].maximo).toEqual(4);
  	//comprobamos que estamos en la fase incial
  	expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
  });

  it("Un usuario quiere unirse a la partida creada",function(){
  	
  	var codigo = usr.crearPartida(4);
  	expect(juego.partidas[codigo].maximo).toEqual(4);

  	juego.unirAPartida(codigo,"Jose");
  	expect(Object.keys(juego.partidas[codigo].usuarios).length).toEqual(2);

  	juego.unirAPartida(codigo,"Ana");
  	expect(Object.keys(juego.partidas[codigo].usuarios).length).toEqual(3);

  	juego.unirAPartida(codigo,"Luis");
  	expect(Object.keys(juego.partidas[codigo].usuarios).length).toEqual(4);


  });




})