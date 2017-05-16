var express = require('express');
var app = express();
app.listen(8080);
app.use(express.static('public'));
app.use('/eventos', express.static('public'));


app.get('/deportes', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/barraInferior/ojo/" + "eye.html" ); 
})

app.get('/eventos/:deporte', function (req, res) {
   // Prepare output in JSON format
   console.log(req.params.deporte);
   res.sendFile( __dirname + "/public/html/barraInferior/lobby/" + "lobby.html" ); 
});

app.get('/lobby', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/barraInferior/lobby/" + "lobby.html" ); 
});

app.get('/misEventos', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/barraInferior/lobby/" + "lobby.html" ); 
});

app.get('/perfil', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/drawer/" + "Perfil.html" ); 
});

app.get('/creditos', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/drawer/" + "creditos.html" ); 
});

app.get('/recuperacionContraseña', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/login/" + "RecuperacionContraseña.html" ); 
});

app.get('/registro', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/login/" + "Registrarme.html" ); 
});

app.get('/creacionEvento', function (req, res) {
   // Prepare output in JSON format
   res.sendFile( __dirname + "/public/html/barraInferior/evento/" + "creaEvento.html" ); 
});

app.get('/modificacionEvento/:deporte/:pkEvento', function (req, res) {
   // Prepare output in JSON format
   console.log(req.params.pkEvento);
   console.log(req.params.deporte);
   res.sendFile( __dirname + "/public/html/barraInferior/evento/" + "creaEvento.html" ); 
});
