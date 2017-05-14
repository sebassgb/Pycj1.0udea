var express = require('express');
var app = express();
app.listen(8080);
app.use(express.static('public'));

app.get("/", function(req,res){// localhost:8080(/) aceptar la comunicacion por get, req ->Parametros res->Respuesta
	res.send('Funciona :v');
});
