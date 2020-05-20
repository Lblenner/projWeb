import React from 'react'
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextArea from './TextArea';
import {connect} from 'react-redux'
import { addCommentaire, getCommentaires, getRecette, getUser, getNotes } from '../API/Api'
import DialogConnectionCom from './DialogConnectionCom';
import CommentaireItem from './CommentaireItem';
import gestionSautLigne from '../src/gestionFormatText';
import NoteDisplay from './NoteDisplay';
import AddNote from './AddNote';
import DialogConnectionNote from './DialogConnectionNote';

type MyProps = any
type MyState = { nbParts: any, open: boolean, listeCom: any , commentaire: any, note : any, 
  gaveANote : any, noteUserId: any, noteUser, openNote};

class FicheRecette extends React.Component<MyProps, MyState> {

  nbParts = this.props.recette.nombreParts;

  constructor(props) {
    super(props);
    this.state = {
      noteUser: null,
      nbParts: this.props.recette.nombreParts,
      open: false,
      openNote: false,
      gaveANote: false,
      //myNote: 0,
      noteUserId: null,
      listeCom: this.props.recette.commentaires.slice().reverse(),
      commentaire: "",
      note: this.props.recette.note?this.props.recette.note.toFixed(2):null
    };
;  }

  onChange = (event) => {
    if (event.target.value <= 0) {
      this.setState({nbParts:1});
    } else {
      this.setState({nbParts:event.target.value});
    }
  }

  async componentDidMount() {

    let username = this.props.username
    if (!username) {
      return
    }

    let response = await getUser(username)

    if (response.status > 400) {
      console.log("Vous n'etes pas connecté")
      return
    }
    let user = await response.json()

    if (!user){
      return 
    }

    let noteId = user.notes.findIndex(note => note.recetteId == this.props.recette.id)

    this.setState({ noteUser: user.notes[noteId] ? user.notes[noteId].valeur : null })
    this.setState({ gaveANote: user.notes[noteId] ? true : false })
    this.setState({ noteUserId: user.notes[noteId] ? user.notes[noteId].id : null })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    let token = this.props.token

    if (token != null) {
      // On affiche le commentaire nouvellement créé sous la recette
      let commentaire = event.target[0].value
      let response = await addCommentaire(this.props.recette.id,commentaire,token)

      // Gestion des cas d'erreur de response
      if (response.status == 200) {

        this.setState({commentaire:""});
        let newListe = await getCommentaires(this.props.recette.id)

        // Gérer les cas d'erreur de newListe

        let json = await newListe.json();
        this.setState({listeCom:json.reverse()});
      } else {
        // Echec ajout comm
      }

    } else {
      this.setState({open:true});
    }

  }

  handleClose = () => {
    this.setState({open:false});
  }

  handleCloseNote = () => {
    this.setState({openNote:false});
  }

  handleOpen = () => {
    this.setState({openNote:true});
  }

  handleModifNote = async () => {
    
    let response = await getRecette(this.props.recette.id)

    if (response.status > 400) {
        console.log("Erreur")
        return
    }

    var recette = await response.json()

    var note = recette.note;
    if (note != null) {
      note = note.toFixed(2);
    }

    this.setState({note:note});
  }

  handleAddNote = (gaveNote, note, noteid) => {
    this.setState({gaveANote:gaveNote, noteUserId:noteid, noteUser: note})
  }

  /*hasNote = async () => {

    var listeNote = await getNotes(this.props.recette.id);

    if (listeNote.status == 200) {

      var Myusername = "mimi";
      let json = await listeNote.json();
      
      for (var i = 0; i < json.length; i++) {
        if (json[i].auteurUsername == Myusername) {
          this.handleAddNote(true,json[i].valeur,json[i].id)
        }
      }
    }
    
  }*/

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
        listIng.push(<li key={elem.id}> {(elem.quantite.nombre * this.state.nbParts / this.nbParts).toFixed(2)+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</li>)
      }
    } else {
      for (let i = 0; i < r.elements.length; i++) {
        let elem = r.elements[i]
        listIng.push(<li key={elem.id}> {elem.quantite.nombre+" " +elem.quantite.unite+ " "+elem.ingredient.nom}</li>)
      }
    }

    var affichageRecette = gestionSautLigne(r.preparation)

    this.componentDidMount();

    return (
      <div id="fiche_container">
        <h1>{r.nom}</h1>
        <h6 id="nomPersonne">
          <a href="/profil">{r.auteurFullname} (@{r.auteurUsername})</a>
        </h6>
        { photo != null &&
        <div>
          <img src={photo} id="photo"/>
        </div> }

        <div id="notes">
          <NoteDisplay name="Note :" value={this.state.note}/>
          <AddNote recetteid={r.id} token={this.props.token} handle={this.handleModifNote} 
          gaveANote={this.state.noteUser} myNote={this.state.noteUser}
          myNoteId={this.state.noteUserId} handleAddNote={this.handleAddNote}
          username={this.props.username} handleClose={this.handleClose}
          handleOpen={this.handleOpen}/>
          <DialogConnectionNote open={this.state.openNote} handleClose={this.handleCloseNote}/>
        </div> 

        <div id="main">
          <div id="affichageIngrédients">
            { this.state.nbParts!=0 &&
              <div id="ensParts">
                <TextField type="number" id="nbParts" name="comment"
                  style = {{width: '30%', marginRight: '5px', marginBottom: '5px'}}
                  inputProps={{min: 1, max: 100, style: { textAlign: 'center' }}}
                  value={this.state.nbParts}
                  onChange={this.onChange}/>
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
                value={this.state.commentaire} onChange={(texte) => this.setState({commentaire:texte})}/>
              </div>
              <div id="addCommentaire">
                <button type="submit" className="btn btn-success" >Ajouter un commentaire</button>
              </div>
            </form>
            <div>
              {this.state.listeCom.map((elem) => {
              return <CommentaireItem key={elem.id} commentaire={elem} token={this.props.token}/>
              })}
            </div>
        </div>

        <DialogConnectionCom open={this.state.open} handleClose={this.handleClose}/>

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

