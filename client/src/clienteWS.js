function ClienteWS(){
	this.socket;
	this.nick;
	this.codigo;

	//crear partida
	this.crearPartida = function(nick,numero){
		this.nick=nick;
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
		});
		//Unir a partida 
		this.socket.on('unidoAPartida',function(data){
			cli.codigo = data.codigo;
			console.log(data);
			console.log("El usuario: "+data.nick+" se ha unido a la partida con el codigo: "+data.codigo);
		});
		this.socket.on('nuevoJugador',function(data){
			console.log(data.nick+" se une a la partida");
			cli.iniciarPartida();//absurdo paco
		});
		this.socket.on('partidaIniciada',function(fase){
			console.log("La partida esta en fase: "+fase);
		});
		this.socket.on('listaDePartidasDisponibles',function(lista){
			console.log(lista);
		});
		this.socket.on('listaDePartidas',function(lista){
			console.log(lista);
		});

	}
	// El constructor del objeto lo llama:
	this.ini();

}
// no hace falta exporta = anarquia 
function pruebasWS(){
	var ws2=new ClienteWS();
	var ws3=new ClienteWS();
	var ws4=new ClienteWS();

	ws2.unirAPartida("Juani",ws.codigo);
	ws3.unirAPartida("Juan",ws.codigo);
	ws4.unirAPartida("Juano",ws.codigo);

	//ws.iniciarPartida();
}