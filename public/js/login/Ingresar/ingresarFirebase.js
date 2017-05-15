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
var auth=firebase.auth();
var ucorreo;
var ucontra;
// BOTONES CON SUS FUNCIONES
// BTN ingresar con correo
var btncorreo=document.getElementById("btnEntrar");
btncorreo.addEventListener('click',ingresarconcorreo,false);

// BTN ingreso con Facebook
var btnfb=document.getElementById("btnfacebook");// obetener del DOM el boton con el que se inicia el evento de login con facebook
btnfb.addEventListener('click',ingresoconfacebook,false); // activamos el boton de ingresar con faceboo para que sea un escuchador de eventos


// BTN ingresar con cuenta de google
var btngoogle=document.getElementById("btingresogoogle");
btngoogle.addEventListener("click",googleMas,false);
//****************** FUNCIONES DE INGRESO *************************************************
// 1) CORREO Y CONTRASEÑA
function ingresarconcorreo(){
  // capturamos los datos del fomulario ingresar
ucorreo=document.getElementById("txtcorreo").value;
ucontra=document.getElementById("txtcontra").value;
// logeamos a el usuario
const promise=auth.signInWithEmailAndPassword(ucorreo,ucontra);
 //si el logeo fue exitoso lo redireccionamos al lobby
promise.then(function(snapshot){
    location.href="html/drawer/Perfil.html";
});

// en caso de un error en el logeo
promise.catch(function(error) {
   alert(erroreslogin(error));
});
}

// 2) FACEBOOK *******************************************************
function ingresoconfacebook(){
// para ingresar con fb lo primero que hacemos es crear
// una instancia para consumir el servicio de facebook
var provider = new firebase.auth.FacebookAuthProvider();
// solicitamos a facebook los datos que necesito
provider.addScope('email'); // su correo
provider.addScope('public_profile'); // su perfil publico en el cual se encuentran datos como  su id, cover ,name, primer nombre, segundo,edad, link

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // obtengo los datos del usuario y actualizo los datos del usuario en la BD usuarios
  // actualizo los datos del usuario
  var usr= {
            nombre : user.displayName,
            correo : user.email,
            genero: "undefined",
            edad : "undefined",
            pass: "undefined",
            foto: user.photoURL,
            deportesFavoritos:{
              deporte1: "vacio",
              deporte2: "vacio",
              deporte3: "vacio",
              deporte4: "vacio",
              deporte5: "vacio"
            }
     }
    const promise=auth.createUserWithEmailAndPassword(user.email,"undefined");
    // se procede a insertar en la base de datos el objeto creado, en la raiza usuarios
    // en caso de exito en la creacion del usuario en la BD en la parte de authentificationm  procedemos a crearlo en la Real timer "BATABASE"
      var sinpunto=quitarPuntoCorreo(user.email);
      database.ref("usuarios/"+sinpunto).update(usr);
      pausa();//retrasamos unos segundos
      location.href="html/drawer/Perfil.html";
    // en caso de un error en el logeo

}).catch(function(error) {
    alert(errorFacebookyGoogle(error));
});

};

// 3)  GOOGLE + ***********************************************

function googleMas(){

      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email'); // su correo
      provider.addScope('public_profile'); // su perfil publico en el cual se encuentran datos como  su id, cover ,name, primer nombre, segundo,edad, link

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // obtengo los datos del usuario y actualizo los datos del usuario en la BD usuarios
        // actualizo los datos del usuario
        var usr= {
                  nombre : user.displayName,
                  correo : user.email,
                  genero: "undefined",
                  edad : "undefined",
                  pass: "undefined",
                  foto: user.photoURL,
                  deportesFavoritos:{
                    deporte1: "vacio",
                    deporte2: "vacio",
                    deporte3: "vacio",
                    deporte4: "vacio",
                    deporte5: "vacio"
                  }
           }
          const promise=auth.createUserWithEmailAndPassword(user.email,"undefined");
          // se procede a insertar en la base de datos el objeto creado, en la raiza usuarios
          // en caso de exito en la creacion del usuario en la BD en la parte de authentificationm  procedemos a crearlo en la Real timer "BATABASE"
            var sinpunto=quitarPuntoCorreo(user.email);
            database.ref("usuarios/"+sinpunto).update(usr);
            pausa();//retrasamos unos segundos
            location.href="html/drawer/Perfil.html";
          // en caso de un error en el logeo

      }).catch(function(error) {
          alert(errorFacebookyGoogle(error));
      });
}

//****************************************************************
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

  function pausa(){//TimeOut para detener callbacks unos segundos
  setTimeout(function (){
  }, 2500);
}
