import React from 'react'
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextArea from './TextArea';
import { connect } from 'react-redux'
import { addCommentaire, getCommentaires } from '../API/Api'
import DialogConnectionCom from './DialogConnectionCom';
import CommentaireItem from './CommentaireItem';
import gestionSautLigne from '../src/gestionFormatText';
import NoteFicheRecette from './NoteFicheRecette';
import Link from 'next/link'

type MyProps = any
type MyState = { nbParts: any, open: boolean, listeCom: any, commentaire: any, buttonComLoading };

class FicheRecette extends React.Component<MyProps, MyState> {

  nbParts = this.props.recette.nombreParts;

  constructor(props) {
    super(props);
    this.state = {
      nbParts: this.props.recette.nombreParts,
      open: false,
      listeCom: this.props.recette.commentaires.slice().reverse(),
      buttonComLoading: false,
      commentaire: "",
    };
    ;
  }

  onChange = (event) => {
    if (event.target.value <= 0) {
      this.setState({ nbParts: 1 });
    } else {
      this.setState({ nbParts: event.target.value });
    }
  }


  handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    this.setState({buttonComLoading: true})
    let token = this.props.token

    if (token != null) {
      // On affiche le commentaire nouvellement créé sous la recette
      let commentaire = event.target[0].value
      let response = await addCommentaire(this.props.recette.id, commentaire, token)

      // Gestion des cas d'erreur de response
      if (response.status == 200) {

        this.setState({ commentaire: "" });
        let newListe = await getCommentaires(this.props.recette.id)

        // Gérer les cas d'erreur de newListe

        let json = await newListe.json();
        this.setState({ listeCom: json.reverse() });
      } else {
        // Echec ajout comm
      }

      this.setState({buttonComLoading: false})


    } else {
      this.setState({ open: true, buttonComLoading: false });
    }

  }

  handleClose = () => {
    this.setState({ open: false });
  }

  fiche() {
    if (this.props.recette == null) {
      return <CircularProgress />
    }

    const pourcentageIngredients = 25;
    const espaceIngredientsRecette = 10;

    const r = this.props.recette

    var photo = r.photo
    var listIng = [];
    if (this.nbParts != 0) {
      for (let i = 0; i < r.elements.length; i++) {
        let elem = r.elements[i]
        listIng.push(<li key={i}> {(elem.quantite.nombre * this.state.nbParts / this.nbParts).toFixed(2) + " " + elem.quantite.unite + " " + elem.ingredient.nom}</li>)
      }
    } else {
      for (let i = 0; i < r.elements.length; i++) {
        let elem = r.elements[i]
        listIng.push(<li key={i + r.elements.length}> {elem.quantite.nombre + " " + elem.quantite.unite + " " + elem.ingredient.nom}</li>)
      }
    }

    var affichageRecette = gestionSautLigne(r.preparation)
    return (
      <div id="fiche_container">
        <h1>{r.nom}</h1>
        <h6 id="nomPersonne">
          <Link href={"/profil?username=" + r.auteurUsername}>
            <a>{r.auteurFullname} (@{r.auteurUsername})</a>
          </Link>
        </h6>
        {photo != null &&
          <div>
            <img src={photo} id="photo" />
          </div>}

        <NoteFicheRecette recetteNote={r.note} recetteid={r.id} />

        <div id="main">
          <div id="affichageIngrédients">
            {this.state.nbParts != 0 &&
              <div id="ensParts">
                <TextField type="number" id="nbParts" name="comment"
                  style={{ width: '30%', marginRight: '5px', marginBottom: '5px' }}
                  inputProps={{ min: 1, max: 100, style: { textAlign: 'center' } }}
                  value={this.state.nbParts}
                  onChange={this.onChange} />
                  parts
              </div>
            }
            <h4>Ingrédients :</h4>
            <ul id="listeIngredients">
              {listIng}
            </ul>
          </div>
          <div id="affichageRecette">
            {affichageRecette}
          </div>
        </div>
        <div id="commentaire_container">
          <h3>Commentaires</h3>
          <form onSubmit={this.handleSubmit} id="form">
            <div className="form-group">
              <TextArea size={65} id="area" placeHolder={["Tapez votre commentaire ici !"]}
                value={this.state.commentaire} onChange={(texte) => this.setState({ commentaire: texte })} />
            </div>
            <div id="addCommentaire">
              {this.state.buttonComLoading ?
                <CircularProgress /> :
                <button type="submit" className="btn btn-success" >Ajouter un commentaire</button>
              }
            </div>
          </form>
          <div>
            {this.state.listeCom.map((elem) => {
              return <CommentaireItem key={elem.id + 2 * r.elements.length} commentaire={elem} token={this.props.token} />
            })}
          </div>
        </div>

        <DialogConnectionCom open={this.state.open} handleClose={this.handleClose} />

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
            margin-right: ${espaceIngredientsRecette - 1}px;
            padding: 10px;
          }

          #listeIngrédients {
            text-align : left;
          }

          #affichageRecette {
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
            margin-left: ${pourcentageIngredients + 1}%;
          }

          #nomPersonne {
            text-align : right;
            text-decoration : underline;
          }

          #ensParts {
            flex-direction:row;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          #photo {
            min-width: 100%;
            max-width: 100%;
            margin-bottom: 10px;
            padding: 10px;
          }

          #notes {
            margin-bottom: 20px;
            display: flex;
            flex-direction: row;
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

