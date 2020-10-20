///////////////////// EL JUEGO DEL IMPOSTOR /////////////////////////////

////////////////////
// JUEGO
///////////////////
function Juego() {
	this.partidas = {};//que colleccion --> hemos decidido un array asociativo/ diccionario
	this.crearPartida = function(num,owner){
		//Comprobar los limites de num
		if (4<=num && num<=10){
			//generar un codigo de 6 letras aleatorio
			let codigo= this.obtenerCodigo();
			//comprobar que no se usa
			if (!this.partidas[codigo]){
				this.partidas[codigo] = new Partida(num,owner.nick);
				owner.partida = this.partidas[codigo];
			}
			return codigo;
		}else {
		console.log("El numero no esta entre el rango");
		}
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
	this.encargos = ["jardines","calles", "mobiliario", "basuras","electricidad"];

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
		this.usuarios[nuevo].partida = this;

		//this.comprobarMinimo();
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

	this.puedeIniciarPartida = function (){
		this.asignarEncargo();
		this.asignarImpostor();
		this.fase = new Jugando();
	}


	this.abandonarPartida = function(nick){
		this.fase.abandonarPartida(nick,this);

	}
	this.eliminarUsuario = function(nick){
		delete this.usuarios[nick];
	}

	//Asignar encargos
	this.asignarEncargo = function (){
		for(usr in this.usuarios){
			this.usuarios[usr].encargo = this.encargos[randomInt(0,this.encargos.length)];
		}
		
	}
	//Asignar Impostor 
	this.asignarImpostor = function(){
		let key = Object.keys(this.usuarios);
		this.usuarios[key[randomInt(0,key.length)]].impostor = true;
	}
	//Funcion para comprobar si tenemos un impostor.
	this.tenemosUnImpostor = function(){
		for (var usr in this.usuarios){
			if (this.usuarios[usr].impostor){
				return true;
			}
		}
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
	this.impostor = false;
	this.encargo= " ";
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
		//llama a puedeIniciarPartida();
		partida.puedeIniciarPartida();
		//partida.fase = new Jugando();
		//asignar encargos: secuenciamlente a todos los usuarios
		//asignar impostor: dado el array de usuarios (object.keys) elegimos uno y le aginamos impostor a true.
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

function Inicio(){
	juego = new Juego();
	var usr = new Usuario("Pepe",juego);
	var codigo = usr.crearPartida(8);

	juego.unirAPartida(codigo,"verde");
	juego.unirAPartida(codigo,"azul");
	juego.unirAPartida(codigo,"rojo");
	juego.unirAPartida(codigo,"arcoiris");
	juego.unirAPartida(codigo,"amarillo");
	juego.unirAPartida(codigo,"rosa");
	juego.unirAPartida(codigo,"blanco");
	juego.unirAPartida(codigo,"negro");
	juego.unirAPartida(codigo,"trasnparente");



	usr.iniciarPartida();
}


