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


function usarDeportesFavoritos(callback){//Retorna un vector con los deportes favoritos
 var listaFavsDefinitiva=[];//Vector que retorna favoritos
//console.log("paso");
retornarUsuarioConcurrente(function(value,result){
var referencia = "usuarios/"+result+"/"+"deportesFavoritos";
//console.log(referencia);
var bdEventos=database.ref(referencia);
  bdEventos.on('value',function(datos){
        //la primera funcion recorremos la lista de usuarios
        var datos =  datos.val();// obtenemos los valores raices del nodo usuarios
        if(typeof(datos) == "string"){
          //console.log(datos);
          callback(0, listaFavsDefinitiva);
          return;
        }
        $.each(datos,function(indice,valor)//Recorremos todos los datos que tenemos
        {
            var valores=valor;
            if(valores!=="vacio"){//Si no esta vacío se lo mandamos al vector
              listaFavsDefinitiva.push(valor);
            }
        });
        callback(0, listaFavsDefinitiva);
    },function(objetoError){
        //alert("error en la lectura "+objetoError.code);
    });
});
}




