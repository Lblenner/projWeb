import React from 'react'
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextArea from './TextArea';
import {connect} from 'react-redux'

type MyProps = { recette, token };
type MyState = { nbParts: any};

class FicheRecette extends React.Component<MyProps, MyState> {

  nbParts;

  constructor(props) {
    super(props);
    this.state = {
      nbParts: 0
    };
  }

  onChange = (event) => {
    this.setState({nbParts:event.target.value});
  }

  fiche() {
    if (this.props.recette == null) {
      return <CircularProgress />
    }

    const pourcentageIngredients = 25;
    const espaceIngredientsRecette = 10;

    const r = this.props.recette

    var photo = r.photo
    if (photo == null) {
      photo = require('../images/No_photo.jpg')
    }
    var listIng = [];
    for (let i = 0; i < r.elements.length; i++) {
      let elem = r.elements[i]
      listIng.push(<li key={elem.id}> {elem.quantite.nombre+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</li>)
    }

    var affichageRecette = [];
    if (r.preparation != null) {
      var preparation = r.preparation.split("\n")
      for (let i = 0; i < preparation.length; i++) {
        affichageRecette.push(<div> {preparation[i]} <br/> </div>);
      }
    }

    return (
      <div id="fiche_container">
        <h1>{r.nom}</h1>
        <h6 id="nomPersonne">
          <a href="/profil">{r.auteurFullname} (@{r.auteurUsername})</a>
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
        <div id="commentaire_container">
            <h3>Commentaires</h3>
            <div className="form-group">
              <TextArea size={65} id="area" placeHolder={["Tapez votre commentaire ici !"]} />
            </div>
            <div id="addCommentaire">
              <button className="btn btn-success" >Ajouter un commentaire</button>
            </div>
        </div>

        <style jsx>{`
          #fiche_container {
            margin-top: 10px;
            padding: 10px;
            width: 100%;
          }

          TextArea {
            height: 50px;
          }

          #addCommentaire {
            text-align : right;
          }

          .btn {
            background-color: #ed3232;
            border-color: #ed3232;
          }

          h1 {
            text-align : center; 
          }

          h3 {
            text-align : center; 
            margin-top: 10px;
          }

          h4 {
            text-decoration: underline;
            text-align : center;
            white-space : nowrap;
          }

          #main {
            width: 100%;
            display: table;
            clear: both;
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
            min-width: 100%;
            max-width: 100%;
            margin-bottom: 10px;
            padding: 10px;
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(FicheRecette)

