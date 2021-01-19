function ClienteWS(){
	this.socket;
	this.nick;
	this.codigo;
	this.maximo;
	this.impostor=false;
	this.numJugador=undefined;
	this.estado;
	this.encargo;
	this.owner = false;


	//crear partida
	this.crearPartida = function(nick,numero){
		this.nick=nick;
		this.maximo = numero;
		this.socket.emit("crearPartida",nick,numero);//{"nick": nick, "num": num}
	}

	this.unirAPartida = function(nick,codigo){
		this.nick=nick;
		this.socket.emit("unirAPartida",nick,codigo);//{"nick": nick, "num": num}
	}

	this.iniciarPartida = function(){
		this.socket.emit("iniciarPartida",this.nick,this.codigo);
	}

	this.listaPartidasDisponibles = function(){
		this.socket.emit("listaDePartidasDisponibles");
	}
	this.listaPartidas = function(){
		this.socket.emit("listaDePartidas");
	}

	this.lanzarVotacion = function(){
		this.socket.emit('lanzarVotacion',this.nick,this.codigo)
	}
	this.saltarVoto = function(){
		this.socket.emit('saltarVoto',this.nick,this.codigo)
	}
	this.votar=function(sospechoso){
		this.socket.emit('votar',this.nick,this.codigo,sospechoso)
	}
	this.obtenerEncargo = function(){
		this.socket.emit('obtenerEncargo',this.nick,this.codigo)
	}

	this.estoyDentro = function(){
		this.socket.emit('estoyDentro',this.nick,this.codigo)
	}

	this.atacar = function(atacado){
		this.socket.emit('atacar',this.nick,this.codigo,atacado);
	}

	this.enterrarCiudadano = function(atacado){
		this.socket.emit('enterrar',this.codigo,atacado);
	}

	this.abandonarPartida = function(){
		this.socket.emit('abandonarPartida',this.nick,this.codigo);
	}

	this.movimiento=function(direccion,x,y){
		var datos = {nick:this.nick,codigo:this.codigo,numJugador:this.numJugador,direccion:direccion,x:x,y:y,estado:this.estado};
		this.socket.emit("movimiento",datos);
	}

	this.realizarTarea=function(){
		this.socket.emit("realizarTarea",this.nick,this.codigo);
	}

	this.console = function(msg){
		console.log(msg);
	}

	this.resetGame = function(){
		if(game){
			game.destroy();
		}
		resetVar();
	}

	this.reset = function(){
		this.codigo= undefined;
		this.numJugador=undefined;

		this.impostor = false;
		this.estado = undefined;
		this.encargo = undefined;
		this.owner = false;

		this.resetGame();

	}
	
	this.ini=function(){
		this.socket=io.connect();
		this.lanzarSocketSrv();
	}
	// servidor Ws dentro del cliente
	this.lanzarSocketSrv = function(){
		var cli= this; //debido a las funciones de callback el this se puede perder 

		this.socket.on('connect', function(){			
			console.log("conectado al servidor de WS");
		});
		//crear partida
		this.socket.on('partidaCreada',function(data){
			cli.codigo = data.codigo;
			cli.owner = true;
			//cli.estado = "vivo";
			console.log("Codigo partida: "+data.codigo);
			console.log("Propietario: "+data.owner);
			 if (data.codigo!='fallo'){
			 	cli.numJugador=0;
			 	cli.estado=="vivo";
			 	cw.mostrarEsperandoRival();
			 };
		});
		//Unir a partida 
		this.socket.on('unidoAPartida',function(data){
			cli.codigo = data.codigo;
			cli.maximo = data.maximo;
			cli.numJugador=data.numJugador;
			//cli.estado = "vivo";
			console.log(data);
			console.log("El usuario: "+data.nick+" se ha unido a la partida con el codigo: "+data.codigo);
			if (data.nick!=""){
			 	cw.mostrarEsperandoRival();
			}
		});
		this.socket.on('nuevoJugador',function(lista){
			//console.log(lista.nick+" se une a la partida");
			cw.mostrarListaJugadores(lista);
			//cli.iniciarPartida();//absurdo paco
		});

		this.socket.on('esperando',function(){
			console.log('Esperando a comenzar, se encuentra en la fase: '+fase);
		})

		this.socket.on('partidaIniciada',function(fase){
			console.log("La partida esta en fase: "+fase);
			cli.estado="vivo";
			cli.obtenerEncargo();
			cw.limpiar();
			cw.llamarAJuego();
			lanzarJuego();
		});
		this.socket.on('listaDePartidasDisponibles',function(lista){
			console.log(lista);
			if(!cli.codigo){
				cw.mostrarUnirAPartida(lista);
			}
			
		});
		this.socket.on('listaDePartidas',function(lista){
			console.log(lista);
		});
		this.socket.on('votacionLanzada',function(lista){
			votarOn = false;
			//report();
			cw.mostrarModalVotacion(lista);
			console.log(lista);
		});
		//final de la votacion
		//cuantos han votado
		this.socket.on('saltarVoto',function(data){
			console.log(data);
			//dibujarVotacion
			//modal en el que le inyecto enviarle la lisa
			//dibujarVotacion(lista)
		});
		this.socket.on('finalVotacion',function(data){

			votarOn = true;

			if(data.msg == undefined){
				cw.mostrarModalSaltarVotacion();
			}else{
				cw.mostrarModalMuerte(data.msg);

				if(data.elegido == cli.nick){
				cli.estado = "fantasma";
				}
			}
			
			
			console.log(data.fase);
		});

		this.socket.on('haVotado',function(data){
			console.log(data);
		});
		this.socket.on('recibirEncargo',function(data){
			console.log(data);
			cli.impostor=data.impostor;
			cli.encargo=data.encargo;
			if(data.impostor){
				//$('#avisarImpostor').modal("show");
				cw.mostrarModalSimple('Eres el impostor, el duendecillo dice que MATES a todos.');
				//crearColision();
			}else{
				cw.mostrarModalTarea(cli.encargo);
			}
		});

		this.socket.on('atacar',function(data){
			console.log(data.atacado+" ha sido atacado");
		});

		this.socket.on('dibujarRemoto',function(lista){
			console.log(lista);
			for(var i=0;i<lista.length;i++){
				if (lista[i].nick!=cli.nick){
					lanzarJugadorRemoto(lista[i].nick,lista[i].numJugador);
				}
			}
			crearColision();
		});

		this.socket.on('jugadorHaAbandonado',function(data){
			console.log(data.nick+" ha abandonado la partida con codigo "+data.codigo);
			quitarSprite(data.nick);
			cw.mostrarModalAbandonarPartida(data.nick);
		});

		this.socket.on('hasAbandonadoLaPartida',function(data){
			console.log(data.nick+" ha abandonado la partida con codigo "+data.codigo);
			cw.mostrarModalHeAbandonado(data.nick);
		});

		this.socket.on("moverRemoto",function(datos){
			mover(datos);
		});
		this.socket.on("muereInocente",function(atacado){
			console.log(atacado+" ha sido atacado");
			if(cli.nick==atacado){
				cli.estado="fantasma";
				cli.enterrarCiudadano(atacado);
			}
			//dibujarMuereInocente(atacado);
		});

		this.socket.on('enterrar',function(data){
			dibujarMuereInocente(data);
			cli.console(data);
		});

		this.socket.on("tareaRealizada",function(EstadoTarea){
			console.log("El estado de su tarea es: "+EstadoTarea);
			//tareasOn=true;
		});

		this.socket.on("porcentajeGlobal",function(Porcentaje){
			console.log("El estado de su partida para los ciudadanos es:"+Porcentaje);
			//cw.mostraBarraProgreso();
			//tareasOn=true;
		});

		this.socket.on('hasAtacado',function(fase){
				ataquesOn=true;
		});

		this.socket.on('final',function(data){
			finPartida(data);
		});

		this.socket.on('finalPartida',function(data){
			ataquesOn=false;
			finPartida(data);
			
		});



	}
	// El constructor del objeto lo llama:
	this.ini();

}
// no hace falta exporta = anarquia
var ws2,ws3,ws4;

function pruebasWS(){
	 ws2=new ClienteWS();
	 ws3=new ClienteWS();
	 ws4=new ClienteWS();

	ws2.unirAPartida("Juani",ws.codigo);
	ws3.unirAPartida("Juan",ws.codigo);
	ws4.unirAPartida("Juano",ws.codigo);

	//ws.iniciarPartida();
}

function encargos(){
	 ws.obtenerEncargo();
	 ws2.obtenerEncargo();
	 ws3.obtenerEncargo();
	 ws4.obtenerEncargo();
}

function saltarVotos(){
	 ws.saltarVoto();
	 ws2.saltarVoto();
	 ws3.saltarVoto();
	 ws4.saltarVoto();
}