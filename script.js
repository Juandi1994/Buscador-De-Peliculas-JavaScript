// Agregar un evento 'click' al botón de búsqueda y asociarlo a la función searchMovies
document.getElementById('searchButton').addEventListener('click', searchMovies);

// Clave de la API de The Movie Database
let api_key = '6a0d04b335096428d8847f0ee8960b04';

// URL base para realizar la búsqueda de películas
let urlBase = 'https://api.themoviedb.org/3/search/movie';

// URL base para acceder a las imágenes de las películas
let urlImg = 'https://image.tmdb.org/t/p/w200';

// Obtener el contenedor de resultados
let resultContainer = document.getElementById('results');

// Función para buscar películas
function searchMovies() {
    resultContainer.innerHTML = 'Cargando'; // Mostrar mensaje de carga

    // Obtener el valor ingresado en el campo de búsqueda
    let searchInput = document.getElementById('searchInput').value;

    // Realizar una solicitud a la API de The Movie Database
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(response => {
            displayMovies(response.results); // Llamar a la función para mostrar las películas
            clearSearchInput(); // Llamar a la función para borrar el campo de búsqueda
        });
}

// Función para mostrar películas en el contenedor de resultados
function displayMovies(movies) {
    resultContainer.innerHTML = ''; // Limpiar el contenedor de resultados

    // Si no se encontraron películas
    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda</p>';
        return;
    }

    // Recorrer la lista de películas y crear elementos para mostrar la información
    movies.forEach(movie => {
        let movieDiv = document.createElement('div'); // Crear un div para la película
        movieDiv.classList.add('movie'); // Agregar una clase CSS al div

        let title = document.createElement('h2'); // Crear un encabezado para el título
        title.textContent = movie.title; // Establecer el contenido del título

        let releaseDate = document.createElement('p'); // Crear un párrafo para la fecha de lanzamiento
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date; // Mostrar la fecha de lanzamiento

        let overview = document.createElement('p'); // Crear un párrafo para la descripción
        overview.textContent = movie.overview; // Mostrar la descripción

        let posterPath = urlImg + movie.poster_path; // Construir la URL de la imagen de la película

        let poster = document.createElement('img'); // Crear una imagen
        poster.src = posterPath; // Establecer la fuente de la imagen

        // Agregar los elementos creados al div de la película
        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        // Agregar el div de la película al contenedor de resultados
        resultContainer.appendChild(movieDiv);
    });
}

// Función para borrar el campo de búsqueda
function clearSearchInput() {
    document.getElementById('searchInput').value = ''; // Establecer el valor del campo en vacío
}
