import axios from "axios";

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

export async function getRazas() {
  return fetch("http://localhost:3000/razas", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function getClases() {
  return fetch("http://localhost:3000/clases", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function getTransfondos() {
  return fetch("http://localhost:3000/transfondos", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function getHabilidades() {
  return fetch("http://localhost:3000/habilidades", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function getIdiomas() {
  return fetch("http://localhost:3000/idiomas", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function getCompetencias() {
  return fetch("http://localhost:3000/competencias", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function getConjuros() {
  return fetch("http://localhost:3000/conjuros", requestOptions)
    .then((response) => response.json())
    .then((result) => { return result })
    .catch((error) => console.error(error));
}

export async function rellenarFicha(character) {
  const url = 'http://localhost:3000/crearFicha';

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob'
  };

  try {
    const response = await axios.post(url, character, config);
    return response.data; 
  } catch (error) {
    return error.response.data; 
  }
}