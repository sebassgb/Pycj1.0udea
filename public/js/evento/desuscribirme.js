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
	salirDelEvento("hp@hp com",js);

});

var bpartipante=false;


function salirDelEvento(pkusuario,evento) {

	eliminarPkusuarioListaParticipantes(pkusuario,evento);

	if(bpartipante){// siginifica que no encontro el participante
		quitarEventoDeListaEventosSuscritos(pkusuario,evento);
	}




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
			bpartipante=true;
			break;
		}else{
			alert("ya te saliste de  este evento");

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
				database.ref(referenciaEventoSuscritoBorrar).remove();
				alert("Te has retirado del evento ti@");
				break;
			}else{
				alert("Evento no se encontro en la lista de eventos suscritos");
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

