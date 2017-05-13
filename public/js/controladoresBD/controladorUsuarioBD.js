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