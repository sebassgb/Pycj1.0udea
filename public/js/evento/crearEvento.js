
// funcion que crea el evento con los datos basicos
function crearEventoBasico(creador,eventoo) {

	// validamos que pueda crear el evento por su disponibilidad

	usarValidacionRelacionEvento(creador, eventoo,function(value,result){

		if(result==false){
			alert("tiene un evento en esa fecha");
		}else{

			var fecha=eventoo.dia+" "+eventoo.mes+" "+eventoo.year;
			var hora=eventoo.hora +" "+eventoo.minuto;
			var Deporte=eventoo.deporte;

			// personas suscritas es un array con las personas inscritas en el evento
			// clave primaria es : deporte+creador+fecha+hora.
			
			// 1) ingreso el evento creado a la lista de eventos del usuario 
			var eventoscreados="eventosCreados";	
			var pkMisEventos=Deporte+"/"+creador+" "+fecha+" "+hora;
			var referencia="usuarios/"+creador+"/"+eventoscreados+"/"+Deporte+"/";

			var eventocreado={
				pkEvento:pkMisEventos
			}

			database.ref(referencia).push(eventocreado);


			// 2) ingreso a la bd de eventos el evento
			// creo la clave primaria	
			var pkEvento="Eventos/"+Deporte+"/"+creador+" "+fecha+" "+hora+"/"+"informacion";
			database.ref(pkEvento).update(eventoo);

			// aregla lo de los participantes para que salga con la cosa rara de firebase
			var parti={
				pkUsuario:creador
			}

			var referenciaparticipantes=pkEvento+"/participantes";
			database.ref(referenciaparticipantes).push(parti);


			//3) ingreso en pkeventos a la lista de los eventos de asistencia del usuario 

			var referenciaMiseventos="usuarios/"+creador+"/"+"eventosAsistencia"+"/"; // creo la referencia
			database.ref(referenciaMiseventos).push(eventocreado); // ingreso la pk de los eventos

		}
	});	


}

function selectDeporte(texto){
	document.getElementById("deporEvento").value = texto;
}
