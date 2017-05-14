// en este script se encuetran dos metodos
// 1 saber el usuarion concuerrente
// 2 retorna la informacion del perfil del usuaruio
// Initialize Firebase
 

function retornarUsuarioConcurrente(callback){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { 
      callback(0,quitarPuntoCorreo(user.email));
    } else {
    }
  });

}


 //modo de uso usuario concurrete
 /*
retornarUsuarioConcurrente(function(value,result){
  alert(result); // en result se encuentra la pkdel usuario conectado
});
*/




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




