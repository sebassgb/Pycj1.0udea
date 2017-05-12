

var database = firebase.database(); // objeto para hacer uso de la bd


function retornarEventosSuscrito(correo) {
	var pkMisEventos=[];
	var misEventos=[];
	var pkusuario=quitarPuntoCorreo(correo);	
	var referenciaEventossuscritos=database.ref("usuarios/"+pkusuario+"/eventosAsistencia");
	var arrayEventosPorDeporte=[];

// 3. activamos la referencia a la base de datos para trabajar con ella, con 2 funciones , una que se ejecuta consatantemente si todo fluye correctamente entre la referencia y firebase y otra que se ejecuta en caso de presentarse errores con fire base, el parametro "value" mantiene en constante comunicacion la la bd de fire
    referenciaEventossuscritos.on('child_added',function(datos){
        //la primera funcion recorremos la lista de usuarios
        arrayEventosPorDeporte=datos.val();// obtenemos los valores raices del nodo usuarios
        // funcion de jquery que sirve para recorrer vectores es lo mismo que un for o while
        // recibe dos paramentros el array y la funcion a ejecutar con el array

        var i=0;
        $.each(arrayEventosPorDeporte,function(indice,valor)
        {
        	var valores=valor.pkEvento;
        	pkMisEventos[i]=valores; // ingreso todas las pk de los eventos en el vector mis eventos para luego ir por ellos

            i++;
        });
        // funciona de error
    },function(objetoError){
        //alert("error en la lectura "+objetoError.code);
        
    });

    // luego de tener la pk debo de ir a la base de datos eventos y traer los respectivos JSON de la pk Eventos

    for(var i=0;i<pkMisEventos.length;i++){
    	var jsonEvento=database.ref(pkMisEventos[i]);
    	misEventos[i]=jsonEvento;
    }

    console.log(misEventos);

    return misEventos;

}







