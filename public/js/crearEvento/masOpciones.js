var genero;
var edadMin;
var edadMax;
var notas;

function genero(gender){
  genero = gender;
}

function guardaDatos(){/*Esta función al darle click al boton guardar del html me recupera datos y los guarda en un JSON*/

    edadMin =  document.getElementById("edadMin").value;
    edadMax =  document.getElementById("edadMax").value;
    notas =  document.getElementById("editeNota").value;

    var opciones= {//JSON que contiene opcioens adicionales de los eventos
        edadMinima: edadMin,
        edadMaxima: edadMax,
        genero: gender,
        notas: notas
    }

  }
