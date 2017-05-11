/* Funcion que añade un <li> dentro del <ul>
http://www.lawebdelprogramador.com/codigo/JavaScript/2680-Agregar-y-eliminar-elementos-li-de-una-lista-ul-con-javascript.html
*/
var user = firebase.auth().currentUser;//obtenemos usuario logueado actualmente
var listaFavoritos=[];
var control=0;//Control que limita numero de deportes escogidos
var controlDeporte=true, controlRepetido=true;//Auxuliares para repetidos
var nuevoLi;
var posicionRepetido;//Almacena posición del vector del elemento repetido

if (user != null) {//Obtenemos usuario actualmente logueado
  
}

function add_li(texto)//Recuperamos el texto del elemento a
{
    nuevoLi=texto;//Con nuevoLi obtenemos el nombre del deporte que ira
      //Solo entrará aquí una vez
      if(control==0&&controlRepetido){//El vector se encuentra vacío
        listaFavoritos[control]=nuevoLi;//Aquí le llenamos la primera posición
        if(find_li(nuevoLi))
        {
          var li=document.createElement('li');
          li.id=nuevoLi;
          li.innerHTML='<div id="'+nuevoLi+'"onclick="eliminar(this)"><img src="../../src/'+nuevoLi+'.png"></div>';
          if(control<=5)document.getElementById("addSports").appendChild(li);
            control=control+1;//Aumentamos numero de deportes que lleva el usuario
            controlRepetido=false;
        }
    }else{
        controlDeporte=verificaDeporte(nuevoLi);//Verificamos que no se repita
        if(controlDeporte){
          listaFavoritos[control]=nuevoLi;//Aquí le llenamos la primera posición
          if(find_li(nuevoLi))
          {
              var li=document.createElement('li');
              li.id=nuevoLi;
         li.innerHTML='<div id="'+nuevoLi+'"onclick="eliminar(this)"><img src="../../src/'+nuevoLi+'.png"></div>';
         if(control<=5){
           document.getElementById("addSports").appendChild(li);
         control=control+1;//Aumentamos numero de deportes que lleva el usuario
       }
          }
        }
        //if(control>1){control=control-1;}//controlamos que no vaya a quedar negativa
    }
   return false;
}

function verificaDeporte(deporteFavorito){//Validamos que solo ingrese un deporte por tipo

  for (var i = 0; i < listaFavoritos.length; i++) {
    if(listaFavoritos[i]===deporteFavorito){
      posicionRepetido=i;//Almacenamos la posición donde se encuentra el repetido
      return false;//si ya se encuentra en la lista de favoritos no lo agrega
    }
  }
  return true;//si no se encuentra seguimos el proceso de agregado
}

function verificaRepetido(deporteRepetido){//Validamos que elimine del vector a enviar
  for (var i = 0; i < listaFavoritos.length; i++) {
    if(listaFavoritos[i]===deporteRepetido){
      listaFavoritos.splice(i,1);//Removemos la posición con el elemento específico.
    }
  }
}
/**
* Funcion que busca si existe ya el <li> dentrol del <ul>
* Devuelve true si no existe.
*/
function find_li(contenido)
{
 var el = document.getElementById("addSports").getElementsByTagName("li");
   for (var i=0; i<el.length; i++)
   {
     if(el[i].innerHTML==contenido)
           return false;
   }
   return true;
}/**
* Funcion para eliminar los elementos
* Tiene que recibir el elemento pulsado
*/
function eliminar(elemento)//Disminuimos el numero de deportes
{
  verificaRepetido(elemento.parentNode.getAttribute("id").toString());//Eliminamos elemento del vector
  control=control-1;//Controlamos numero de deportes escogidos
   var id=elemento.parentNode.getAttribute("id");
   node=document.getElementById(id);
   node.parentNode.removeChild(node);
}



function llenarInfoCompleta(xJson, elemento){
  elemento.getElementsByClassName("nombrePerfil")[0].innerHTML = xJson.nombre;
  elemento.getElementsByClassName("generoPerfil")[0].innerHTML = xJson.genero;
  elemento.getElementsByClassName("edadPerfil")[0].innerHTML = xJson.edad;  
  return elemento;
}

function guardarPerfil(){//Retornamos el vector con los deportes favoritos
  return listaFavoritos;
}