//************* ERRORES EN LOS INGRESOS *****************************


//***CORREO Y CONTRASEÑA************************

function erroreslogin(err){

    
    var mensaje ="";
    
    var contramala="The password is invalid or the user does not have a password.";
    
    var noexiste="There is no user record corresponding to this identifier. The user may have been deleted."; 
    
    
    var malcorreo="The email address is badly formatted.";
    
    switch(err.message){
            
        case contramala:
            mensaje="la contraseña es invalida";
            break;
        case noexiste:
            mensaje="el usuario no ha sido registrado";
            break;
        case malcorreo:
            mensaje="el correo es invalido";
            break;
    }
    
    return mensaje;
    
    
    
}

//***** FACEBOOK   Y GOOGLE  *****************


function errorFacebookyGoogle(err){
        var mensaje="";

        // lista de errores posible
        var correoexiste="auth/account-exists-with-different-credential";
        var correoexistecondiferentedominio="auth/credential-already-in-use";
        var sinpermisos="auth/operation-not-allowed";
        var protocolo="auth/operation-not-supported-in-this-environment";
        var unaventana="auth/cancelled-popup-request";
        var nosecompletoinicio ="auth/popup-closed-by-user";
        var dominonoauto="auth/unauthorized-domain";// si el dominio de la aplicacion no esta autorizado

        var tipoerror=err.code;

        switch(tipoerror){
            case correoexiste:
                mensaje="el correo ya se encuentra registrado";
                break;
            case correoexistecondiferentedominio:
                 mensaje="el correo se encuentra ya en uso";
                 break;
            case sinpermisos:
                mensaje="el usuario no tiene permiso de ingresar";
                break;
            case protocolo:
                mensaje="el protocolo de conexion no es valido";
                break;
            case unaventana:
                mensaje="se cancelo el inicio de sesion";
                break;
            case nosecompletoinicio:
                mensaje="no se completo el inicio de sesion";
                break;
            case dominonoauto:
                mensaje="dominio no autorizado";
                break;
            default:
                mensaje=tipoerror;

        }

        return mensaje;


}



