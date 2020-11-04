//
// ---------------------------------------	PRUEBAS DE CODIGO -------------------------------------------
// 
//Mediante Jasmine 3.6.0
//
describe("El juego del impostor", function() {
  var juego;
  var usr;

  beforeEach(function() {
  	juego=new Juego();
  	usr=new Usuario("Pepe",juego);
  });

  it("Comprobar valores iniciales del juego", function() {
  	//Si no hay partidas, el array asociativo debe de ser 0
  	expect(Object.keys(juego.partidas).length).toEqual(0);
  	//El nombre de usuario es el que hemos implementado
  	expect(usr.nick).toEqual("Pepe");
  	//El juego esta definido
  	expect(usr.juego).not.toBe(undefined);
  });

  describe("El usr Pepe crea una partida de 4 jugadores",function(){
	var codigo;
	beforeEach(function() {
		//Creamos la partida
	  	codigo=usr.crearPartida(4);
	  });

	it("Se comprueba la partida",function(){ 
		//se comprueba si la partida esta definida	
	  	expect(codigo).not.toBe(undefined);
	  	//Se comprueba que el owner de la partida es su creador
	  	expect(juego.partidas[codigo].nickOwner).toEqual(usr.nick);
	  	//se comprueba el maximo que le hemos puesto a la partida (Condicion)
	  	expect(juego.partidas[codigo].maximo).toEqual(4);
	  	//se comprueba que al crearla esta en fase Inicial
	  	expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
	  	//se comprueba que cuando se crea y no se une nadie, solo debe de estar en owner en la partida
	 	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(1);
	  });

	it("Varios usuarios se unen a la partida",function(){
		//unimos a un usuario a la partida
		//Comprobamos el numero de usuarios 
		//Como no se ha llegado al maximo debe de estar en fase Inicial
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		//unimos a un usuario a la partida
		//Comprobamos el numero de usuarios 
		//Como no se ha llegado al maximo debe de estar en fase Inicial
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		//unimos a un usuario a la partida
		//Comprobamos el numero de usuarios 
		//Como se ha llegado al maximo debe de estar en fase Completado  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");
	  });

	it("Pepe inicia la partida",function(){
		//Igual que la prueba anterior, excepto porque aqui se inicia la partida.
		//Misma secuencia + Iniciar partida.
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
	})

	it("Un jugador quiere abandonar la partida",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Abandonar la partida
		juego.partidas[codigo].abandonarPartida("tomas");
		var num=Object.keys(juego.partidas[codigo].usuarios).length;
		expect(num).toEqual(3);

	})

	it("Un jugador quiere abandonar la partida si estar iniciada y se elimina la partida",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		//usr.iniciarPartida();
		//expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Abandonar la partida
		juego.partidas[codigo].abandonarPartida("tomas");
		var num=Object.keys(juego.partidas[codigo].usuarios).length;
		expect(num).toEqual(3);

		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.partidas[codigo].abandonarPartida("ana");
		juego.partidas[codigo].abandonarPartida("isa");
		juego.partidas[codigo].abandonarPartida("Pepe");

		juego.eliminarPartida(codigo);
		expect(juego.partidas[codigo]).toBe(undefined);


	})

	it("Se quiere asignar un impostor",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Comprobamos que hay un impostor mediante una funcion auxiliar
		var impostor = juego.partidas[codigo].tenemosUnImpostor();
		expect(impostor).toEqual(true);
	})

	it("Se quiere comprobar que se han asignado las tareas",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Comprobamos que se han asignado las tareas.
		for(var usu in juego.partidas[codigo].usuarios){
			expect(juego.partidas[codigo].usuarios[usu].encargo).not.toBe(undefined);
		}

	})

	it("No se puede crear un partida si el numero de jugadores no esta dentro del limite",function(){
		var codigo=juego.crearPartida(3,usr);
		expect(codigo).toEqual("fallo");

		codigo=juego.crearPartida(11,usr);
		expect(codigo).toEqual("fallo");
	})

	it("Un Impostor ataca a un ciudadano",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Un impostor ataca a un ciudadano.
		impostor = juego.partidas[codigo].usuarioEsImpostor();
		impostor.jugadorAtacaA("tomas");
		expect(juego.partidas[codigo].usuarios["tomas"].estado.nombre).toEqual("fantasma");
	});

	it("Un usuario realiza una votacion, vota a otro",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//tendremos que pasar a fasse votacion 

		juego.partidas[codigo].usuarios["tomas"].lanzarVotacion();
		expect(juego.partidas[codigo].fase.nombre).toEqual("votacion");

		//Comprobamos que un jugador no tiene votos
		numT = juego.partidas[codigo].usuarios["tomas"].votos;
		expect(numT).toEqual(0);
		//votamos a un jugador
		juego.partidas[codigo].usuarios["tomas"].votarJugador("ana");
		numVotos = juego.partidas[codigo].usuarios["ana"].votos;
		expect(numVotos).toEqual(1);
		//Comprobamos que Tomas ha votado
		expect(juego.partidas[codigo].usuarios["tomas"].haVotado).toEqual(true);

	});

	it("Un usuario vota skip",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//tendremos que pasar a fasse votacion 
		juego.partidas[codigo].usuarios["tomas"].lanzarVotacion();
		expect(juego.partidas[codigo].fase.nombre).toEqual("votacion");
		//Se vota skip
		juego.partidas[codigo].usuarios["ana"].votarJugador("skip");
		numSkip = juego.partidas[codigo].skip;
		expect(numSkip).toEqual(1);

		expect(juego.partidas[codigo].usuarios["ana"].haVotado).toEqual(true);
	});



   });
})
