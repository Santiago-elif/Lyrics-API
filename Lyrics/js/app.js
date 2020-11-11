const formulario = document.querySelector('#formulario-buscar'); // Formulario completo.
const mensajes = document.querySelector('#mensajes'); // Mensajes, usualmente de error.
const letra = document.querySelector('#resultado'); // Resultado, usualmente el lyric de la canción.

formulario.addEventListener('submit', buscar); // Agregamos listener en base al input type, en este caso es un submit.

function buscar(e){

    e.preventDefault();

    // Campos obligigatorios con su contenido, utilizando .value.

    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    // Estructura de control, en el caso de que uno o ambos campos esten vacíos, agregamos un mensaje de error, el cual posee su propio estilo, definido como .error en CSS.

    if(artista === '' || cancion === ''){

        mensajes.textContent = 'Ambos campos son obligatorios!';
        mensajes.classList.add('error');
        
        setTimeout(() => { // Timeout de 2.5 segundos pra borrar el mensaje y la clase de error.
            
            mensajes.textContent = '';
            mensajes.classList.remove('error');

        }, 2500);

        return; // Retornamos.

    }

    const busqueda = new API(artista, cancion); // Buscamos el contenido de los formularios.
    busqueda.consultarAPI(); // Ejecutamos consultarAPI con dicho contenido.

}

// -------------------------------------------------------------- API -------------------------------------------------------------- //

class API{ // Clase API, con su constructor.

    constructor(artista, cancion){

        this.artista = artista
        this.cancion = cancion

    }

    consultarAPI(){

        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}` // GET de lyricsovh.

        fetch(url) // Hacemos fetch into .json into resultado.
            .then(respuesta => respuesta.json())
            .then(resultado => {

                if(resultado.lyrics){ // Si el resultado es lyrics (variable definida por el API de lyricsovh)...
                    
                    const { lyrics } = resultado;
                    letra.textContent = lyrics; // Asignamos el contenido de la div letra, en este caso, el lyric de la canción buscada.

                }else{ // Si el resultado es cualquier cosa que no sean los lyrics de la canción...

                    // Mostramos mensaje de error y le asignamos la class .error, con su respectivo estilo en CSS.

                    mensajes.textContent = 'No se pudo encontrar ningún resultado. Posible error de escritura en canción o artista!';
                    mensajes.classList.add('error');

                    setTimeout(() => { // Timeout de 2.5 segundos pra borrar el mensaje y la clase de error.
                        
                        mensajes.textContent = '';
                        mensajes.classList.remove('error');

                    }, 2500);

                }

            })

    }

}