var fs = require("fs");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require("body-parser");
//Agramos la dependencia respecto la capa API rest y mi capa de logica
var modelo=require("./server/modelo.js");


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
//Aqui trabajamos
// '/usuarios'



//Inicio del index.js
server.listen(app.get('port'), function () {
    console.log('Node esta escuchando en el puerto ', app.get('port'));
});



/////----- Solo si utilizamos express
// app.listen(app.get('port'), function () {
//      console.log('Node app is running on port', app.get('port'));
// });

