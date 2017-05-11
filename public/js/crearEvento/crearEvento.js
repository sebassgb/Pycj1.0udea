var nomEvento;
var deporEvento;
var numPersonas;
var dia;
var mes;
var year;
var hora;
var minuto;
var lugar;

var control=true;//Esta variable nos controla que el usuario hizo click en ver más opciones


function retengaDatos(){//Cuando le de en más opciones debe retener éstos datos
  control=false;
  nomEvento =  document.getElementById("nomEvento").value;
  deporEvento =  document.getElementById("deporEvento").value;
  numPersonas =  document.getElementById("numPersonas").value;
  dia=  document.getElementById("dia").value;
  mes=  document.getElementById("mes").value;
  year=  document.getElementById("year").value;
  hora =  document.getElementById("hora").value;
  minuto=  document.getElementById("minuto").value;
  lugar=  document.getElementById("lugar").value;

}

function guardeDatos(){/*Esta función al darle click al boton guardar del html me recupera datos y los guarda en un JSON*/
  if(control){
    nomEvento =  document.getElementById("nomEvento").value;
    deporEvento =  document.getElementById("deporEvento").value;
    numPersonas =  document.getElementById("numPersonas").value;
    dia=  document.getElementById("dia").value;
    mes=  document.getElementById("mes").value;
    year=  document.getElementById("year").value;
    hora =  document.getElementById("hora").value;
    minuto=  document.getElementById("minuto").value;
    lugar=  document.getElementById("lugar").value;
  }

  var evento= {//JSON que contiene datos principales del evento
      nombre: nomEvento,
      deporte: deporEvento,
      personas: numPersonas,
      dia: dia,
      mes: mes,
      year: year,
      hora: hora,
      minuto: minuto,
      lugar: lugar
    }

}
