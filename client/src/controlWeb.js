function ControlWeb($){

	this.mostrarCrearPartida = function(min){

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
			cadena = cadena +'<input type="number" class="form-control" id="num" min="'+min+'" max="10" value="'+min+'">';
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
			cadena = cadena +'<div class="col-md-4 ">';
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

			if(ws.owner){
				cadena = cadena +'<button type="button" id="btnIniciarP" class="btn btn-primary btn-block" style="background-color:#F5830B;">Iniciar partida</button>';
				
			}
			if(!ws.owner){
			cadena = cadena +'<button type="button" id="btnAbandonar" class="btn btn-primary btn-block" style="background-color:#F5830B;">Abandonar partida</button>';
			}	
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

		$('#btnAbandonar').on('click',function(){
			ws.abandonarPartida();
			cw.limpiarJuego();
	    	$('#modalGeneral').remove();
	    	ws.reset();
	    	cw.mostrarCrearPartida(4);
	    	ws.listaPartidasDisponibles();
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

	this.mostrarListaJugadores=function(lista){
	  	$('#mostrarListaEsperando').remove();
	  	var cadena = '';
	 	cadena= cadena +'<div id="mostrarListaEsperando"><h3>Jugadores en partida:</h3>';
		  	cadena =cadena+'<ul class="list-group">';
		  	 for(var i=0;i<lista.length;i++){
		  		cadena=cadena+'<li class="list-group-item">'+lista[i].nick+'</li>';
		  	}
			cadena=cadena+'</ul></div>';
		$('#listaEsperando').append(cadena);
	}

	this.mostrarModalSimple= function(msg){
		this.limpiar();
		$('#avisarImpostor').remove();
		var cadena = "<p id='avisarImpostor'>"+msg+"</p>";
		$('#contenidoModal').append(cadena)
		$('#modalGeneral').modal("show");
	}
	this.mostrarModalTarea= function(tarea){
		this.limpiar();
		//$('#avisarImpostor').remove();
		//$('#avisarTareas').remove();
		var cadena = "<p id='avisarTareas'>"+'La tarea que se te ha asignado es: '+tarea+"</p>";
		$('#contenidoModal').append(cadena)
		$('#modalGeneral').modal("show");
	}

	this.mostrarModalRealizarTarea= function(tarea){
		this.limpiar();
		//$('#avisarImpostor').remove();
		//$('#avisarTareas').remove();
		var cadena = "<p id='tarea'>"+'Debe realizar la tarea: '+tarea+"</p>";
		$('#contenidoModalTareas').append(cadena);
		$('#realizarTarea').modal("show");
	}

	this.mostrarFinalPartida= function(msg){
		this.limpiar();
		//$('#avisarImpostor').remove();
		//$('#avisarTareas').remove();
		var cadena = "<p id='final'>"+msg+"</p>";
		$('#contenidoModalFinal').append(cadena);
		$('#finalPartida').modal("show");

		$('#volverAlMenu').on('click',function(){
	    	cw.limpiarJuego();
	    	//$('#modalGeneral').remove();
	    	ws.reset();
	    	cw.mostrarCrearPartida(4);
	    	ws.listaPartidasDisponibles();
	    });
	}

	this.mostrarModalVotacion=function(lista){
		this.limpiar();
		var cadena='<div id="votacion"><h2>Votación</h2>';		
		cadena =cadena+'<div class="input-group">';
	  	 for(var i=0;i<lista.length;i++){
	  		cadena=cadena+'<div><input type="radio" name="optradio" value="'+lista[i].nick+'"> '+lista[i].nick+'</div>';
	  	}
	  	cadena=cadena+'<div><input type="radio" name="optradio" value="-1"> Saltar voto</div>';
		cadena=cadena+'</div>';
		
		$("#contenidoModal").append(cadena);
		if(ws.estado=="vivo"){
			$("#pie").append('<button type="button" id="votar" class="btn btn-secondary" >Votar</button>');
		}
		$('#modalGeneral').modal("show");
		
		var sospechoso=undefined;
		$('.input-group input').on('change', function() {
		   sospechoso=$('input[name=optradio]:checked', '.input-group').val(); 
		});
		
		$('#votar').on('click',function(){
	    	$('#votar').remove();
	    	if (sospechoso!="-1"){
		    	ws.votar(sospechoso);
		    }
		    else{
	    		ws.saltarVoto();
	    	}
	    });

	};
	this.mostrarModalMuerte= function(msg){
		this.limpiar();
		var cadena = "<p id='muerte'>"+'Por consenso, se ha expulsado a:'+msg+"</p>";
		$('#contenidoModal').append(cadena);
		$('#modalGeneral').modal("show");
	}
	// Modal abandonar partida.
	this.mostrarModalAbandonarPartida= function(msg){
		this.limpiar();
		var cadena = "<p id='haAbandonado'>"+'El jugador '+msg+' ha abandonado la partida.'+"</p>";
		$('#contenidoModal').append(cadena);
		$('#modalGeneral').modal("show");
	}

	this.mostrarModalHeAbandonado= function(msg){
		this.limpiar()
		//$('#avisarImpostor').remove();
		//$('#avisarTareas').remove();
		var cadena = "<p id='abandonar'>"+msg+' como jugador abandono la partida.'+"</p>";
		$('#contenidoModalAbandonar').append(cadena);
		$('#abandonarPartida').modal("show");

		$('#abandonarAlMenu').on('click',function(){
	    	cw.limpiarJuego();
	    	//$('#modalGeneral').remove();
	    	ws.reset();
	    	cw.mostrarCrearPartida(4);
	    	ws.listaPartidasDisponibles();
	    });
	}
	////////////////////////////////////////////

	this.mostrarModalSaltarVotacion= function(){
		this.limpiar();
		var cadena = "<p id='saltarVoto'>"+"Los ciudadanos no han llegado a un acuerdo, no se ha expulsado del pueblo a nadie"+"</p>";
		$('#contenidoModal').append(cadena);
		$('#modalGeneral').modal("show");
	}

	this.limpiar = function(){
		$('#mostrarUP').remove();
		$('#mostrarCP').remove();
		$('#mostrarER').remove();
		$('#mostrarListaEsperando').remove();
		$('#modalGeneral').remove();
		$('#avisarImpostor').remove();
		$('#avisarTareas').remove();
		$('#tarea').remove();
		$('#final').remove();
		$('#votacion').remove();
		$('#muerte').remove();
		$('#saltarVoto').remove();
		$('#abandonar').remove();
		$('#haAbandonado').remove();

	}

	this.limpiarJuego = function(){
		this.limpiar();
		$('#game-container').remove();

	}

	this.llamarAJuego = function(){
		this.limpiar();

		cadena = "";
		cadena = cadena + '<div id="game-container">';

		cadena = cadena +'<div class="row">';
			cadena = cadena +'<div class="col-md-5"></div>';
			cadena = cadena +'<div class="col-md-2 ">';
				cadena = cadena + '<button type="button" id="btnAbandonar" class="btn btn-primary btn-block" style="background-color:#D1D1C3;">Abandonar partida</button>';
			cadena = cadena +'</div>';
			cadena = cadena +'<div class="col-md-5"></div>';// aqui dentro ira la lista de jugadores 
		cadena = cadena +'</div>';

		cadena = cadena + '</div>';

		//$('#game').append('<div id="game-container"> <button type="button" id="btnAbandonar" class="btn btn-primary btn-block" style="background-color:#F5830B;">Abandonar partida</button></div>');
		$('#game').append(cadena);

		$('#btnAbandonar').on('click',function(){
			ws.abandonarPartida();
			cw.limpiarJuego();
	    	//$('#modalGeneral').remove();
	    	ws.reset();
	    	cw.mostrarCrearPartida(4);
	    	ws.listaPartidasDisponibles();
		})
	}
}