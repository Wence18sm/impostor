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
	this.unirAPartida = function(){
		//ToDo

	}
	this.obtenerCodigo = function(){
		let cadena = "abcdefghijklmnopqrstuvwxyz";
		let letras = cadena.split('');
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
	}
}

function Partida(num,owner){
	this.maximo= num;
	this.owner= owner;
	
	this.usuarios = [];//el index 0 sera el owner
	//this.usuarios ={}; //version diccionario


	this.agregarUsuario = function(nick){
		//ToDo
		//cmprobar el nick unico 
		//comprobar si el usuario n (el tope) el maximo
	}

	this.agregarUsuario(owner);
} 

function Usuario(){

}

// FUNCIONES AUXILIARES

function randomInt(low, high) {
	//devuelve un numero aleatorio entre dos rangos
	return Math.floor(Math.random() * (high - low) + low);
}
