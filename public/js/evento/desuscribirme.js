/*
*eliminar pkusuario de la lista de participantes del evento.
*eliminar pkevento de la lista de eventos asistencia
*mensaje de exito
*actualizar html actual

*/

var evento="Eventos/futbol/ninja@ni com 11 05 2017 8 21/";
var js;
usarJsonReferencia(evento,function(value,result){
	js=result;	
	quitarmeDelEvento("porque@nose com",js);

});




function quitarmeDelEvento(pkusuario,evento) {


	




}

function crearNuevaListaParticipantes(pkUsuarioELiminar,evento){

	var participantesviejos=evento.participante; // almaceno los participantes antiguos en un vector

	var pkparticipantesViejos=[]; // creo un vector con la pk de los participantes del evento
	for(i in participantesviejos){
		pkparticipantesViejos.push(participantesviejos[i]);
	}

	for(j in pkparticipantesViejos){
	var pkviejo=pkparticipantesViejos[j].pkUsuario;
	
	if(j=pkparticipantesViejos.length){

	}

	if(pkviejo==pkusuario){
		console.log("igual");
	}else{
		console.log("nada que ver");
	}
}


}








function usarJsonReferencia(refStr, callback){
    var referencia = database.ref(refStr);
    referencia.on('child_added', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
    });
}
