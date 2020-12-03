function ControlWeb($){

	this.mostrarCrearPartida = function(){

	var cadena = '<div id="mostrarCP">';

	cadena = cadena + '<div class="form-group">';
	cadena = cadena +' <h3>Crear partida</h3>';
	cadena = cadena +' <label for="nick">Nick:</label>';
	//ajustamos el formulario a la columna central de la pantalla
	cadena = cadena +'<div class="row">';
		cadena = cadena +'<div class="col-md-3"></div>';
		cadena = cadena +'<div class="col-md-6">';
			cadena = cadena +'<input type="text" class="form-control" id="nick">'
		cadena = cadena + '</div>';
		cadena = cadena +'<div class="col-md-3"></div>';
	cadena = cadena + '</div>';
	//-----
	cadena = cadena +'<div class="form-group">';
	cadena = cadena +'<label for="pwd">Numero:</label>';
	//ajustamos el formulario a la columna central de la pantalla
	cadena = cadena +'<div class="row">';
		cadena = cadena +'<div class="col-md-3"></div>';
		cadena = cadena +'<div class="col-md-6">';
			cadena = cadena +'<input type="number" class="form-control" id="num" min="4" max="10" value="4">';
		cadena = cadena + '</div>';
		cadena = cadena +'<div class="col-md-3"></div>';
	cadena = cadena + '</div>';
	cadena = cadena +'</div>';

	cadena = cadena +'<button type="button" id="btnCrearPartida" class="btn btn-primary" style="background-color:#F5830B;">Crear Partida</button>';

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

		cadena = cadena +'<div class="row">';
		cadena = cadena +' <h3>Sala de espera</h3>';
			cadena = cadena +'<div class="col-md-4"></div>';
			cadena = cadena +'<div class="col-md-4">';
				cadena = cadena +'<div>Paciencia el juego comenzará en breves... preparate para la PELEA</div>'
				cadena = cadena + '<img src="client/img/0_cWpsf9D3g346Va20.jpg">';
			cadena = cadena +'</div>';
			cadena = cadena +'<div class="col-md-4"></div>';// aqui dentro ira la lista de jugadores 
		cadena = cadena +'</div>';

		cadena = cadena +'<div class="row">';
			cadena = cadena +'<div class="col-md-4"></div>';
			cadena = cadena +'<div class="col-md-4">Si eres el creador puedes iniciar la partida</div>';
			cadena = cadena +'<div class="col-md-4"></div>';
		cadena = cadena +'</div>';

		cadena = cadena +'<div class="row">';
			cadena = cadena +'<div class="col-md-4"></div>';
			cadena = cadena +'<div class="col-md-4">';		
				cadena = cadena +'<button type="button" id="btnIniciarP" class="btn btn-primary btn-block" style="background-color:#F5830B;">Iniciar partida</button>';
			cadena = cadena + '</div>';
			cadena = cadena +'<div class="col-md-4"></div>';
		cadena = cadena +'</div>';

		cadena = cadena +'</div>';// div de todo
		

		$('#esperando').append(cadena);

		$('#mostrarUP').remove();

		$('#btnIniciarP').on('click',function(){
		//var nick= $('#nick').val();
		//var codigo = StoreValue[0];
		$('#mostrarER').remove();//borrarlom todo
		//controlar que no le mandemos un nick vacio
		ws.iniciarPartida();
		//mostrar Esperando rival

	})


	}

	this.mostrarUnirAPartida = function(lista){

		$('#mostrarUP').remove();
		var cadena = '<div id="mostrarUP">';
		cadena = cadena +' <h3>Lista de partidas disponibles</h3>';
		//ajustamos el formulario para que se quede en medio de la pantalla
			cadena = cadena +'<div class="row">';
			cadena = cadena +'<div class="col-md-3"></div>';
			cadena = cadena +'<div class="col-md-6">';
				cadena = cadena +'<div class="list-group">';

					for (var i=0; i<lista.length;i++){
			  			cadena = cadena + '<a href="#" value ="'+lista[i].codigo+'" class="list-group-item">'+'Codigo:'+lista[i].codigo+'<span class="badge">'+'Huecos:'+lista[i].huecos+' de '+lista[i].maximo+'</span></a>';
			  		}
				cadena = cadena +'</div>';
			cadena = cadena + '</div>';
			cadena = cadena +'<div class="col-md-3"></div>';
		cadena = cadena + '</div>';
		//-----
		cadena = cadena +'<button type="button" id="btnUnirAPartida" class="btn btn-primary" style="background-color:#F5830B;">Unir a partida</button>';

		cadena = cadena +'</div>';

		$('#unirAPartida').append(cadena);

		var StoreValue = [];
    	$(".list-group a").click(function(){
        	StoreValue = []; 
       		StoreValue.push($(this).attr("value")); // add text to array
    	});

		$('#btnUnirAPartida').on('click',function(){
			var nick= $('#nick').val();
			var codigo = StoreValue[0];
			$('#mostrarUP').remove();
			$('#mostrarCP').remove();
			//borrarlom todo
			//controlar que no le mandemos un nick vacio
			ws.unirAPartida(nick,codigo);
		})
	}

	this.limpiar = function(){
		$('#mostrarUP').remove();
		$('#mostrarCP').remove();
		$('#mostrarER').remove();
	}

}