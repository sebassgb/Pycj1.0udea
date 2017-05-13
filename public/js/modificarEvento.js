
var json = {//Formato del Json Evento, para hacer pruebas
	"creador": "pkUsuario",
    "nombre": "Cebollitas Cracks",
    "edadMinima": "5",
    "edadMaxima": "20",
    "deporte": "Futbol",
    "cuposTotales": "20",
    "cuposLlenos": "10", // incialmente ya que solo el que creo el eveo esta inscrito en el
    "genero": "Genero",
    "notas": "notas",      
    "lugar": "lugar",
    "dia": "02",
    "mes": "04",
    "year": "2017",      
    "hora": "01",
    "minuto": "30",      
    }


var nomEvento;
var deporEvento;
var numPersonas;
var dia;
var mes;
var year;
var hora;
var minuto;
var lugar;

var Genero;
var edadMin;
var edadMax;
var notas;

var campoEdadMin;
var campoEdadMax;
var campoNPersonas;


function genero(gender){
  Genero = gender;
}
function setJson(jn){//Este set debe ser llamado inicialmente para enviar el json actual y poder modificarlo
    this.json = jn;  
    alert(jn);
}

function colocarDatos(){// Este metodo ubica los valores del json en el formulario
    document.getElementById("nomEvento").value = json.nombre;
    document.getElementById("deporEvento").value = json.deporte;
    document.getElementById("numPersonas").value = json.cuposTotales;
    document.getElementById("dia").value = json.dia;
    document.getElementById("mes").value = json.mes;
    document.getElementById("year").value = json.year;
    document.getElementById("hora").value = json.hora;
    document.getElementById("minuto").value = json.minuto;
    document.getElementById("lugar").value = json.lugar;
    document.getElementById("edadMin").value = json.edadMinima;
    document.getElementById("edadMax").value = json.edadMaxima;
    //document.getElementById("editeNota").value = "";
    document.getElementById("deporEvento").disabled = true;
    document.getElementById("dia").disabled = true;
    document.getElementById("mes").disabled = true;
    document.getElementById("year").disabled = true;
    document.getElementById("hora").disabled = true;
    document.getElementById("minuto").disabled = true;
    
    
}
colocarDatos();
function validarDatos(){//Esta funcion captura los datos que edito y valida que no pasen los limites
  
    nomEvento =  document.getElementById("nomEvento").value;
    deporEvento =  document.getElementById("deporEvento").value;
    numPersonas =  document.getElementById("numPersonas").value;
    dia=  document.getElementById("dia").value;
    mes=  document.getElementById("mes").value;
    year=  document.getElementById("year").value;
    hora =  document.getElementById("hora").value;
    minuto=  document.getElementById("minuto").value;
    lugar=  document.getElementById("lugar").value;
    edadMin =  document.getElementById("edadMin").value;
    edadMax =  document.getElementById("edadMax").value;
    notas =  document.getElementById("editeNota").value;
    
    campoEdadMax = json.edadMaxima;
    if(edadMax<campoEdadMax){
        alert("No se puede disminuir la edad maxima");
        document.getElementById("edadMax").value = json.edadMaxima;
        return false;
    }
    campoEdadMin = json.edadMinima;
    if(edadMin>campoEdadMin){
        document.getElementById("edadMin").value = json.edadMinima;
        alert("No se puede aumentar la edad minima");
        
        
        return false;
    }
    
    campoNPersonas = json.cuposLlenos;
    if(numPersonas<campoNPersonas){
        alert("No se puede disminuir el numero de personas");
        document.getElementById("numPersonas").value = json.cuposTotales;
        return false;
    }
    return true;
}

var jsonModificado = { // crea un json con los valores editados para luego sobreescribirlo y enviarlo
    "nombre": nomEvento,
    "edadMinima": nomEvento,
    "edadMaxima": edadMax,
    "deporte": deporEvento,
    "cuposTotales": numPersonas,     
    "lugar": lugar,
    "dia": dia,
    "mes": mes,
    "year": year,      
    "hora": hora,
    "minuto": minuto, 
}

json = jsonModificado;

var PK = json.creador+" "+json.dia+" "+json.mes+" "+json.year+" "+json.hora+" "+json.minuto;
var dir = 'Eventos/'+deporEvento+"/"+PK+'/informacion';

function actualizar(){ // valida los datos si estan bien actualiza y si no envia un mensaje
    var validar = validarDatos();
    
    if(validar == true){
        updateReferencia(dir,json);
    }else{
        alert("No se puedo completar la actalización de datos");
        return;
    }

}



 


