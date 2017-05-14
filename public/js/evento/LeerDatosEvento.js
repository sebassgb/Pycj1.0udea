// con este script leemos los datos del evento,para luego crearlo 
var fecha= new Date();
var nomEvento;
var deporEvento;
var numPersonas;
var dia;
var mes;
var year;
var hora;
var minuto;
var lugar;
var Genero;
var edadMin;
var edadMax;
var notas;

//damy12345@hotmail.com
//puma12


function genero(gender){
  Genero = gender;
}

function guardeDatos(){/*Esta función al darle click al boton guardar del html me recupera datos y los guarda en un JSON*/
  
    nomEvento =  document.getElementById("nomEvento").value;
    deporEvento =  document.getElementById("deporEvento").value;
    numPersonas =  document.getElementById("numPersonas").value;
    dia=  document.getElementById("dia").value;
    mes=  document.getElementById("mes").value;
    if(document.getElementById("year").value==fecha.getFullYear()||document.getElementById("year").value==fecha.getFullYear()+1){
      year=  document.getElementById("year").value;
    }
    else{
      year=fecha.getFullYear();
      alert("Excedes en el numero de año permitido");
    }
    
    hora =  document.getElementById("hora").value;
    minuto=  document.getElementById("minuto").value;
    lugar=  document.getElementById("lugar").value;
    edadMin =  document.getElementById("edadMin").value;
    edadMax =  document.getElementById("edadMax").value;
    notas =  document.getElementById("editeNota").value; 

    // leemos que usuario se encuentra  logeado, el cual es el creador del evento
  var pkUsuario;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    pkUsuario =user.email;
    pkUsuario=quitarPuntoCorreo(pkUsuario);
    var evento= {//JSON que contiene datos principales del evento
      creador:pkUsuario,
      nombre: nomEvento,
      edadMinima: edadMin,
      edadMaxima: edadMax,
      deporte: deporEvento,
      cuposTotales: numPersonas,
      cuposLlenos:1, // incialmente ya que solo el que creo el eveo esta inscrito en el
      genero: Genero,
      notas: notas,      
      lugar: lugar,
      dia: dia,
      mes: mes,
      year: year,      
      hora: hora,
      minuto: minuto,      
      participante:{pkUsuario}, //cuando se crea un evento el unico participante en el momento es el creador de este
   }     
   // creamos el evento en la base de datos 
    crearEventoBasico(pkUsuario,evento);
    } else {
      alert("no hay nadie en sesion");
    }
  });

  
 
  

}


// estos metodos permiten quitar puntos  de un string

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
