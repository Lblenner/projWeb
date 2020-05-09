import { addNote, getNotes, removeNote } from '../API/Api'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import NoteDisplay from './NoteDisplay';

function AddNote(props) {

    // If my_note == null => Bouton Add une note
    // Else => Bouton Mofidier note Et Supprimer note

    const ajoutNote = async () => {
      var note = Math.round(Math.random() * 10);
      var response = await addNote(props.recetteid,note,props.token)

      props.handle()
      props.handleAddNote(true, note, props.myNoteId);
    
      if (response.status != 200) {
        console.log("Erreur" + response)
      }
    }

    const supprimerNote = async () => {
      var response = await removeNote(props.recetteid,props.myNoteId,props.token)

      props.handle()
      props.handleAddNote(false,null,null);
    
      if (response.status != 204) {
        console.log(response)
        let json = await response.json()
        console.log(JSON.stringify(json))
        console.log(json.message)
      }
    }

    var affichage= [];

    if (props.gaveANote) {
      affichage.push(<NoteDisplay key="1" name="Ma Note" value={props.myNote}/>);
      affichage.push(<button key="2" onClick={supprimerNote}>Supprimer ma note</button>);
    } else {
      affichage.push(<button key="3" onClick={ajoutNote}>Ajouter une note aléatoire</button>);
    }

    return (
      <div id="main">
        {affichage}
        <style jsx>{`
          #main {
            flex-direction:row;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
  
      </div>
    );
  }

  const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(AddNote)