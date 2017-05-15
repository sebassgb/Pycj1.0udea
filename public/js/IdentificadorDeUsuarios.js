function identificador(json,pK){  // Metodo que identifica si el usuario es el creador del evento, participante o nada.
    if(json.creador == pK){
        return "creador";
    }if(esParticipante(json)==true){
        
        return "participante";
    }else{
        return "nada";
    }
 
}


function esParticipante(json){ // Metodo auxiliar para saber si es participante
    for(var i in json.participantes){ 
        if(json.participantes[i].pkUsuario == pK){
           return true;
        }
    }
    return false;
}



