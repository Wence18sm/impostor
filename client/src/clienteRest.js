function ClienteRest(){

	this.crearPartida=function(nick,num){
		$.getJSON("/crearPartida/"+nick+"/"+num,function(data){    
    		console.log(data);
		});
	};

	this.unirAPartida=function(nick,codigoPartida){
		$.getJSON("/unirAPartida/"+nick+"/"+codigoPartida,function(data){    
    		console.log(data);
		});
	};

	this.listaPartidas=function(){
		$.getJSON("/listaPartidas",function(data){    
    		console.log(data);
		});
	};


}