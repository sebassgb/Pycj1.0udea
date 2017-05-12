// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAS7jZPxJGfMUz_HWPyOWHabLwLNcY8nqE",
    authDomain: "cotejo-4e99d.firebaseapp.com",
    databaseURL: "https://cotejo-4e99d.firebaseio.com",
    storageBucket: "cotejo-4e99d.appspot.com",
    messagingSenderId: "921281214360"
  };

firebase.initializeApp(config);  // objeto para aceder a la bd

 
// variables del formulario
var unombre;
var ucorreo;
var selectgenero;
var pos;
var ugenero;
var uedad;
var upass;
var urepass;  
     
var database = firebase.database(); // objeto para hacer uso de la bd


    
//var usuariosregistrados=new Array();// almacenamos un vector con todos los usuarios creados    


//crearvectorusuarios();// llenamos el vector usuariosregistrados, para con este validar que el correo no se repita
    
    
  // cuando le den click en el boton registrarse se activa la siguiente funcion , donde crea el usuario en la bd
formButton.addEventListener('click', e => {

 // capturamos los datos del formulario para registrar el usuario        

     unombre = document.getElementById("txtnombre").value;
     ucorreo= document.getElementById("txtcorreo").value;

     selectgenero=document.getElementById("slgenero");
     pos= selectgenero.selectedIndex;
     ugenero = selectgenero.options[pos].value;

     uedad= document.getElementById("edad").value;
     upass= document.getElementById("txtcontraseña").value;    
     urepass=document.getElementById("txtrepeatcontraseña").value;        
        
    if(validarcamposformulario()===false){ // validamos que los campos del formulario sea valido 
        crearusuario();// creamos el usuario, luego de las validaciones
       
    } 



           
        
  }); 






/*function crearvectorusuarios(){
       // 1.creamos la referencia a la base de datos
    var referenciausr=database.ref("usuarios");
    // 2. creamos arreglo de usuarios para recorrer
    var arrayusuarios={};
    // 3. activamos la referencia a la base de datos para trabajar con ella, con 2 funciones , una que se ejecuta consatantemente si todo fluye correctamente entre la referencia y firebase y otra que se ejecuta en caso de presentarse errores con fire base, el parametro "value" mantiene en constante comunicacion la la bd de fire
    referenciausr.on('value',function(datos){
    //la primera funcion recorremos la lista de usuarios
    
    arrayusuarios=datos.val();// obtenemos los valores raices del nodo usuarios
    // funcion de jquery que sirve para recorrer vectores es lo mismo que un for o while
    // recibe dos paramentros el array y la funcion a ejecutar con el array
    
    $.each(arrayusuarios,function(indice,valor)
    {
        usuariosregistrados[indice]=valor;    
      
        
    });

    // funciona de error
    },function(objetoError){
        //alert("error en la lectura "+objetoError.code);
        
    });

    //return respuesta;
}    */


    
function crearusuario(unombre,ucorreo,ugenero,uedad){



    // cramos el objeto a guardar en la base de datos en forma JSON
    var usr= {
            nombre :unombre,
            correo : ucorreo,
            genero: ugenero,
            edad : uedad,
            pass: upass                     
     }
        
     // creamos el usuario en la parte de Authentication para poder manejar facilmente los logeos y el restablecimiento de contraseña.
    const auth=firebase.auth(); // obejto usado para crear usuaios con correo y contraseña.
    const promise=auth.createUserWithEmailAndPassword(ucorreo,upass);
          // se procede a insertar en la base de datos el objeto creado, en la raiza usuarios
    
    // en caso de exito en la creacion del usuario en la BD en la parte de authentificationm  procedemos a crearlo en la Real timer "BATABASE"
    promise.then(function(snapshot){
        var sinpunto=quitarPuntoCorreo(ucorreo);
        database.ref("usuarios/"+sinpunto).update(usr);
        location.href="../index.html"; // lo redireccionamos a la parte de ingresar para que ingrese a la aplicacion
    });
        
// en caso de ERROR se informa cual es el error
// funcion callback se ejecuta luego del registro
    promise.catch(function(error){
        alert(erroresCreacionUsuarios(error));
    });
         
}





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



function erroresCreacionUsuarios(error){ // metodo que identifica el error que sucede al crear el usuario y retorna un string o mensaje con el error que sucedio de una manera mas amigable para el usuario.
var cuentaenuso="The email address is already in use by another account.";
var contrasenacorta="Password should be at least 6 characters";
var correoinvalido ="";// fala confirmar que el correo sea valido
var correonovalido="The email address is badly formatted.";
var tipoerror=error.message; //almacenamos el tipo de error queda almacenado en el objeto error
//window.errorencreacion=true;
var mensaje="exito";// mensaje a retornar dependiendo el error
      
    switch(tipoerror) {
        case cuentaenuso:
            mensaje="el correo se encuentra en uso";           
            break;
        case contrasenacorta:
            mensaje="la contraseña debe contener minimo 6 caracteres";
            break;                   
        case correonovalido:
            mensaje="el correo no es valido";
           break;
                
    }
    
  
return mensaje;            
}



// error en los mensaje de correo existente 

// validar todos los campos del formulario de registro
function validarcamposformulario(){
  var rs=false;

   if (unombre.length==0) {
    alert("falta el nombre");
    rs=true;

   } 
   if (ucorreo.length==0) {
    alert("falta el correo");
    rs=true;
   }
   if (uedad.length==0) {
    alert("falta la edad");
    rs=true;
   }
   if (upass.length==0) {
    alert("falta la contraseña");
    rs=true;
   }
   if (urepass.length==0) {
    alert("falta la repeticion de contraseña");
    rs=true;
   }
  if(upass != urepass ){ // validamos que las contraseñas conincidan
    alert("la contraseñas no coinciden");
    rs=true;            
  }
  return rs;
}





// falta cuadrar esta chimbita bien falta ffffffff********************











