function Juego() {
	this.partidas = {};//que colleccion --> hemos decidido un array asociativo/ diccionario
	this.crearPartida = function(num,owner){

		//generar un codigo de 6 letras aleatorio
		let codigo= this.obtenerCodigo();
		//comprobar que no se usa
		if (!this.partidas[codigo]){
			this.partidas[codigo] = new Partida(num,owner);
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
	this.obtenerCodigo = function(){
		let cadena = "abcdefghijklmnopqrstuvwxyz";
		let letras = cadena.split('');
		let maxCadena = cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}
}

function Partida(num,owner){
	this.maximo= num;
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

		////////////////
		// aportacion WSM
		/*var cont = 0;
		if (cont<this.maximo){
			if (!nick){
				this.usuarios.push(nick);
				cont = cont + 1;
			}		
		}
		////////////////
		*/
		let nuevo= nick;
		let cont = 1;
		//comprobamos que no supera el maximo de usuarios



		if((Object.keys(this.usuarios).length) < this.maximo){
			while(this.usuarios[nuevo]){
				nuevo = nick+cont;
				cont = cont + 1;
			}
			this.usuarios[nuevo] = new Usuario(nuevo);
		}

	}

	this.agregarUsuario(owner);
} 

function Usuario(nick){
	this.nick=nick;
}



function Inicial(){
	this.agregarUsuario = function(nick,partida){
		partida.puedeAgregarUsuario(nick);
	}
};

function Jugando(){
	this.agregarUsuario = function(nick,partida){
		//partida.puedeAgregarUsuario(nick);
	}
};

function Final(){
	this.agregarUsuario = function(nick,partida){
		//partida.puedeAgregarUsuario(nick);
	}
};

// FUNCIONES AUXILIARES

function randomInt(low, high) {
	//devuelve un numero aleatorio entre dos rangos
	return Math.floor(Math.random() * (high - low) + low);
}
