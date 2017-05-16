/* Funcion que añade un <li> dentro del <ul>
http://www.lawebdelprogramador.com/codigo/JavaScript/2680-Agregar-y-eliminar-elementos-li-de-una-lista-ul-con-javascript.html
*/

var nuevoLi;

function agregarParticipantes()//Recuperamos el texto del elemento a
{
    nuevoLi="perfil";//Con nuevoLi obtenemos el nombre del deporte que ira

        if(find_li(nuevoLi))
        {
          var li=document.createElement('li');
          li.id=nuevoLi;
          li.innerHTML='<div onclick="eliminar(this)"><img src="../../../../src/'+nuevoLi+'.png"></div>';
          document.getElementById("participantes").appendChild(li);

        }
       return false;
}
/**
* Funcion que busca si existe ya el <li> dentrol del <ul>
* Devuelve true si no existe.
*/
function find_li(contenido)
{
 var el = document.getElementById("participantes").getElementsByTagName("li");
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
   var id=elemento.parentNode.getAttribute("id");
   node=document.getElementById(id);
   node.parentNode.removeChild(node);
}
