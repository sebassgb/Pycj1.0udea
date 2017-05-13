//var refe = database.ref('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');

function usarValidacionRelacionEvento(pkUsuario, evento, callback){

}

function suscribirUsuarioEvento(pkUsuario, evento){
	var referencia = "Eventos/"+evento.deporte+"/";
	referencia = referencia+JsonToPkEvento(evento)+"/informacion";

	//Esta linea es equivalente a decir result = el json de la referencia dada
	//todo lo que sigue que dependa del json referencia debe de estar dentro de
	//la funcion callback
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

//Actualiza la bd en la referencia = "refStr" con
//la informacion = "json"(solo actualiza, no borra lo que no este en el json)
function updateReferencia(refStr, json){
	var referencia = database.ref(refStr);
	referencia.update(json);
}

//Metodo para usar una referencia de la bd
//referencia(Direccion) = "refStr", callback : Funcion donde se usara la referencia de la bd
//el metodo callback tiene la siguiente forma function(value, result){...}
//en este ejemplo se envia la referencia con el parametro result
function usarJsonReferencia(refStr, callback){
	var referencia = database.ref(refStr);
	referencia.on('value', function(snapshot) {//Funcion asincrona
		callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
	});
}

var eventoz = retornarJsonReferencia('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');
alert(eventoz);
//alert(JsonToPkEvento(evento));
