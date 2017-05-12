
// Initialize Firebase

  var config = {

    apiKey: "AIzaSyAS7jZPxJGfMUz_HWPyOWHabLwLNcY8nqE",
    authDomain: "cotejo-4e99d.firebaseapp.com",
    databaseURL: "https://cotejo-4e99d.firebaseio.com",
    storageBucket: "cotejo-4e99d.appspot.com",
    messagingSenderId: "921281214360"
    
  };
firebase.initializeApp(config);  // objeto para aceder a la bd
//variables 


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
    enviarPerfil(); 
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

  

}).catch(function(error) {
  
    
    alert(errorFacebookyGoogle(error));
    
});
    
}

// 3)  GOOGLE + ***********************************************

function googleMas(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
        alert(user.displayName);
      console.log(user.displayName);
      // ...
    }).catch(function(error) {
      
      alert(errorFacebookyGoogle(error));
    });
}

//****************************************************************








