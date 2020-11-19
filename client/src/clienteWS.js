function ClienteWS(){
	this.socket;
	this.nick;
	this.codigo;
	this.maximo;

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

	this.atacar = function(atacado){
		this.socket.emit('atacar',this.nick,this.codigo,atacado);
	}

	this.abandonarPartida = function(atacado){
		this.socket.emit('abandonarPartida',this.nick,this.codigo);
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
			console.log("codigo partida: "+data.codigo);
			console.log("propietario: "+data.owner);
			 if (data.codigo!='fallo'){
			 	cw.mostrarEsperandoRival();
			 };
		});
		//Unir a partida 
		this.socket.on('unidoAPartida',function(data){
			cli.codigo = data.codigo;
			cli.maximo = data.maximo;
			console.log(data);
			console.log("El usuario: "+data.nick+" se ha unido a la partida con el codigo: "+data.codigo);
			if (data.nick!=""){
			 	cw.mostrarEsperandoRival();
			 }
		});
		this.socket.on('nuevoJugador',function(data){
			console.log(data.nick+" se une a la partida");
			//cli.iniciarPartida();//absurdo paco
		});
		this.socket.on('partidaIniciada',function(fase){
			console.log("La partida esta en fase: "+fase);
		});
		this.socket.on('listaDePartidasDisponibles',function(lista){
			console.log(lista);
			cw.mostrarUnirAPartida(lista);
		});
		this.socket.on('listaDePartidas',function(lista){
			console.log(lista);
		});
		this.socket.on('votacionLanzada',function(data){
			console.log(data);
		});
		//final de la votacion
		//cuantos han votado
		this.socket.on('saltarVoto',function(data){
			console.log(data);
		});
		this.socket.on('finalVotacion',function(data){
			console.log(data);
		});
		this.socket.on('haVotado',function(data){
			console.log(data);
		});
		this.socket.on('recibirEncargo',function(data){
			console.log(data);
		});

		this.socket.on('atacar',function(data){
			console.log(data.atacado+" ha sido atacado");
		});
		this.socket.on('abandonarPartida',function(data){
			console.log(data.nick+" ha abandonado la partida con codigo "+data.codigo);
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