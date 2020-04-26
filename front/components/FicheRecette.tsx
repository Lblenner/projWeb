import React from 'react'
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
type MyProps = { id: any, changeNom: any };
type MyState = { recette: any , nbParts: any};

export default class FicheRecette extends React.Component<MyProps, MyState> {

  nbParts;

  constructor(props) {
    super(props);
    this.state = {
      recette: null,
      nbParts: 0
    };
  }

  onChange = (event) => {
    this.setState({nbParts:event.target.value});
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
    var response = await fetch("https://134.122.90.48/api/v1/recettes/" + this.props.id, myInit)

    if (response.status > 400) {
      console.log("Erreur")
      return
    }

    var json = await response.json()
    console.log("Le Json : " + JSON.stringify(json))
    this.setState({ recette: json , nbParts:8 });
    this.props.changeNom(json.nom)
  }


  fiche() {
    if (this.state.recette == null) {
      return <CircularProgress />
    }

    const pourcentageIngredients = 25;
    const espaceIngredientsRecette = 10;

    const r = this.state.recette
    var photo = r.photo
    if (photo == null) {
      photo = require('../images/No_photo.jpg')
    }
    var listIng = [];
    for (let i = 0; i < r.elements.length; i++) {
      let elem = r.elements[i]
      listIng.push(<li key={elem.id}> {elem.quantite.nombre+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</li>)
    }

    var preparation = r.preparation.split("\n")
    var affichageRecette = [];
    for (let i = 0; i < preparation.length; i++) {
      affichageRecette.push(<div> {preparation[i]} <br/> </div>);
    }

    return (
      <div id="fiche_container">
        <h1>{r.nom}</h1>
        <h6 id="nomPersonne">
          <a href="/profil">{r.auteurUsername}</a>
        </h6>
        <div>
          <img src={photo} id="photo"/>
        </div>
        <div id="main">
          <div id="affichageIngrédients">
            <span id="ensParts">
              <TextField type="number" id="nbParts"
                style = {{width: '30%', marginRight: '5px', marginBottom: '5px'}}
                inputProps={{min: 0, max: 100, style: { textAlign: 'center' }}}
                value={this.state.nbParts}
                onChange={this.onChange}/>
                parts
            </span>
            <h4>Ingrédients :</h4>
              <ul id="listeIngredients">
                {listIng}
              </ul>
          </div>
          <div id="affichageRecette">
              <p>{affichageRecette}</p>
          </div>
        </div>

        <style jsx>{`
          #fiche_container {
            margin-top: 10px;
            padding: 10px;
            width: 100%;
          }

          h1 {
            text-align : center; 
          }

          h4 {
            text-decoration: underline;
            text-align : center;
            white-space : nowrap;
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

          #ensParts {
            display: flex;
            justify-content: center;
          }

          #photo {
            max-width: 100%;
            margin-bottom: 10px;
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

