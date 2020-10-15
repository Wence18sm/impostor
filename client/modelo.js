///////////////////// EL JUEGO DEL IMPOSTOR /////////////////////////////

////////////////////
// JUEGO
///////////////////
function Juego() {
	this.partidas = {};//que colleccion --> hemos decidido un array asociativo/ diccionario
	this.crearPartida = function(num,owner){

		//generar un codigo de 6 letras aleatorio
		let codigo= this.obtenerCodigo();
		//comprobar que no se usa
		if (!this.partidas[codigo]){
			this.partidas[codigo] = new Partida(num,owner.nick);
			owner.partida = this.partidas[codigo];
		}
		return codigo;

		//crear el objeto partida: num owner

		//asignar la partida 
		//this.partidas[codigo] = nueva partida
	}
	this.unirAPartida = function(codigoPartida,nick){
		if (this.partidas[codigoPartida]){
			this.partidas[codigoPartida].agregarUsuario(nick);
		}

	}
	//obtenemos el codigo de la partida
	this.obtenerCodigo = function(){
		let cadena = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras = cadena.split('');
		let maxCadena = cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}
}
//////////////////////////////
//// PARTIDA
/////////////////////////////
function Partida(num,owner){
	this.maximo = num;
	this.nickOwner= owner;
	this.fase = new Inicial();
	this.usuarios = {};//el index 0 sera el owner
	//this.usuarios ={}; //version diccionario

	this.agregarUsuario = function(nick){
			this.fase.agregarUsuario(nick,this);
	}


	this.puedeAgregarUsuario = function(nick){
		//ToDo
		//cmprobar el nick unico 
		//comprobar si el usuario n (el tope) el maximo
		let nuevo= nick;
		let cont = 1;
		//comprobamos que no supera el maximo de usuarios
	
		while(this.usuarios[nuevo]){
			nuevo = nick+cont;
			cont = cont + 1;
		}
		this.usuarios[nuevo] = new Usuario(nuevo);

		this.comprobarMinimo();
	}

	this.comprobarMinimo = function(){
		return Object.keys(this.usuarios).length >= 4;
	}

	this.comprobarMaximo = function(){
		return Object.keys(this.usuarios).length <= this.maximo; 
	}

	this.iniciarPartida = function (){
		this.fase.iniciarPartida(this);
	}

	this.abandonarPartida = function(nick){
		this.fase.abandonarPartida(nick,this);

	}
	this.eliminarUsuario = function(nick){
		delete this.usuarios[nick];
	}


	this.agregarUsuario(owner);
} 
/////////////////////////
// USUARIO
/////////////////////////
function Usuario(nick,juego){
	this.nick=nick;
	this.juego = juego;
	this.partida
	this.crearPartida = function(num){
		return this.juego.crearPartida(num,this);
	}

	this.iniciarPartida = function(partida){
		this.partida.iniciarPartida();
	}

	this.abandonarPartida = function (){
		this.partida.abandonarPartida(this.nick);

	}
}

////////////////////
//FASES
///////////////////
function Inicial(){
	this.nombre = "inicial"
	//agregar usuario al inicio
	this.agregarUsuario = function(nick,partida){
		partida.puedeAgregarUsuario(nick);

		if (partida.comprobarMinimo()){
			partida.fase = new Completado();
		}
	}

	this.iniciarPartida = function (partida){
		console.log("Faltan jugadores");
	}

	this.abandonarPartida = function(nick,partida){
		//eliminar al usuario
		//ToDo: comprobar si no quedan usuarios
		partida.eliminarUsuario(nick);

	}
};

function Completado(){
	this.nombre = "completado"
	this.agregarUsuario = function(nick,partida){

		if (partida.comprobarMaximo()){
			partida.puedeAgregarUsuario(nick);
		}
		else{
			console.log("Esta lleno");
		}
	}

	this.iniciarPartida = function (partida){
		partida.fase = new Jugando();
	}

	this.abandonarPartida = function(nick,partida){
		//eliminar al usuario
		partida.eliminarUsuario(nick);
		//pasa a la fase inicial
		//comprobar el numero de usuarios minimo
		if (!partida.comprobarMinimo()){
			partida.fase = new Inicial();
		}
	}
}

function Jugando(){
	this.nombre = "jugando"
	this.agregarUsuario = function(nick,partida){
		//partida.puedeAgregarUsuario(nick);
		console.log("La partida ha comenzado");
	}
	this.iniciarPartida = function (partida){
		console.log("la partida ya ha comenzado");
	}

	this.abandonarPartida = function(nick,partida){
		//eliminar al usuario y comprobar si quedan
		partida.eliminarUsuario(nick);
		//comprobar si termina la partida.
	}
};

function Final(){
	this.nombre = "final"
	this.agregarUsuario = function(nick,partida){
		//partida.puedeAgregarUsuario(nick);
		console.log("La partida ha finalizado");
	}

	this.iniciarPartida = function (partida){
		console.log("la partida ya ha finalizado");
	}

	this.abandonarPartida = function(nick,partida){
		console.log("sin sentido");
	}
};



/////////////////////////////////////////////////////
// FUNCIONES AUXILIARES
////////////////////////////////////////////////////
function randomInt(low, high) {
	//devuelve un numero aleatorio entre dos rangos
	return Math.floor(Math.random() * (high - low) + low);
}
