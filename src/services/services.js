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
  const { 
    playerName,
    name,
    level,
    appearance,
    race, 
    subrace,
    type,
    experiencePoints,
    languages,
    proficiencies,
    skills,
    spells,
    class: clas,
    subclass,
    equipment,
    money,
    dobleSkills,
    terrain
  } = character

  const data = {
    playerName,
    name,
    level,
    experiencePoints,
    race,
    subrace,
    type,
    appearance,
    languages,
    proficiencies,
    skills,
    spells,
    class: clas,
    subclass,
    equipment,
    ability_scores: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    money: parseInt(money) ?? 0,
    dobleSkills,
    terrain
  }

  const url = 'http://localhost:3000/crearFicha';

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob'
  };

  try {
    const response = await axios.post(url, data, config);
    return response.data; 
  } catch (error) {
    return error.response.data; 
  }
}