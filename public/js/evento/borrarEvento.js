/*
var reevento="Eventos/Baloncesto/pepito@pp com 01 02 2017 11 21/";
var js;
usarJsonReferencia(reevento,function(value,result){
	js=result;
	var t=borrarEvento(js);
	//console.log(t);

});
*/

function borrarEvento(evento) {
		
	// obtengo las lista de las pk de los participantes para ir donde ellos y eliminar el evento de su lista de suscritos
	var participantesviejos=evento.participantes;
	var pkfirebase=[];
	var pkparticipantesViejos=[]; // creo un vector con la pk de los participantes del evento
	for(i in participantesviejos){
			pkfirebase.push(i);
			pkparticipantesViejos.push(participantesviejos[i].pkUsuario);

			if(participantesviejos[i].pkUsuario==evento.creador){ // borramos de la lista de evento creados
				quitarEventoDeListaEventosCreados(evento.creador,evento);
			}


	}

	var pkEvento=JsonToPkEvento(evento);
	eliminarPkEventoListaEventosSuscritosParticipantes(evento,pkparticipantesViejos);
	//retorna vector con los pk de los participantes que estaban en el evento
	var rutaeventoEliminar="Eventos/"+evento.deporte+"/"+pkEvento;
	eliminarEventoBDEventos(rutaeventoEliminar);








	return pkparticipantesViejos; //vector con la pk de los participantes del evento a eliminar esto es para luego notificarles lo que sucedio
}



function eliminarPkEventoListaEventosSuscritosParticipantes(evento,participantes) {
	for(i in participantes){
		quitarEventoDeListaEventosSuscritos(participantes[i],evento);				
	}
}

function eliminarEventoBDEventos(rutaEvento) {
	database.ref(rutaEvento).remove();
	
}

function usarJsonReferencia(refStr, callback){
    var referencia = database.ref(refStr);

    referencia.on('child_added', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
    });
}




























