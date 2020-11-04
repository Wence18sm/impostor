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


	this.lanzarSocketSrv = function(io,juego){
		var cli=this;
		io.on('connection',function(socket){		    
		    socket.on('crearPartida', function(nick,numero) {
		        console.log('usuario nick: '+nick+" crea partida numero: "+numero);
		        var usr=new modelo.Usuario(nick);
				var codigo=juego.crearPartida(numero,usr);
				socket.join(codigo);	        				
		       	cli.enviarRemitente(socket,"partidaCreada",{"codigo":codigo,"owner":nick});		        		        
		    });
		    /////
		    socket.on('unirAPartida', function(nick,codigo) {
		        //nick nulo o cadena vacia
				var res=juego.unirAPartida(codigo,nick);
				socket.join(codigo);
				var owner = juego.partidas[codigo].nickOwner;
				console.log('usuario nick: '+nick+" se une a la partida con el codigo: "+codigo);        				
		       	cli.enviarRemitente(socket,"unidoAPartida",{"codigo":codigo,"nick":nick});
		       	cli.enviarATodosMenosRemitente(socket,codigo,"nuevoJugador",{"nick":nick})		        		        
		    });
		    socket.on('iniciarPartida', function(nick,codigo) {
		        //Para pensar muy concienzudamente
		        //Controlar si nick es el owner de la partida -- se controla en la capa de negocio
		        //Contestar a todos mandandole la fase de la partida
		        //cli.enviarATodos(socket,codigo,"partidaIniciada",{"nick":nick})	
						        		        
		    });



		});
	};


}

module.exports.ServidorWS = ServidorWS;