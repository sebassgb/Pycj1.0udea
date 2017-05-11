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

var auth = firebase.auth();
var emailAddress;

function enviarEmail(){
    alert("Mensaje Enviado");
    emailAddress= document.getElementById("email").value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
    },function(error) {
    // An error happened.
    });
}




