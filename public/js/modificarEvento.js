var nomEvento;
var deporEvento;
var numPersonas;
var dia;
var mes;
var year;
var hora;
var minuto;
var lugar;
var creador;
var cuposLlenos;
var genero;
var edadMin;
var edadMax;
var notas;
var participantes;

var campoEdadMin;
var campoEdadMax;
var campoNPersonas;

var PK;
var dir;
var validar;
var deporteUrl;
var pKUrl;
var referencia;

var jsonModificado;
var json;

main();


usarJsonReferencia(referencia,function(value,result){
   json = result;
   console.log(json);
});
activarModificar(json);// Esta linea inicia todo este codigo
    
function colocarDatos(){// Este metodo ubica los valores del json en el formulario

    deporEvento = json.deporte;
    creador = json.creador;
    cuposLlenos = json.cuposLlenos;
    genero = json.genero;
    notas = json.notas;
    participantes = json.participantes;
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
    document.getElementById("editeNota").value = json.notas;
    document.getElementById("deporEvento").disabled = true;
    document.getElementById("dia").disabled = true;
    document.getElementById("mes").disabled = true;
    document.getElementById("year").disabled = true;
    document.getElementById("hora").disabled = true;
    document.getElementById("minuto").disabled = true;
    
    
}
function validarDatos(){//Esta funcion captura los datos que edito y valida que no pasen los limites
  
    nomEvento =  document.getElementById("nomEvento").value;
    numPersonas =  document.getElementById("numPersonas").value;
    dia = document.getElementById("dia").value;
    mes = document.getElementById("mes").value;
    year = document.getElementById("year").value;
    hora = document.getElementById("hora").value;
    minuto = document.getElementById("minuto").value;
    lugar = document.getElementById("lugar").value;
    edadMin = document.getElementById("edadMin").value;
    edadMax = document.getElementById("edadMax").value;
    notas = document.getElementById("editeNota").value;
    
    campoEdadMax = json.edadMaxima;
    if(edadMax < campoEdadMax){
        alert("No se puede disminuir la edad maxima");
        document.getElementById("edadMax").value = json.edadMaxima;
        edadMax = campoEdadMax;
        return false;
    }
    campoEdadMin = json.edadMinima;
    console.log(campoEdadMin);
    if(edadMin > campoEdadMin){
        document.getElementById("edadMin").value = json.edadMinima;
        alert("No se puede aumentar la edad minima");           
        edadMin = campoEdadMin;
        return false;
    }
    
    campoNPersonas = json.cuposLlenos;
    if(numPersonas < campoNPersonas){
        alert("No se puede disminuir el numero de personas");
        document.getElementById("numPersonas").value = json.cuposTotales;
        numPersonas = campoNPersonas;
        return false;
    }
    else{
        return true;
    }
}

    
function activarModificar(jn){//Este set debe ser llamado inicialmente para enviar el json actual y poder modificarlo, activa los demas metodos
    this.json = jn;  
    colocarDatos();
}
    
function actualizarParaLeerDatos(){
    validar = validarDatos();
    jsonModificado = { // crea un json con los valores editados para luego sobreescribirlo y enviarlo
               
          "creador" : creador,
          "cuposLlenos" : cuposLlenos,
          "cuposTotales" : numPersonas,
          "deporte" : deporEvento,
          "dia" : dia,
          "edadMaxima" : edadMax,
          "edadMinima" : edadMin,
          "genero" : genero,
          "hora" : hora,
          "lugar" : lugar,
          "mes" : mes,
          "minuto" : minuto,
          "nombre" : nomEvento,
          "notas" : notas,
          "participantes" : participantes,
          "year" : year
    }
    console.log(edadMin);
    
    json = jsonModificado;
    console.log(json);
    
    console.log(json.creador);
    PK = json.creador+" "+json.dia+" "+json.mes+" "+json.year+" "+json.hora+" "+json.minuto;
    console.log(PK);
    dir = 'Eventos/'+deporEvento+"/"+PK+'/informacion';
    console.log(dir);
    
    actualizar(dir,json);
}
    
function actualizar(dir,json){ // valida los datos si estan bien actualiza y si no envia un mensaje
    
    if(validar == true){
        //console.log(dir +"                                 "+this.json);
        updateReferencia(dir,this.json);
    }else{
        alert("No se puedo completar la actalización de datos");
        return;
    }

}

function usarJsonReferencia(refStr, callback){
	var referencia = database.ref(refStr);
	referencia.on('value', function(snapshot) {//Funcion asincrona
		callback(0, snapshot.val());//Se ejecuta callback para usar la referencia cuando se tenga
	});
}

function main(){
	/*var URLactual = window.location.toString();
	var entradaVec = URLactual.split("/");
	deporteUrl = entradaVec[entradaVec.length-1];
    pKUrl = entradaVec[entradaVec.length-2];
    pKUrl = convertir(pKUrl);*/
    deporteUrl = "Atletismo";
    pKUrl = "a@a%20com%2001%2002%202017%206%2024";
    pKUrl = convertir(pKUrl);
    referencia = "Eventos/"+deporteUrl+"/"+pKUrl+"/informacion";
    console.log(pKUrl);
}


var url = "http//:localhost:8080/Atletismo/a@a%20com%2001%2002%202017%206%2024"
function convertir(url){
    var aCambiar = /%20/g;
    var cambio = " ";
    var nuevoString = url.replace(aCambiar,cambio);
    return nuevoString;
}

