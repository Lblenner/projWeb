

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


export const addRecette= (recette,token) => {


    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('authorization', 'Basic ' + token);


    var myInit = {
      method: 'POST',
      headers: requestHeaders,
      mode: 'cors' as RequestMode,
      cache: 'default' as RequestCache,
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify(recette)
    };

    return fetch("https://martine.rest/api/v1/recettes", myInit)
}