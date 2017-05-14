/*
*eliminar pkusuario de la lista de participantes del evento.
*eliminar pkevento de la lista de eventos asistencia
*mensaje de exito
*actualizar html actual

*/

var reevento="Eventos/Buceo Pulmon Libre/hp@hp com 01 02 2017 10 08/";
var js;
usarJsonReferencia(reevento,function(value,result){
	js=result;
	quitarmeDelEvento("a@a com",js);

});



function quitarmeDelEvento(pkusuario,evento) {

eliminarPkusuarioListaParticipantes(pkusuario,evento);
quitarEventoDeListaEventosSuscritos(pkusuario,evento);




}

function eliminarPkusuarioListaParticipantes(pkUsuarioELiminar,evento){

	var participantesviejos=evento.participantes; // almaceno los participantes antiguos en un vector
	var pkfirebase=[];

	var pkparticipantesViejos=[]; // creo un vector con la pk de los participantes del evento
	for(i in participantesviejos){		
		pkfirebase.push(i);
		pkparticipantesViejos.push(participantesviejos[i]);
	}
	

	for(j in pkparticipantesViejos){
		var pkviejo=pkparticipantesViejos[j].pkUsuario;	
		if(pkviejo==pkUsuarioELiminar){
			var referenciaParticipante="Eventos/"+evento.deporte+"/"+JsonToPkEvento(evento)+"/informacion/"+"participantes/"+pkfirebase[j]+"/pkUsuario";
			database.ref(referenciaParticipante).remove();
			break;
		}else{
			alert("participante no encontrado");	

		}
	}
}



function quitarEventoDeListaEventosSuscritos(pkUsuario,evento){
	var referenciaevento="usuarios/"+pkUsuario+"/"+"eventosAsistencia/"+evento.deporte;
	usarJsonReferencia2(referenciaevento,function(value,result,firebaseKey){

		var eventosAsistenciaDeporteX=result;
		var fireBaseKey=firebaseKey;
		var eventoBorrar=JsonToPkEvento(evento);	
		
		
		for(k in eventosAsistenciaDeporteX){
			var event=eventosAsistenciaDeporteX[k];

			if(event==eventoBorrar){
				var referenciaEventoSuscritoBorrar="usuarios/"+pkUsuario+"/"+"eventosAsistencia/"+evento.deporte+"/"+fireBaseKey+"/pkEvento";
				console.log(referenciaEventoSuscritoBorrar);
				database.ref(referenciaEventoSuscritoBorrar).remove();
				console.log("Te has inscrito al evento ti@");
				break;
			}else{
				console.log("Evento no se encontro en la lista de eventos suscritos");
			}

		}







	});


}

function usarJsonReferencia2(refStr, callback,firebaseKey){
    var referencia = database.ref(refStr);
    referencia.on('child_added', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val(),snapshot.key);//Se ejecuta callback para usar la referencia cuando se tenga
    });
}





function usarJsonReferencia(refStr, callback){
    var referencia = database.ref(refStr);

    referencia.on('child_added', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
    });
}

