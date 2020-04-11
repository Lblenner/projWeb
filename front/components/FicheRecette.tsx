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

    const r = this.state.recette
    var ing = []
    for (let i = 0; i < r.elements.length; i++) {
      let elem = r.elements[i]
      ing.push(<p key={elem.id}>{elem.quantite.nombre+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</p>)
    }

    return (
      <div id="fiche_container">
        <h1>{r.nom}</h1>
        {ing}

        <style jsx>{`
          #fiche_container {
            margin-top: 10px;
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
            width: 50%;
          }
          h1 {
            text-align : center; 
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

