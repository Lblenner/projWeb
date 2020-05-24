import fetch from 'isomorphic-unfetch'

const url = "https://martine.rest"

export const uploadImage = async (img) => {
  console.log(JSON.stringify(img))
  const formData = new FormData();

  formData.append("image", img);
  formData.append("type", "file");

  const requestHeaders: HeadersInit = new Headers({ Authorization: 'Client-ID 024ab219c29e9f3' });

  //e38534b89de183c1405736b8ecf958ed1f904705

  return fetch("https://api.imgur.com/3/image", {
    method: 'POST',
    headers: requestHeaders,
    body: formData
  });
}


export const getRecette = (id) => {

  const requestHeaders = {
    'Content-Type': 'application/json'
  }

  var myInit = {
    method: 'GET',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials
  };

  return fetch(url + "/api/v1/recettes/" + id, myInit)

}

export const addRecette = (recette, token) => {


  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('authorization', 'Basic ' + token);
  requestHeaders.set('accept', 'application/json');


  var myInit = {
    method: 'POST',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(recette)
  };

  return fetch(url + "/api/v1/recettes", myInit)
}

export const getCommentaires = (id) => {

  const requestHeaders = {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }

  var myInit = {
    method: 'GET',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials
  };

  return fetch(url + "/api/v1/recettes/" + id + "/commentaires", myInit)

}

export const addCommentaire = (recetteid, commentaire, token) => {

  let body =
    "texte=" + commentaire

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('authorization', 'Basic ' + token);


  var myInit = {
    method: 'POST',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials,
    body: body
  };

  return fetch(url + "/api/v1/recettes/" + recetteid + "/commentaires", myInit)
}



export const getUser = (username) => {

  const requestHeaders = {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }

  var myInit = {
    method: 'GET',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials,
  };

  return fetch(url + "/api/v1/users/" + username, myInit)
}

export const patchUser = (username, token, password = null, bio = null, photo = null, nom = null, date = null, mail = null) => {

  let user = ""
  user = user.concat(password ? "&password=" + password : "")
  user = user.concat(bio ? "&biographie=" + bio : "")
  user = user.concat(date ? "&dateNaissance=" + date : "")
  user = user.concat(photo ? "&photo=" + photo : "")
  user = user.concat(nom ? "&fullname=" + nom : "")
  user = user.concat(mail ? "&email=" + mail : "")


  if (user.length > 0) {
    user = user.substring(1);
  }

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('authorization', 'Basic ' + token);

  var myInit = {
    method: 'PATCH',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials,
    body: user
  };

  return fetch(url + "/api/v1/users/" + username, myInit)

}

export function createUser(fullname, username, password) {

  let user =
    "username=" + username +
    "&password=" + password +
    "&fullname=" + fullname

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
  requestHeaders.set('accept', 'application/json');

  var myInit = {
    method: 'POST',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials,
    body: user
  };

  return fetch(url + "/api/v1/users", myInit)

}

export const addNote = (recetteid, value, token) => {

  let body =
    "valeur=" + value

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('authorization', 'Basic ' + token);


  var myInit = {
    method: 'POST',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials,
    body: body
  };

  return fetch(url + "/api/v1/recettes/" + recetteid + "/notes", myInit)
}

export const getNotes = (id) => {

  const requestHeaders = {
    'Content-Type': 'application/json'
  }

  var myInit = {
    method: 'GET',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials
  };

  return fetch(url + "/api/v1/recettes/" + id + "/notes", myInit)

}

export const removeNote = (recetteid, noteid, token) => {

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('authorization', 'Basic ' + token);

  var myInit = {
    method: 'DELETE',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials
  };

  return fetch(url + "/api/v1/recettes/" + recetteid + "/notes/" + noteid, myInit)

}

export const getRecettes = () => {

  const requestHeaders: HeadersInit = { 'Content-Type': 'application/json' }

  var myInit = {
    method: 'GET',
    headers: requestHeaders,
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
    credentials: 'include' as RequestCredentials
  };

  return fetch(url+"/api/v1/recettes", myInit)  
}