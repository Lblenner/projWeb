import { addNote, getUser, removeNote } from '../API/Api'
import { connect } from 'react-redux'
import NoteDisplay from './NoteDisplay';
import TextArea from './TextArea';
import React from 'react';
import { TextField } from '@material-ui/core';

// A faire :
// Note entre 0 et 10
// Avec max deux chiffres derrière la virgule
// Peut-être mettre plutôt comme pour les parts avec des petites flèches ce qui donnera déjà un max

type MyProps = { recetteid, token, handle, gaveANote : any, myNote,
  myNoteId, handleAddNote, username, handleClose, handleOpen }
type MyState = { note }

class AddNote extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      note : "5.00"
    };
;  }

    // If my_note == null => Bouton Add une note
    // Else => Bouton Mofidier note Et Supprimer note

    ajoutNote = async () => {

      let username = this.props.username

      let user = await getUser(username)

      if (user.status > 400) {
        this.props.handleOpen();
      } else { // Sinon on peut tenter d'ajouter le note
        if (this.state.note != "") {
          var response = await addNote(this.props.recetteid,this.state.note,this.props.token)

          this.props.handle()
          this.props.handleAddNote(true, this.state.note, this.props.myNoteId);
        
          if (response.status != 200) {
            console.log("Erreur" + response)
          }
        }
      }
    }

    supprimerNote = async () => {
      var response = await removeNote(this.props.recetteid,this.props.myNoteId,this.props.token)

      this.props.handle()
      this.props.handleAddNote(false,null,null);
    
      if (response.status != 204) {
        console.log(response)
        let json = await response.json()
        console.log(JSON.stringify(json))
        console.log(json.message)
      }
    }

    onChange = (event) => {
      var noteString = event.target.value;
      if (noteString > 10) {
        this.setState({note: "10.00"});
      } else if (noteString < 0) {
        this.setState({note: "0.00"});
      } else {
        this.setState({note: noteString.substring(0,Math.min(noteString.length,4))});
      }
    }

    /* <TextArea key="4" size={65} id="area" placeHolder={["8.50"]} 
            value={this.state.note} onChange={(valeur) => this.setState({note: valeur})}/> */

    affichage() {

      if (this.props.gaveANote) {
        return (
          <div id="possibility1">
            <NoteDisplay key="1" name="Ma Note" value={this.props.myNote}/>
            <button key="2" onClick={this.supprimerNote}>Supprimer ma note</button>
            <style jsx>{`
              #possibility1 {
                flex-direction:row;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            `}</style>
          </div>
        )
      } else {
        return (
          <div id="possibility2">
            <TextField type="number" id="note"
                  style = {{width: '30%', marginRight: '5px', marginBottom: '5px'}}
                  inputProps={{min: 0, max: 10, style: { textAlign: 'center' }}}
                  value={this.state.note}
                  onChange={this.onChange}/>
            <button key="3" onClick={this.ajoutNote}>Ajouter la note</button>
            <style jsx>{`
              #possibility2 {
                flex-direction:row;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            `}</style>
          </div>
        )
      }

    }

    render() {
      return (
      <div id="main">
        {this.affichage()}
        <style jsx>{`
          #main {
            flex-direction:row;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
  
      </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(AddNote)