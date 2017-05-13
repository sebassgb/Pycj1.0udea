// en este script se encuetran dos metodos
// 1 saber el usuarion concuerrente
// 2 retorna la informacion del perfil del usuaruio


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


function retornarUsuarioConcurrente(){
	var user = firebase.auth().currentUser;
	if (user) {
		var correo=user.email;
		correo =quitarPuntoCorreo(correo);
		return correo;
	} else {
	  return null;
	}
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


