import { addNote, getUser, removeNote, getNotes } from '../API/Api'
import { connect } from 'react-redux'
import NoteDisplay from './NoteDisplay';
import React from 'react';
import DialogConnectionNote from './DialogConnectionNote';
import { MySnackbar } from './Snackbar';

type MyProps = { recetteNote, recetteid, username, token }
type MyState = { myNote, loading, ajout, select, valueSelect, openLogin, erreur : any , erreurMsg : any }

class NoteFicheRecette extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      myNote: null,
      loading: true,
      ajout: false,
      select: false,
      valueSelect: 5,
      openLogin: false,
      erreur: false,
      erreurMsg: "Une erreur s'est produite",
    };
    ;
  }

  ajoutNote() {

    let token = this.props.token

    if (!token) {
      this.setState({ openLogin: true })
    } else {
      this.setState({ ajout: true })
    }

  }

  async componentDidMount() {

    let username = this.props.username

    if (!username) {
      this.setState({loading: false})
      return
    }

    let response = await getUser(username)

    if (response.status > 400) {
      this.setState({loading: false})
      this.setState({erreur: true, erreurMsg: "Vous n'êtes pas connecté"});
      return
    }

    let user = await response.json()

    if (!user) {
      this.setState({loading: false})
      return
    }

    let noteId = user.notes.findIndex(note => note.recetteId == this.props.recetteid)

    this.setState({ loading: false, myNote: user.notes[noteId] ? user.notes[noteId].valeur.toFixed(2) : null })
  }

  async confirmer() {

    this.setState({ loading: true })

    let response = await addNote(this.props.recetteid, this.state.valueSelect, this.props.token)

    if (response.status > 202) {
      this.setState({erreur: true, erreurMsg: "Une erreur s'est produite"});
      return
    }
    console.log(response)

    this.setState({ loading: false, ajout: false, myNote: this.state.valueSelect })

  }

  async supprimer() {

    this.setState({ loading: true })

    let response = await getNotes(this.props.recetteid)

    if (response.status != 200) {
      this.setState({erreur: true, erreurMsg: "La recette est introuvable"});
      return
    }

    let liste = await response.json()
    console.log(liste)

    let username = this.props.username
    let noteId = liste.findIndex(note => note.auteurUsername == username)

    if (!liste[noteId]) {
      this.setState({erreur: true, erreurMsg: "Erreur, vous n'avez pas de note"});
      return
    }

    let responseRemove = await removeNote(this.props.recetteid, liste[noteId].id, this.props.token)

    if (!responseRemove.ok) {
      this.setState({erreur: true, erreurMsg: "Une erreur s'est produite"});
      return
    }

    this.setState({ loading: false, myNote: null })


  }

  render() {
    return (
      <div id="main">
        <MySnackbar open={this.state.erreur} handleClose={() => this.setState({erreur: false})} msg={this.state.erreurMsg}/>

        <DialogConnectionNote open={this.state.openLogin} handleClose={() => this.setState({ openLogin: false })} />

        <div className="row" style={{ marginLeft: 1, height: 40 }}>
          <NoteDisplay name="Note :" value={this.props.recetteNote} />
          {this.state.loading ? null :
            this.state.ajout ?
              <div className="row" style={{ marginLeft: 10 }}>
                <div>
                  <select
                    className="form-control"
                    value={this.state.valueSelect}
                    onChange={(e) => this.setState({ valueSelect: e.target.value })}
                  >
                    <option value={1}>1</option >
                    <option value={2}>2</option >
                    <option value={3}>3</option >
                    <option value={4}>4</option >
                    <option value={5}>5</option >
                    <option value={6}>6</option >
                    <option value={7}>7</option >
                    <option value={8}>8</option >
                    <option value={9}>9</option >
                    <option value={10}>10</option >
                  </select>
                </div>
                <button onClick={() => this.confirmer()} className="btn btn-success" >Confirmer</button>
                <button onClick={() => this.setState({ ajout: false })} className="btn btn-success" >Annuler</button>
              </div> :
              this.state.myNote ?
                <div className="row">
                  <div style={{ marginLeft: 20 }}>
                    <NoteDisplay name="Ma note :" value={this.state.myNote} />
                  </div>
                  <button onClick={() => this.setState({ ajout: true })} className="btn btn-success" >Modifier</button>
                  <button onClick={() => this.supprimer()} className="btn btn-success" >Supprimer</button>
                </div> :
                <button onClick={() => this.ajoutNote()} className="btn btn-success" >Ajouter une note</button>
          }
        </div>

        <style jsx>{`
          #main {
            margin-bottom: 20px;
            margin-left: 10px;
          }
          .row {
            flex-direction:row;
            display: flex;
            align-items: center;
          }
          .btn {
            background-color: #ed3232;
            border-color: #ed3232;
            margin-left: 10px;
          }
        `}</style>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(NoteFicheRecette)