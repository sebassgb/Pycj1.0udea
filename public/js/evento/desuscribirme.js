/*
*eliminar pkusuario de la lista de participantes del evento.
*eliminar pkevento de la lista de eventos asistencia
*mensaje de exito
*actualizar html actual

*/

var evento="Eventos/futbol/ninja@ni com 11 05 2017 1 35/";
var js;
usarJsonReferencia(evento,function(value,result){
	js=result;	
	quitarmeDelEvento("ninja@ni com",js);

});




function quitarmeDelEvento(pkusuario,evento) {

var participantesviejos=evento.participante; // almaceno los participantes antiguos en un vector

var pkparticipantesViejos=[]; // creo un vector con la pk de los participantes del evento
for(i in participantesviejos){
	pkparticipantesViejos.push(participantesviejos[i]);
}

for(i in pkparticipantesViejos){
	if(pkparticipantesViejos[i]){

	}
}


}



function usarJsonReferencia(refStr, callback){
    var referencia = database.ref(refStr);
    referencia.on('child_added', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
    });
}

