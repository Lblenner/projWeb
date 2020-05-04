import { addNote, getRecette, removeNote } from '../API/Api'

export default function AddNote(props) {

    // If my_note == null => Bouton Add une note
    // Else => Bouton Mofidier note Et Supprimer note

    const ajoutNote = async () => {
      var note = Math.round(Math.random() * 10);
      var response = await addNote(props.recetteid,note,props.token)

      props.handle()
    
      if (response.status != 200) {
        console.log("Erreur" + response)
      }
    }

    const supprimerNote = async () => {
      var response = await removeNote(props.recetteid,20,props.token)
      // Qu'une note numéro 20 => changer le nb

      props.handle()
    
      if (response.status != 204) {
        console.log(response)
        let json = await response.json()
        console.log(JSON.stringify(json))
        console.log(json.message)
      }
    }

    return (
      <div>

        <button onClick={ajoutNote} >Ajouter une note aléatoire</button>

        <button onClick={supprimerNote}>Supprimer la première note</button>

        <style jsx>{`

        `}</style>
  
      </div>
    );
  }