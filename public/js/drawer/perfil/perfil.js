// Initialize Firebase
  /*var config = {
    apiKey: "AIzaSyAS7jZPxJGfMUz_HWPyOWHabLwLNcY8nqE",
    authDomain: "cotejo-4e99d.firebaseapp.com",
    databaseURL: "https://cotejo-4e99d.firebaseio.com",
    storageBucket: "cotejo-4e99d.appspot.com",
    messagingSenderId: "921281214360"
  };

firebase.initializeApp(config);*/  // objeto para aceder a la bd
llenarInfo();//Carga datos iniciales
 var username;
 var genero;
 var edad;
 var database = firebase.database(); // objeto para hacer uso de la bd
 var listaFavoritos=["vacio","vacio","vacio","vacio","vacio"];
 var control=0;//Control que limita numero de deportes escogidos
 var controlDeporte=true, controlRepetido=true;//Auxuliares para repetidos
 var nuevoLi;
 var posicionRepetido;//Almacena posición del vector del elemento repetido
 //var newsSports = 

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
          console.log(nuevoLi);
          //if(nuevoLi != "undefined"){
            li.innerHTML='<div id="'+nuevoLi+'"onclick="eliminar(this)"><img src="../../src/'+nuevoLi+'.png"></div>';
          //}
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

function llenarInfo(){
    //var identificador = retornarUsuarioConcurrente();//Me retorna el usuario actual
retornarUsuarioConcurrente(function(value,result){
  var referencia = "usuarios/"+result;
  var bdEventos=database.ref(referencia);
  bdEventos.on('value',function(datos){
          //la primera funcion recorremos la lista de usuarios
       var datos =  datos.val();// obtenemos los valores raices del nodo usuarios
       document.getElementsByClassName("nombrePerfil")[0].innerHTML = datos.nombre;
       document.getElementsByClassName("generoPerfil")[0].innerHTML = datos.genero;
       document.getElementsByClassName("edadPerfil")[0].innerHTML = datos.edad;
       if(typeof(datos.deportesFavoritos) == "string"){
          return;
       }
        if(datos.deportesFavoritos.deporte1!=="vacio"){add_mys(datos.deportesFavoritos.deporte1);}
        if(datos.deportesFavoritos.deporte2!=="vacio"){add_mys(datos.deportesFavoritos.deporte2);}
        if(datos.deportesFavoritos.deporte3!=="vacio"){add_mys(datos.deportesFavoritos.deporte3);}
        if(datos.deportesFavoritos.deporte4!=="vacio"){add_mys(datos.deportesFavoritos.deporte4);}
        if(datos.deportesFavoritos.deporte5!=="vacio"){add_mys(datos.deportesFavoritos.deporte5);}

      },function(objetoError){
          //alert("error en la lectura "+objetoError.code);
      });
});
}

function guardarPerfil(){//Retornamos el vector con los deportes favoritos
    var favoritos= {//JSON que contiene deprotes favoritos del usuario
      deportesFavoritos:{
        deporte1: listaFavoritos[0],
        deporte2: listaFavoritos[1],
        deporte3: listaFavoritos[2],
        deporte4: listaFavoritos[3],
        deporte5: listaFavoritos[4]
      } //cuando se crea un evento el unico participante en el momento es el creador de este
   }
retornarUsuarioConcurrente(function(value,result){
    var referencia = "usuarios/"+result;//Buscamos la referencia
    var bdEventos=database.ref(referencia).update(favoritos);//Actualizamos la BD con los deportes favoritos
});
//document.getElementById("addSports").style.display = "none";
}

function find_mys(contenido)//Recuperamos deportes favoritos
{
 var el = document.getElementById("mySports").getElementsByTagName("li");
   for (var i=0; i<el.length; i++)
   {
     if(el[i].innerHTML==contenido)
           return false;
   }
   return true;
}

function add_mys(texto)//Recuperamos deportes favoritos
{
    var nuevoS=texto;//Con nuevoLi obtenemos el nombre del deporte que ira
      //Solo entrará aquí una vez
          if(find_mys(nuevoS))
          {
              var li=document.createElement('li');
              li.id=nuevoS;
         li.innerHTML='<div "onclick="eliminar(this)"><img src="../../src/'+nuevoS+'.png"></div>';
           document.getElementById("mySports").appendChild(li);
       }

   return false;
}
