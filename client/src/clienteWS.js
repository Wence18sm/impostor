function ClienteWS(){
	this.socket;

	//crear partida
	this.crearPartida = function(nick,numero){
		this.socket.emit("crearPartida",nick,numero);//{"nick": nick, "num": num}
	}

	this.unirAPartida = function(nick,codigo){
		this.socket.emit("unirAPartida",nick,codigo);//{"nick": nick, "num": num}
	}

	this.iniciarPartida = function(nick,codigo){
		this.socket.emit("iniciarPartida",nick,codigo);
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
			console.log("codigo partida: "+data.codigo);
			console.log("propietario: "+data.owner);
		});
		//Unir a partida 
		this.socket.on('unidoAPartida',function(data){
			console.log(data);
			console.log("El usuario: "+data.nick+" se ha unido a la partida con el codigo: "+data.codigo);
		});
		this.socket.on('nuevoJugador',function(data){
			console.log(data.nick+" se une a la partida");
		});
		this.socket.on('partidaIniciada',function(data){
			console.log("La partida esta en fase: "data.fase);
		});

	}
	// El constructor del objeto lo llama:
	this.ini();

}
// no hace falta exporta = anarquia 