var fs = require("fs");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require("body-parser");
var io = require('socket.io').listen(server);
//Agramos la dependencia respecto la capa API rest y mi capa de logica
var modelo=require("./server/modelo.js");
var wss = require("./server/servidorWS.js");

var servidorWS=new wss.ServidorWS();

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Creamos una inctancia de juego 
var juego = new modelo.Juego();


app.get('/', function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/client/index.html"); 
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get('/game', function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/client/index-game.html"); 
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
//Aqui trabajamos
// '/usuarios'

// nombre-ruta-api/:parametro1/:parametro2...
//app.get('/nuevoUsuario/:nick',function(request,response){
	//var nick=request.params.nick;
	//var usr= new modelo.Usuario(nick);

//});

app.get('/crearPartida/:nick/:numero',function(request,response){
	var nick=request.params.nick;
	var numero = parseInt(request.params.numero);
	//ojo, nick nulo o numero nulo
	//var num = 4;
	//var usr= new modelo.Usuario(nick);
	var codigo= juego.crearPartida(numero,usr);

	response.send({"codigo":codigo});

});

app.get('/unirAPartida/:nick/:codigoPartida',function(request,response){
	var nick=request.params.nick;
	var codigoPartida = request.params.codigoPartida;

	var res = juego.unirAPartida(nick,codigoPartida);

	response.send({"res":res});

});

app.get('/listaPartidas',function(request,response){
	var lista = juego.listaPartidas();
	response.send(lista);
});


//Inicio del index.js
server.listen(app.get('port'), function () {
    console.log('Node esta escuchando en el puerto ', app.get('port'));
});


servidorWS.lanzarSocketSrv(io,juego);

/////----- Solo si utilizamos express
// app.listen(app.get('port'), function () {
//      console.log('Node app is running on port', app.get('port'));
// });

