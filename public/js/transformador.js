
function esMasCercano(primero, segundo){
	if(parseInt(primero.year) < parseInt(segundo.year)){
		return true;
	}else if(parseInt(primero.year) > parseInt(segundo.year)){
		return false;
	}
	if(parseInt(primero.mes) < parseInt(segundo.mes)){
		return true;
	}else if(parseInt(primero.mes) > parseInt(segundo.mes)){
		return false;
	}
	if(parseInt(primero.dia) < parseInt(segundo.dia)){
		return true;
	}else if(parseInt(primero.dia) > parseInt(segundo.dia)){
		return false;
	}
	if(parseInt(primero.hora) < parseInt(segundo.hora)){
		return true;
	}else if(parseInt(primero.hora) > parseInt(segundo.hora)){
		return false;
	}
	if(parseInt(primero.minuto) < parseInt(segundo.minuto)){
		return true;
	}else if(parseInt(primero.minuto) > parseInt(segundo.minuto)){
		return false;
	}
}

function ordenarEventoFecha(eventos){
	if(eventos.length == 0){
		return [];
	}
	var res = [];
	res[0] = eventos[0];
	for(var i = 1; i < eventos.length; i++){
		var bool = true;
		for (var j = 0; j < res.length; j++) {
			var esCercano = esMasCercano(eventos[i], res[j]);
			if (esCercano) {
				res.splice(j, 0, eventos[i]);
				bool = false;
				break;
			}
		}
		if (bool) {
			res[res.length] = eventos[i];
		}
	}
	return res;
}

function JsonToPkEvento(json){ 
    var PK = json.creador+" "+json.dia+" "+json.mes+" "+json.year+" "+json.hora+" "+json.minuto;
    return PK;
}

function pkEventoToJson(pkEvento){
	console.log(pkEvento);
	var arrEv = pkEvento.split(" ");
	var resJson = {
		creador : arrEv[0].toString()+" "+arrEv[1].toString(),
		dia : arrEv[2].toString(),
		mes : arrEv[3].toString(),
		year : arrEv[4].toString(),
		hora : arrEv[5].toString(),
		minuto : arrEv[6].toString(),
	}
	return resJson;
}

// colocar en un Js
String.prototype.replaceAll = function(target, replacement){
  return this.split(target).join(replacement);
};// funcion que remplaza todas la ocurrencias de un string en un string por otro string target es el string a remplazar y replacement es el string por el que se desea remplazar como se usa prototype esta funcion se invoca sobre los obejtos de tipo string

function quitarPuntoCorreo(mcorreo){ // funcion encargada de remplazar los . de los correos por espacios para poder ingresarlos en la raiz del nodo de la bd en firebase  
    var resp=mcorreo.replaceAll("."," ");   
    return resp;
}

function colocarPuntoCorreo(mcorreo){ // funcion encargada de remplazar los . de los correos por espacios para poder ingresarlos en la raiz del nodo de la bd en firebase  
    return mcorreo.replaceAll(" ",".");   
    
}


function identificador(json,pK){  // Metodo que identifica si el usuario es el creador del evento, participante o nada.
    if(json.creador == pK){
        return "Admin";
    }if(esParticipante(json, pK)==true){
        
        return "Suscrito";
    }else{
        return "";
    }
 
}

function esParticipante(json, pK){ // Metodo auxiliar para saber si es participante
    //console.log(json.participantes);
    for(var i in json.participantes){ 
        if(json.participantes[i].pkUsuario == pK){
           return true;
        }
    }
    return false;
}



