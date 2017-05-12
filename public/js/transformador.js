
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
	//console.log(res[1]);
	return res;
}

function JsonToPkEvento(json){ 
    var PK = json.creador+" "+json.dia+" "+json.mes+" "+json.year+" "+json.hora+" "+json.minuto;
    return PK;
}

