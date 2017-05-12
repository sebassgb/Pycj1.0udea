//var refe = database.ref('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');



function suscribirUsuarioEvento(pkUsuario, evento){
	var referencia = "Eventos/"+evento.deporte+"/";
	referencia = referencia+JsonToPkEvento(evento);
	var eventoActual = retornarJsonReferencia(referencia);
	
}

function retornarJsonReferencia(refStr){
	var referencia = database.ref(refStr);
	referencia.on('value', function(snapshot) {
  		return snapshot.val();
	});
}

var eventoz = retornarJsonReferencia('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');
alert(eventoz);
//alert(JsonToPkEvento(evento));