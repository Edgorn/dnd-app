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