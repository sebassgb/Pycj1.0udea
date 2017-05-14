//var refe = database.ref('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');
var yaSeValido = false;
function usarValidacionRelacionEvento(pkUsuario, evento, callback){
	if(yaSeValido == false){
		console.log("usar");
		yaSeValido = true;
		var useSoloUnaVes = 0;
		useEventosSuscritos(pkUsuario, function(value, result){
			if(useSoloUnaVes == 0){
				useSoloUnaVes = 1;
				console.log(pkUsuario);
				for(j in result){
					console.log(result[j]);
				}
				callback(0, true);
			}
		})
	}
}

function suscribirUsuarioEvento(pkUsuario, evento, callback){
	var referencia = "Eventos/"+evento.deporte+"/";
	var pkEvento = JsonToPkEvento(evento);
	referencia = referencia+pkEvento+"/informacion";
	var machete = 0;
	yaSeValido = false;
	//Esta linea es equivalente a decir result = el json de la referencia dada
	//todo lo que sigue que dependa del json referencia debe de estar dentro de
	//la funcion callback
	usarJsonReferencia(referencia, function(value, result){
		if(parseInt(result.cuposTotales) > parseInt(result.cuposLlenos)){
			var newEvento = result;
			usarValidacionRelacionEvento(pkUsuario, newEvento, function(value, result){
				if(result == true){
					//modifica cupos llenos del evento.
					if(machete == 0){
						machete = 1;
						var newsCupos = parseInt(newEvento.cuposLlenos)+1;
						//alert("cupos");
						updateReferencia(referencia, {cuposLlenos : newsCupos.toString()});
					}
					//ingresa la pk del usuario a la  lista de participantes del evento.
					if(machete == 1){
						machete = 2;
						var auxReferencia = referencia+"/participante";
						//alert("participante");
						pushReferencia(auxReferencia, {pkUsuario : pkUsuario})
					}
					//ingresa pk del evento a la lista de  eventos asistencia.
					if(machete == 2){
						machete = 3;
						var refEvSuscritosUser = "usuarios/"+pkUsuario+"/eventosAsistencia/"+newEvento.deporte
						//alert("asistencia");
						pushReferencia(refEvSuscritosUser, {pkEvento: pkEvento});
					}
					if (machete == 3) {
						machete = -1;
						//alert("salir");
						callback(0, true);
					}		
					if(machete == -1){
						//alert("termina");
						return;
					}
				}else{
					callback(0, false);
				}
			});
		}else{
			callback(0, false);
		}
	});
}

//Actualiza la bd en la referencia = "refStr" con
//la informacion = "json"(solo actualiza, no borra lo que no este en el json)
function updateReferencia(refStr, json){
	var referencia = database.ref(refStr);
	referencia.update(json);
}

//Agrega un nuevo elemento a la referencia
//Cuando es un array el contenido de la referencia
function pushReferencia(refStr, json){
	var referencia = database.ref(refStr);
	referencia.push(json);
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

//var eventoz = retornarJsonReferencia('Eventos/futbol/ninja@ni com 11 05 2017 1 35/informacion/participante');
//alert(eventoz);
//alert(JsonToPkEvento(evento));