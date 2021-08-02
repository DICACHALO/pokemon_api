// URL API

const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"; //Las variables constantes las declaramso en mayúsculas

// Obtener los resultados de la API
const getData = (API) => {
  return fetch(API)
    .then((response) => response.json())
    .then((json) => {
      pokeData(json.results), paginacion(json);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

//  const pokedata

const pokeData = (data) => {
  let html = "";
  document.getElementById("datosPersonajes").innerHTML = "";
  data.forEach((pj) => {
    const URL = pj.url;
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        llenarDatos(json, html);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
};

// Dibujar cards de personajes
const llenarDatos = (data) => {
  //console.log(data);
  let html = "";
  html += '<div class="col mt-5">';
  html += '<div class="card" style="width: 16rem;">';
  html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}"></img>`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${data.name}</h5>`;
  html += `<p class="card-text">Peso: ${data.weight}</p>`;
  html += `<p class="card-text">Altura: ${data.height}</p>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";
  document.getElementById("datosPersonajes").innerHTML += html;
};

// Paginación
const paginacion = (data) => {
  let previousDisabled = "";
  let nextDisabled = "";

  data.previous == null
    ? (previousDisabled = "disabled")
    : (previousDisabled = "");
  data.next == null ? (nextDisabled = "disabled") : (nextDisabled = "");

  let html = `<li class="page-item ${previousDisabled}"><a class="page-link" onclick="getData('${data.previous}')"> Anterior </a></li><li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${data.next}')"> Siguiente </a></li>`;
  document.getElementById("paginacion").innerHTML = html;
};

// Se ejecuta la API
getData(API);
