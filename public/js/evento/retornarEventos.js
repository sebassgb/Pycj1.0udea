// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAS7jZPxJGfMUz_HWPyOWHabLwLNcY8nqE",
    authDomain: "cotejo-4e99d.firebaseapp.com",
    databaseURL: "https://cotejo-4e99d.firebaseio.com",
    storageBucket: "cotejo-4e99d.appspot.com",
    messagingSenderId: "921281214360"
  };

firebase.initializeApp(config);  // objeto para aceder a la bd
var database = firebase.database(); // objeto para hacer uso de la bd

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
















