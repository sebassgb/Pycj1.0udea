//Comentario
//Hola
//new
//new2
//as
//asds
var json = {//Formato del Json Evento, para hacer pruebas
	"creador":"pkUsuario",
    "nombre": "nomEvento",
    "edadMinima": "5",
    "edadMaxima": "20",
    "deporte": "deporEvento",
    "cuposTotales": "20",
    "cuposLlenos":"10", // incialmente ya que solo el que creo el eveo esta inscrito en el
    "genero": "Genero",
    "notas": "notas",      
    "lugar": "lugar",
    "dia": "02",
    "mes": "04",
    "year": "2017",      
    "hora": "hora",
    "minuto": "minuto",      
}

var eventos = [];//Guarda los eventos que se ven en pantalla


function xya(){
	agregarParticipantes();
}

var divLobby = document.getElementById("divLobby");//captura el div donde trabajara este js
var divEvento = document.getElementsByClassName("divInfoEvento")[0];//captura la plantilla de evento
divLobby.removeChild(divEvento);//borrar la plantilla
divEvento.style.visibility = "visible";//Hecho para que los eventos a incertar se vean y las plantillas inicialmente no
var divEventoCompleto = document.getElementById("divVistaEventoNoRelacionado");//captura la plantilla de evento completo
divLobby.removeChild(divEventoCompleto);//borrar la plantilla
divEventoCompleto.style.visibility = "visible";//Hecho para que los eventos a incertar se vean y las plantillas inicialmente no




function agregarAlInicioEvento(infoEvento){
	var newEvento = llenarInfoBase(infoEvento, divEvento.cloneNode(true));
	var referencia = document.getElementsByClassName("divInfoEvento")[0];
	if(referencia == "undefined"){
		divLobby.appendChild(newEvento);
	}else{
		divLobby.insertBefore(newEvento,referencia);
	}

	newEvento.getElementsByClassName("labelId")[0].innerHTML = eventos.length;
	newEvento.onclick = function(){
		var posVector = newEvento.getElementsByClassName("labelId")[0].innerHTML;
		var jsonEvento = eventos[posVector]
		var divCompleto = llenarInfoCompleta(jsonEvento, divEventoCompleto.cloneNode(true));
		divLobby.appendChild(divCompleto);
		activarSeccionesInvisibles();

		var j = document.getElementById("btAbe");//Evento Cerrar Por el momento
		j.onclick = xya;
	}
	eventos[eventos.length] = infoEvento;
}

function agregarAlFinalEvento(infoEvento){
	var newEvento = llenarInfoBase(infoEvento, divEvento.cloneNode(true));
	divLobby.appendChild(newEvento);

	newEvento.getElementsByClassName("labelId")[0].innerHTML = eventos.length;
	newEvento.onclick = function(){
		var posVector = newEvento.getElementsByClassName("labelId")[0].innerHTML;
		var jsonEvento = eventos[posVector]
		var divCompleto = llenarInfoCompleta(jsonEvento, divEventoCompleto.cloneNode(true));
		divLobby.appendChild(divCompleto);
		activarSeccionesInvisibles();

		var j = document.getElementById("btAbe");//Evento Cerrar Por el momento
		j.onclick = xya;
	}
	eventos[eventos.length] = infoEvento;
}

function addListaEventoAlFinal(listaEventos){
	for (var i = 0; i < listaEventos.length; i++) {
		listaEventos[i].relacion = "";
		agregarAlFinalEvento(listaEventos[i]);
	}
}

function addListaEventoAlInicio(listaEventos){
	listaEventos = listaEventos.reverse();
	for (var i = 0; i < listaEventos.length; i++) {
		agregarAlInicioEvento(listaEventos[i]);
	}
}

function llenarInfoBase(xJson, elemento){
	elemento.getElementsByClassName("respuestaDeporteInfo")[0].innerHTML = xJson.deporte;
	elemento.getElementsByClassName("respuestanombreInfo")[0].innerHTML = xJson.nombre;
	elemento.getElementsByClassName("respuestanombreInfo")[1].innerHTML = xJson.cuposLlenos+"/"+xJson.cuposTotales;
	elemento.getElementsByClassName("labelFecha")[0].innerHTML = xJson.dia+"/"+xJson.mes+"/"+xJson.year;
	elemento.getElementsByClassName("labelHora")[0].innerHTML = xJson.hora+": "+xJson.minuto;
	elemento.getElementsByClassName("labelLocalizacion")[0].innerHTML = xJson.lugar;
	elemento.getElementsByClassName("labelRelacion")[0].innerHTML = "Admin";
	return elemento;
}

function llenarInfoCompleta(xJson, elemento){
	var res = llenarInfoBase(xJson, elemento);
	res.getElementsByClassName("resRestriccion")[0].innerHTML = xJson.genero;
	res.getElementsByClassName("resRestriccion")[1].innerHTML = xJson.edadMinima+" - "+xJson.edadMaxima;
	if (xJson.relacion == "Admin") {
		res.getElementsByClassName("btOpcionesEventos")[1].style.display = "inline";
		res.getElementsByClassName("btOpcionesEventos")[2].style.display = "inline";
	}
	if (xJson.relacion == "Suscrito") {
		res.getElementsByClassName("btOpcionesEventos")[3].style.display = "inline";
	}
	if (xJson.relacion == "") {
		res.getElementsByClassName("btOpcionesEventos")[0].style.display = "inline";
	}
	res.getElementsByClassName("btOpcionesEventos")[4].style.display = "inline";
	return res;
}

function copyJSON(x){
	return JSON.parse(JSON.stringify(x));
}

var funcionCerrarEvento = function(){
	var referencia = document.getElementById("divVistaEventoNoRelacionado");
	if(referencia != "undefined"){
		divLobby.removeChild(referencia);
		document.getElementById("divCierreTop").style.background = "none";
		document.getElementById("divCierreBottom").style.background = "none";
		document.getElementById("divCierreLeft").style.background = "none";
		document.getElementById("divCierreRigth").style.background = "none";
	}
}

document.getElementById("divCierreTop").onclick = funcionCerrarEvento;
document.getElementById("divCierreBottom").onclick = funcionCerrarEvento;
document.getElementById("divCierreLeft").onclick = funcionCerrarEvento;
document.getElementById("divCierreRigth").onclick = funcionCerrarEvento;


function activarSeccionesInvisibles(){
	document.getElementById("divCierreTop").style.background = "gray";
	document.getElementById("divCierreBottom").style.background = "gray";
	document.getElementById("divCierreLeft").style.background = "gray";
	document.getElementById("divCierreRigth").style.background = "gray";
}

var eventosIniciales = retornarEventos("futbol");


setTimeout(function (){
	addListaEventoAlFinal(eventosIniciales);
}, 2500);










/*agregarAlInicioEvento(json);
/*var json2 = copyJSON(json);
json2.nombre = "Otro nombre"
var json3 = copyJSON(json);
json3.nombre = "Otro nombre2"
var json4 = copyJSON(json);
json4.nombre = "Otro nombre3"
agregarAlFinalEvento(json2);
agregarAlFinalEvento(json3);
agregarAlFinalEvento(json4);*/