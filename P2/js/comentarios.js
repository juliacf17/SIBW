var nombre = document.getElementById("nombre") ; 
var correo = document.getElementById("email") ; 
var comentario = document.getElementById("comentario") ; 

const boton = document.getElementById("enviar") ;
const more_comment = document.getElementById("more_comments") ;

const abrir = document.getElementById("new_comment") ; 
const panel = document.getElementById("comment-panel") ; 

var palabrasProhibidas = ['puta', 'tonto', 'lerdo', 'guarro'] ; 


function abrirPanel() { 
    document.getElementById("check").checked =  !document.getElementById("check").checked;
    
    if(document.getElementById("check").checked ==true ){
        abrir.innerHTML = "Cerrar Comentarios" ;
    }
    else{
        abrir.innerHTML = "Añadir Comentario" ;
    }  
}

function agregarParrafo() {

    var fecha = Date.now() ;    /*Obtener fecha actual*/
    const hoy = new Date(fecha) ;  

    /* Creamos el párrafo y añadimos la primera linea que en este caso es el nombre de quien hace el comentario */
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.style.marginTop = "0";
    var nombre_ = document.createTextNode(nombre.value);
    var parrafoNegrita = document.createElement("span") ; 
    parrafoNegrita.style.fontWeight = "bold" ;
    parrafoNegrita.appendChild(nombre_) ; 
    nuevoParrafo.appendChild(parrafoNegrita);

    /* Añadimos el salto de página para que nos muestre la fecha y hora en una linea distinta */
    var saltoPagina = document.createElement("br") ; 
    nuevoParrafo.appendChild(saltoPagina) ;  
    var fechayhora = document.createTextNode(hoy.toLocaleDateString()  + " " + hoy.toLocaleTimeString()); 
    nuevoParrafo.appendChild(fechayhora);

    /*Añadimos otro salto de página para que nos muestre el comentario en otra línea y además en cursiva */

    var saltoPagina2 = document.createElement("br") ; 
    nuevoParrafo.appendChild(saltoPagina2); 
    var c = document.createTextNode(" \""  + comentario.value + "\""); 
    var parrafoNegrita2 = document.createElement("span") ;
    parrafoNegrita2.appendChild(c) ; 
    nuevoParrafo.appendChild(parrafoNegrita2) ; 

    /* Añadimos el estilo a este nuevo parrafo que acabamos de crear */
    nuevoParrafo.style.backgroundColor = "#839680" ; 
    nuevoParrafo.style.marginBottom = "5%";
    
    more_comment.appendChild(nuevoParrafo);
  }


/*CADA VEZ QUE SE ESCRIBA SE COMPUEBAN LAS MALAS PALABRAS*/

function checkMalasPalabras(event) {                      //Convierte el array en palabra|palabra  //Búsqueda global (g) e insensible a may o min (i)
    const textoCensurado = event.target.value.replace(new RegExp(palabrasProhibidas.join("|"), "gi"), (match) => '*'.repeat(match.length));
    event.target.value = textoCensurado;
}

comentario.addEventListener('input',checkMalasPalabras) ; 

/*COMPROBACIONES AL PULSAR EL BOTÓN DE ENVIAR*/ 

function checkFormatoCorreo() {
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return (validEmail.test(correo.value)) ;    //testea la expresión regular en el correo introducido
}

/*
    ^: Coincide con el inicio de la cadena.

    \w+: Coincide con uno o más caracteres de palabra (letras, dígitos o guiones bajos).

    ([.-_+]?\w+)*: Coincide con cero o más grupos que contienen un carácter de punto (.), guion (-), guion bajo (_) o signo de más (+) opcional, seguido de uno o más caracteres de palabra.

    @: Coincide literalmente con el carácter "@".

    \w+: Coincide con uno o más caracteres de palabra (letras, dígitos o guiones bajos) antes del símbolo "@".

    ([.-]?\w+)*: Coincide con cero o más grupos que contienen un carácter de punto (.) o guion (-) opcional, seguido de uno o más caracteres de palabra después del símbolo "@".

    (\.\w{2,10})+: Coincide con uno o más grupos que contienen un punto seguido de entre 2 y 10 caracteres de palabra. Esto se utiliza para validar la extensión del dominio del correo electrónico.

    $: Coincide con el final de la cadena.
*/

boton.addEventListener('click',() => {

    if (nombre.value=="" || comentario.value=="" || correo.value=="") {
        alert("Tienes que rellenar todos lo campos para poder añadir el comentario") ; 
    }
    else if(!checkFormatoCorreo()) {
        alert("Formato de correo incorrecto") ;
        
    }
    else {
        more_comment.style.display = "block" ;      //Se muestra como un nuevo bloque
        agregarParrafo() ; 
    }
}); 