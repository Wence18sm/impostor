var modelo = require("./modelo.js");

function ServidorWS(){

	this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }

    this.enviarATodos=function(io,nombre,mens,datos){
        io.sockets.in(nombre).emit(mens,datos);
    }
    this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
        socket.broadcast.to(nombre).emit(mens,datos)
    };

    this.enviarAUno=function(socket,mens,datos){
        socket.emit(mens,datos);
    }

	this.lanzarSocketSrv = function(io,juego){
		var cli=this;
		io.on('connection',function(socket){		    
		    socket.on('crearPartida', function(nick,numero) {
		        console.log('usuario nick: '+nick+" crea partida numero: "+numero);
		        var usr=new modelo.Usuario(nick);
				var codigo=juego.crearPartida(numero,nick);
				socket.join(codigo);	        				
		       	cli.enviarRemitente(socket,"partidaCreada",{"codigo":codigo,"owner":nick});		        		        
		    });
		    /////
		    socket.on('unirAPartida', function(nick,codigo) {
		        //nick nulo o cadena vacia
				var res=juego.unirAPartida(codigo,nick);
				socket.join(codigo);
				var maximo = juego.partidas[codigo].maximo;
				//var owner = juego.partidas[codigo].nickOwner;
				console.log('usuario nick: '+nick+" se une a la partida con el codigo: "+codigo);        				
		       	cli.enviarRemitente(socket,"unidoAPartida",{"codigo":codigo,"nick":nick,"maximo":maximo});
		       	cli.enviarATodosMenosRemitente(socket,codigo,"nuevoJugador",{"nick":nick})		        		        
		    });
		    socket.on('iniciarPartida', function(nick,codigo) {
		        //Para pensar muy concienzudamente
		        //Controlar si nick es el owner de la partida -- se controla en la capa de negocio
		        //Contestar a todos mandandole la fase de la partida
		        //cli.enviarATodos(socket,codigo,"partidaIniciada",{"nick":nick})
		        juego.iniciarPartida(nick,codigo);
		        var fase = juego.partidas[codigo].fase.nombre;
		        cli.enviarATodos(io,codigo,"partidaIniciada",fase);	
						        		        
		    });

		    socket.on('listaDePartidasDisponibles', function() {
		        var lista = juego.listaPartidasDisponibles();
		        cli.enviarRemitente(io,"listaDePartidasDisponibles",lista);	
						        		        
		    });
		    socket.on('listaDePartidas', function() {
		        var lista = juego.listaPartidas();
		        cli.enviarRemitente(io,"listaDePartidas",lista);	
						        		        
		    });

		    socket.on('lanzarVotacion', function(nick,codigo) {
		       juego.lanzarVotacion(nick,codigo);
		       var fase = juego.partidas[codigo].fase.nombre;
		       cli.enviarATodos(io,codigo,"votacionLanzada",fase);
		    });

		    socket.on('saltarVoto', function(nick,codigo) {
		    	var partida = juego.partidas[codigo];
		       juego.saltarVoto(nick,codigo);

		       if(partida.todosHanVotado()){
		       		//enviar a todos el mas votado
		       		var data={"elegido":partida.elegido,"fase":partida.fase.nombre}
		       		cli.enviarATodos(io,codigo,"finalVotacion",data);
		       }else{
		       		//enviar la lista de los que han votado
		       		cli.enviarATodos(io,codigo,"haVotado",partida.listaHanVotado());
		       }

		    });
		    socket.on('votar', function(nick,codigo,sospechoso) {
		    	var partida = juego.partidas[codigo];
		       juego.votar(nick,codigo,sospechoso);

		       if(partida.todosHanVotado()){
		       		//enviar a todos el mas votado
		       		var data={"elegido":partida.elegido,"fase":partida.fase.nombre}
		       		cli.enviarATodos(io,codigo,"finalVotacion",data);
		       }else{
		       		//enviar la lista de los que han votado
		       		cli.enviarATodos(io,codigo,"haVotado",partida.listaHanVotado());
		       }

		    });
		    socket.on('obtenerEncargo', function(nick,codigo) {
		     	cli.enviarRemitente(socket,"recibirEncargo",juego.obtenerEncargo(nick,codigo));
		    });

		    socket.on('atacar', function(nick,codigo,atacado) {
		    	var partida = juego.partidas[codigo];
		    	var fase = partida.fase.nombre;
		        juego.atacar(nick,codigo,atacado);
		     	cli.enviarRemitente(socket,"atacar",{"atacado":atacado});
		    });

		    socket.on('abandonarPartida', function(nick,codigo) {
		    	var partida = juego.partidas[codigo];
		    	
		        juego.abandonarPartida(nick,codigo);
		     	cli.enviarATodos(io,codigo,"abandonarPartida",{"nick":nick,"codigo":codigo});
		    });



		});
	};


}

module.exports.ServidorWS = ServidorWS;