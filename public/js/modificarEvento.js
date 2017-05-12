function retornarJsonReferencia(referencia){
   referencia.on('value', function(snapshot) {
   return snapshot.val();
}); 
}



var dir = 'Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion';
var refe = database.ref(dir);
refe.update({
	nombre:"asdsa"
});


