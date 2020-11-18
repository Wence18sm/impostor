function ControlWeb($){

	this.mostrarCrearPartida = function(){

	var cadena = '<div id="mostrarCP">';

	cadena = cadena + '<div class="form-group">';
	cadena = cadena +' <label for="nick">Nick:</label>';
	cadena = cadena +'<input type="text" class="form-control" id="nick">'
	cadena = cadena + '</div>';
	cadena = cadena +'<div class="form-group">';
	cadena = cadena +'<label for="pwd">Numero:</label>';
	cadena = cadena +'<input type="text" class="form-control" id="num">';
	cadena = cadena +'</div>';

	cadena = cadena +'<button type="button" id="btnCrearPartida" class="btn btn-primary">Crear Partida</button>';

	cadena = cadena +'</div>';

	//# busca un elemento 
	//. busca una clase 
	// sin nada, busca una cabecera html
	$('#crearPartida').append(cadena);

	$('#btnCrearPartida').on('click',function(){

		var nick= $('#nick').val();
		var num = $('#num').val();
		$('#mostrarCP').remove();//borrarlom todo
		//controlar que no le mandemos un nick vacio
		ws.crearPartida(nick,num);
		//mostrar Esperando rival

	})


	}

	this.mostrarEsperandoRival = function(){
		$('#mostrarER').remove();
		var cadena = '<div id="mostrarER">';
		cadena = cadena + '<img src="client/img/images.jpg">';
		cadena = cadena +'</div>';

		$('#esperando').append(cadena);

	}

	this.mostrarUnirAPartida = function(lista){

		var cadena = '<div id="mostrarUP">';
		cadena = cadena +'<div class="list-group">';

		for (var i=0; i<lista.length;i++){
  			cadena = cadena + '<a href="#" value ="'+lista[i].codigo+'" class="list-group-item">'+'Codigo:'+lista[i].codigo+'--- Huecos:'+lista[i].huecos+'</a>';
  		}
		cadena = cadena +'</div>';
		cadena = cadena +'</div>';


		cadena = cadena +'<button type="button" id="btnUnirAPartida" class="btn btn-primary">Unir a partida</button>';

		$('#unirAPartida').append(cadena);

		var StoreValue = [];
    	$(".list-group a").click(function(){
        	StoreValue = []; 
       		StoreValue.push($(this).attr("value")); // add text to array
    	});

		$('#btnUnirAPartida').on('click',function(){
			var nick= $('#nick').val();
			var codigo = StoreValue[0];
			$('#mostrarUP').remove();//borrarlom todo
			//controlar que no le mandemos un nick vacio
			ws.unirAPartida(nick,codigo);
		
	})
	}

}