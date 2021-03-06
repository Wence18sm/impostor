//
// ---------------------------------------	PRUEBAS DE CODIGO -------------------------------------------
// 
//Mediante Jasmine 3.6.0
//
var modelo= require("./modelo.js");
////
describe("El juego del impostor", function() {
  var juego;
  var usr;
  var nick;

  beforeEach(function() {
  	juego=new modelo.Juego(4);
  	//usr=new modelo.Usuario("Pepe",juego);
  	nick = "Pepe"
  });

  it("Comprobar valores iniciales del juego", function() {
  	//Si no hay partidas, el array asociativo debe de ser 0
  	expect(Object.keys(juego.partidas).length).toEqual(0);
  	//El nombre de usuario es el que hemos implementado
  	expect(nick).toEqual("Pepe");
  	//El juego esta definido
  	expect(juego).not.toBe(undefined);
  });

  describe("El usr Pepe crea una partida de 4 jugadores",function(){
	var codigo;
	beforeEach(function() {
		//Creamos la partida
	  	codigo=juego.crearPartida(4,nick);
	  });

	it("Se comprueba la partida",function(){ 
		//se comprueba si la partida esta definida	
	  	expect(codigo).not.toBe(undefined);
	  	//Se comprueba que el owner de la partida es su creador
	  	expect(juego.partidas[codigo].nickOwner).toEqual(nick);
	  	//se comprueba el maximo que le hemos puesto a la partida (Condicion)
	  	expect(juego.partidas[codigo].maximo).toEqual(4);
	  	//se comprueba que cuando se crea y no se une nadie, solo debe de estar en owner en la partida
	 	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(1);
	  	//se comprueba que al crearla esta en fase Inicial
	  	expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
	  
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
		//usr.iniciarPartida();
		juego.iniciarPartida(nick,codigo);
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
		//usr.iniciarPartida();
		juego.iniciarPartida(nick,codigo);
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
		//usr.iniciarPartida();
		juego.iniciarPartida(nick,codigo);
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
		//usr.iniciarPartida();
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Comprobamos que se han asignado las tareas.
		for(var usu in juego.partidas[codigo].usuarios){
			expect(juego.partidas[codigo].usuarios[usu].encargo).not.toBe(undefined);
		}

	})

	it("No se puede crear un partida si el numero de jugadores no esta dentro del limite",function(){
		var codigo=juego.crearPartida(3,nick);
		expect(codigo).toEqual("fallo");

		codigo=juego.crearPartida(11,nick);
		expect(codigo).toEqual("fallo");
	})

	it("Un Impostor ataca a un ciudadano",function(){
		var partida = juego.partidas[codigo];
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
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//Un impostor ataca a un ciudadano.

		partida.usuarios["ana"].impostor= true;
		partida.usuarios["tomas"].impostor= false;

		impostor = partida.usuarios["ana"];
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
		//usr.iniciarPartida();
		juego.iniciarPartida(nick,codigo);
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
		//Se vota skip
		juego.partidas[codigo].usuarios["ana"].votarJugador("skip");
		numSkip = juego.partidas[codigo].skip;
		expect(numSkip).toEqual(1);

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
		//usr.iniciarPartida();
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		//tendremos que pasar a fasse votacion 
		juego.partidas[codigo].usuarios["tomas"].lanzarVotacion();
		expect(juego.partidas[codigo].fase.nombre).toEqual("votacion");
		//Se vota skip
		juego.partidas[codigo].usuarios["ana"].votarJugador("skip");
		numSkip = juego.partidas[codigo].skip;
		expect(numSkip).toEqual(1);
	});


	describe("Votaciones, tareas, ataque y comprobacion de finales",function(){
		beforeEach(function(){
			juego.unirAPartida(codigo,"ana");
			juego.unirAPartida(codigo,"isa");
			juego.unirAPartida(codigo,"tomas");
			juego.iniciarPartida(nick,codigo);
	  });

		it("Todos los usuarios realizan las tareas menos uno",function(){
			//iniciar la partida
			//ajustar a mano el impostor
			//atacar y comprobar 
			var partida = juego.partidas[codigo];

			for (var i=0;i<9;i++){
				for(var key in partida.usuarios){
					partida.usuarios[key].realizarTarea();
				}

			expect(partida.fase.nombre).toEqual("jugando");
			}

		});

		it("Impostor ataca y muere un inocente",function(){
			//iniciar la partida
			//ajustar a mano el impostor
			//atacar y comprobar 
			var partida = juego.partidas[codigo];

			partida.usuarios[nick].impostor= true;
			partida.usuarios["ana"].impostor= false;
			partida.usuarios["isa"].impostor= false;
			partida.usuarios["tomas"].impostor= false;

			expect(partida.fase.nombre).toEqual("jugando");

			juego.atacar(nick,codigo,"ana");
			//aqui muere ana
			expect(partida.usuarios["ana"].estado.nombre).toEqual("fantasma");
			expect(partida.fase.nombre).toEqual("jugando");

		});

		it("Se vota y mata a un inocente",function(){
			var partida = juego.partidas[codigo];
			juego.lanzarVotacion(nick,codigo);
			partida.usuarios[nick].impostor= true;
			partida.usuarios["ana"].impostor= false;
			partida.usuarios["isa"].impostor= false;
			partida.usuarios["tomas"].impostor= false;
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar(nick,codigo,"tomas");
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar("ana",codigo,"tomas");
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar("isa",codigo,"tomas");
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar("tomas",codigo,"isa");
			expect(partida.usuarios["tomas"].estado.nombre).toEqual("fantasma");
			expect(partida.fase.nombre).toEqual("jugando");
		});

		it("Todos skipean",function(){
			var partida = juego.partidas[codigo];
			juego.lanzarVotacion(nick,codigo);
			expect(partida.fase.nombre).toEqual("votacion");
			juego.saltarVoto(nick,codigo);
			expect(partida.fase.nombre).toEqual("votacion");
			juego.saltarVoto("ana",codigo);
			expect(partida.fase.nombre).toEqual("votacion");
			juego.saltarVoto("isa",codigo);
			expect(partida.fase.nombre).toEqual("votacion");
			juego.saltarVoto("tomas",codigo);
			expect(partida.fase.nombre).toEqual("jugando");
		});

		

		it("Se vota y se mata al impostor (comprobacion final ganan ciudadanos)",function(){
			var partida = juego.partidas[codigo];
			juego.lanzarVotacion(nick,codigo);
			partida.usuarios[nick].impostor= true;
			partida.usuarios["ana"].impostor= false;
			partida.usuarios["isa"].impostor= false;
			partida.usuarios["tomas"].impostor= false;
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar(nick,codigo,"tomas");
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar("ana",codigo,nick);
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar("isa",codigo,nick);
			expect(partida.fase.nombre).toEqual("votacion");
			juego.votar("tomas",codigo,nick);
			expect(partida.usuarios[nick].estado.nombre).toEqual("fantasma");
			expect(partida.fase.nombre).toEqual("final");
		});

		it("Impostor ataca y mata a todos los inicentes menos uno (comprobacion final gana impostor)",function(){
			//iniciar la partida
			//ajustar a mano el impostor
			//atacar y comprobar 
			var partida = juego.partidas[codigo];

			partida.usuarios[nick].impostor= true;
			partida.usuarios["ana"].impostor= false;
			partida.usuarios["isa"].impostor= false;
			partida.usuarios["tomas"].impostor= false;

			expect(partida.fase.nombre).toEqual("jugando");

			juego.atacar(nick,codigo,"ana");
			//aqui muere ana
			expect(partida.usuarios["ana"].estado.nombre).toEqual("fantasma");
			expect(partida.fase.nombre).toEqual("jugando");

			juego.atacar(nick,codigo,"isa");
			//aqui muere ana
			expect(partida.usuarios["isa"].estado.nombre).toEqual("fantasma");
			expect(partida.fase.nombre).toEqual("final");
		});

		it("Todos los usuarios realizan las tareas (comprobacion final ciudadanos)",function(){
			//iniciar la partida
			//ajustar a mano el impostor
			//atacar y comprobar 
			var partida = juego.partidas[codigo];

			for (var i=0;i<9;i++){
				for(var key in partida.usuarios){
					partida.usuarios[key].realizarTarea();
				}

			expect(partida.fase.nombre).toEqual("jugando");
			}
			for(var key in partida.usuarios){
					partida.usuarios[key].realizarTarea();
				}
			expect(partida.fase.nombre).toEqual("final");

		});

	});
});
})