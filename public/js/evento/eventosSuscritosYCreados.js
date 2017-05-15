// LOS METODOS NO RETORNAN NADA

//***********EVENTOS SUSCRITOS***********************************

function useEventosSuscritos(pkusuario,callback) { 
	var pkMisEventos=[];// vector en el que sus pocisiones son pk de eventos esto util para luego ir a la bd de eventos y recuperar los los JSON
    var referenciaEventossuscritos="usuarios/"+pkusuario+"/eventosAsistencia";// ruta donde se encuentran los eventos suscritos del usuario
	var useSoloUnaVes = 0;
    usarJsonReferencia(referenciaEventossuscritos,function(value,result){// esta funcion retorna en la variable result el vector con los pk eventos
        if(useSoloUnaVes == 0){
            useSoloUnaVes = 1;
            if(typeof(result) == "string"){
                callback(0,[]);
                return;
            }
            callback(0,result); /// almaceno el vector pk en la segundo posicion de la funcion
        }
        
    });
}

function useEventosSuscritosPk(pkusuario,callback) { 
    var pkMisEventos=[];// vector en el que sus pocisiones son pk de eventos esto util para luego ir a la bd de eventos y recuperar los los JSON
    var referenciaEventossuscritos="usuarios/"+pkusuario+"/eventosAsistencia";// ruta donde se encuentran los eventos suscritos del usuario
    var useSoloUnaVes = 0;
    usarJsonReferencia(referenciaEventossuscritos,function(value,result){// esta funcion retorna en la variable result el vector con los pk eventos
        if(useSoloUnaVes == 0){
            useSoloUnaVes = 1;
            if(typeof(result) == "string"){
                callback(0,[]);
                return;
            }
            for(j in result){ // recorro el usuarion y almaceno las pk en el vector pkMisEventos
                 for(k in result[j]){
                    pkMisEventos.push(result[j][k].pkEvento);
                 }    
            }
            callback(0,pkMisEventos); /// almaceno el vector pk en la segundo posicion de la funcion
        }
        
    });
}



//********EVENTOS CREADOS**************************
function useEventosCreados(pkusuario,callback) {
    var pkMisEventos=[];// vector en el que sus pocisiones son pk de eventos esto util para luego ir a la bd de eventos y recuperar los los JSON
    var referenciaEventossuscritos="usuarios/"+pkusuario+"/eventosCreados";// ruta donde se encuentran los eventos suscritos del usuario
    var useSoloUnaVes = 0;
    usarJsonReferencia(referenciaEventossuscritos,function(value,result){// esta funcion retorna en la variable result el vector con los pk eventos
        if(useSoloUnaVes == 0){
            useSoloUnaVes = 1;
            if(typeof(result) == "string"){
                callback(0,[]);
                return;
            }
            callback(0,result); /// almaceno el vector pk en la segundo posicion de la funcion
        }
        
    });
}

function useEventosCreadosPk(pkusuario,callback) {
    var pkMisEventos=[];// vector en el que sus pocisiones son pk de eventos esto util para luego ir a la bd de eventos y recuperar los los JSON
    var referenciaEventossuscritos="usuarios/"+pkusuario+"/eventosCreados";// ruta donde se encuentran los eventos suscritos del usuario
    var useSoloUnaVes = 0;
    usarJsonReferencia(referenciaEventossuscritos,function(value,result){// esta funcion retorna en la variable result el vector con los pk eventos
        if(useSoloUnaVes == 0){
            useSoloUnaVes = 1;
            if(typeof(result) == "string"){
                callback(0,[]);
                return;
            }
            for(j in result){ // recorro el usuarion y almaceno las pk en el vector pkMisEventos
                 for(k in result[j]){
                    pkMisEventos.push(result[j][k].pkEvento);
                 }    
            }
            callback(0,pkMisEventos); /// almaceno el vector pk en la segundo posicion de la funcion
        }
        
    });
}








function usarJsonReferencia(refStr, callback){
    var referencia = database.ref(refStr);
    referencia.on('child_added', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
    });
}



//******************MODO DE USO************************************

// Si se quiere Obtener  los EVENTOS SUSCRITOS 
/*

useEventosSuscrito("pepito@pp com",function(value,result){
    for(var i in result){
        var referenciaeventos="Eventos/"+result[i];
        usarJsonReferencia(referenciaeventos,function(value,result){
            console.log(result.hora);
        });
         
    }
});

              EVENTOS CREADOS

useEventosCreados("pepito@pp com",function(value,result){
    for(var i in result){
        var referenciaeventos="Eventos/"+result[i];
        usarJsonReferencia(referenciaeventos,function(value,result){
            console.log(result.hora);
        });
         
    }
});*/





