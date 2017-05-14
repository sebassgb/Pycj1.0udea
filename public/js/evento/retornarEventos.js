var btn = document.getElementById("btnprueba");
var deportee="futbol";


// funcion del deporte

function retornarEventos(nameDeporte){

	var todosLosEventosDelDeporte=[];

	var bdEventos=database.ref("Eventos/"+nameDeporte); // referencia a la base de datos

	var arrayEventosDeporte={}; // vector donde alamacenamos todos los evetos del deporte x 

// 3. activamos la referencia a la base de datos para trabajar con ella, con 2 funciones , una que se ejecuta consatantemente si todo fluye correctamente entre la referencia y firebase y otra que se ejecuta en caso de presentarse errores con fire base, el parametro "value" mantiene en constante comunicacion la la bd de fire
    bdEventos.on('value',function(datos){
        //la primera funcion recorremos la lista de usuarios
        
        arrayEventosDeporte=datos.val();// obtenemos los valores raices del nodo usuarios
        // funcion de jquery que sirve para recorrer vectores es lo mismo que un for o while
        // recibe dos paramentros el array y la funcion a ejecutar con el array
        var i=0;
        $.each(arrayEventosDeporte,function(indice,valor)
        {
            var valores=valor.informacion;
            todosLosEventosDelDeporte[i]=valor.informacion;   
            i++;
        });
        // funciona de error
    },function(objetoError){
        //alert("error en la lectura "+objetoError.code);
        
    });

    //console.log(todosLosEventosDelDeporte);
    return todosLosEventosDelDeporte;
}





function pruebaretornarEventos(nameDeporte,callback){

    var todosLosEventosDelDeporte=[];

    var bdEventos="Eventos/"+nameDeporte; // referencia a la base de datos

    usarJsonReferencia(bdEventos,function(value,result){
        // 3. activamos la referencia a la base de datos para trabajar con ella, con 2 funciones , una que se ejecuta consatantemente si todo fluye correctamente entre la referencia y firebase y otra que se ejecuta en caso de presentarse errores con fire base, el parametro "value" mantiene en constante comunicacion la la bd de fire
        //la primera funcion recorremos la lista de usuarios
         // funcion de jquery que sirve para recorrer vectores es lo mismo que un for o while
        // recibe dos paramentros el array y la funcion a ejecutar con el array
        var i=0;
        $.each(result,function(indice,valor)
        {
            var valores=valor.informacion;
            todosLosEventosDelDeporte[i]=valor.informacion;   
            i++;
        });
        // funciona de error  

    });

    //console.log(todosLosEventosDelDeporte);
    return todosLosEventosDelDeporte;
}

var r=pruebaretornarEventos("rugby");
console.log(r);




function useEventosCreados(pkusuario,callback) {
    var pkMisEventos=[];
    var misEventos=[];
    var referenciaEventossuscritos="usuarios/"+pkusuario+"/"+"eventosCreados";

    usarJsonReferencia(referenciaEventossuscritos,function(value,result){

        for(j in result){
             pkMisEventos.push(result[j].pkEvento);
        }
        callback(0,pkMisEventos); 

    });
}



function usarJsonReferencia(refStr, callback){
    var referencia = database.ref(refStr);
    referencia.on('value', function(snapshot) {//Funcion asincrona
        callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
    });
}








