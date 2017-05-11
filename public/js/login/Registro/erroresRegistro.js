
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