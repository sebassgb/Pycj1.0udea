//var refe = database.ref('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');

function usarValidacionRelacionEvento(pkUsuario, evento, callback){

}

function suscribirUsuarioEvento(pkUsuario, evento){
	var referencia = "Eventos/"+evento.deporte+"/";
	referencia = referencia+JsonToPkEvento(evento)+"/informacion";
	usarJsonReferencia(referencia, function(value, result){
		if(result.cuposTotales > result.cuposLlenos){
			var newEvento = result;
			usarValidacionRelacionEvento(pkUsuario, newEvento, function(value, result){
				if(result == true){

				}
			});
		}
	});
}

function updateReferencia(refStr, json){
	var referencia = database.ref(refStr);
	referencia.update(json);
}


function usarJsonReferencia(refStr, callback){
	var referencia = database.ref(refStr);
	referencia.on('value', function(snapshot) {
		callback(0, snapshot.val());
	});
}


<<<<<<< HEAD



=======
function retornarUsuarioConcurrente(){
	var user = firebase.auth().currentUser;
	if (user) {
		var correo=user.email;
		correo =quitarPuntoCorreo(correo);
		return correo;
	} else {
	  return null;
	}
}


var eventoz = retornarJsonReferencia('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');
alert(eventoz);
//alert(JsonToPkEvento(evento));
>>>>>>> d0c008fab5c1d376e82a14eae9825bbd7c82b5ac
