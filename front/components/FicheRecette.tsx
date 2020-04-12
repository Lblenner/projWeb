import React from 'react'
import { CircularProgress } from '@material-ui/core';
type MyProps = { id: any, changeNom: any };
type MyState = { recette: any };

export default class FicheRecette extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      recette: null
    };
  }

  async componentDidMount() {

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    var myInit = {
      method: 'GET',
      headers: requestHeaders,
      mode: 'cors' as RequestMode,
      cache: 'default' as RequestCache,
      credentials: 'include' as RequestCredentials
    };
    var response = await fetch("http://134.122.90.48/api/v1/recettes/" + this.props.id, myInit)

    if (response.status > 400) {
      console.log("Erreur")
      return
    }

    var json = await response.json()
    console.log("Le Json : " + JSON.stringify(json))
    this.setState({ recette: json })
    this.props.changeNom(json.nom)
  }


  fiche() {
    if (this.state.recette == null) {
      return <CircularProgress />
    }

    const nbPartsInitiale = "8";
    const pourcentageIngredients = 25;
    const espaceIngredientsRecette = 10;

    const r = this.state.recette
    var listIng = [];
    for (let i = 0; i < r.elements.length; i++) {
      let elem = r.elements[i]
      listIng.push(<li key={elem.id}>{elem.quantite.nombre+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</li>)
    }
    /*var ing = [];
      for (let i = 0; i < r.elements.length; i++) {
      let elem = r.elements[i]
      ing.push(<p key={elem.id}>{elem.quantite.nombre+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</p>)
    }*/

    return (
      <div id="fiche_container">
        <h1>{r.nom}</h1>
        <h6 id="nomPersonne">
          <a href="/profil">Nom de la personne</a>
          </h6>
        <div id="main">
          <div id="affichageIngrédients">
            <p id="ensParts"><input type="number" id="nbParts" 
                min="1" max="100" step="1" value={nbPartsInitiale}/> parts</p>
            <h4>Ingrédients :</h4>
            <p id="listeIngredients">
              <ul>
                {listIng}
              </ul>
            </p>
          </div>
          <div id="affichageRecette">
            <p>Bonjour ! Voici les étapes de la recette !</p>
          </div>
        </div>

        <style jsx>{`
          #fiche_container {
            margin-top: 10px;
            padding: 10px;
            width: 60%;
          }

          h1 {
            text-align : center; 
          }

          h4 {
            text-decoration: underline;
            text-align : center;
          }

          #main {
            width: 100%;
          }

          #affichageIngrédients {
            border: 1px solid;
            border-radius: 10px;
            float: left;
            width: ${pourcentageIngredients}%;
            margin-right: ${espaceIngredientsRecette-1}px;
            padding: 10px;
          }

          #listeIngrédients {
            text-align : left;
          }

          #affichageRecette {
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
            margin-left: ${pourcentageIngredients+1}%;
          }

          #nomPersonne {
            text-align : right;
            text-decoration : underline;
          }

          #nbParts {
            width: 25%;
          }

          #ensParts {
            text-align: center;
          }

        `}</style>
      </div>
    )
  }
  render() {

    return (
      <div id="main_container">
        {this.fiche()}

        <style jsx>{`
          #main_container {
            display: flex;
            justify-content: center;
            flex-grow: 1;
          }
        `}</style>
      </div >

    )
  }
}

