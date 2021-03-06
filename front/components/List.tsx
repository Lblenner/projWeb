import React from 'react'
import RecetteItem from './RecetteItem';

type MyProps = { liste: any, update: any, notesPerso, customItem, listeFav };
type MyState = {};

export default class List extends React.Component<MyProps, MyState> {


  public static defaultProps = {
    customItem: null,
    update: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.liste == undefined || this.props.liste.length == 0) {
      return <h1>Pas de recette</h1>
    }

    return (
      <div id="main_container">
        <div id="list_container">
          {this.props.liste.map((elem, index) => {
            let noteId = this.props.notesPerso ? this.props.notesPerso.findIndex(note => note.recetteId == elem.id) : null
            return (<div  key={elem.id} style={{display: "flex", flexDirection: "row"}} >
              { this.props.customItem && this.props.customItem(elem)} 
              <RecetteItem recette={elem} update={this.props.update} listFav={this.props.listeFav}
                notePerso={this.props.notesPerso ? this.props.notesPerso[noteId] ? this.props.notesPerso[noteId].valeur : null : null} />
            </div>)

          })}
          <div id="end">Pas d'autres recettes</div>
        </div>
        <style jsx>{`
              #main_container {
                display: flex;
                justify-content: center;
                flex-grow: 1;
              }
              #list_container {
                display: flex;
                flex: 1;
                border-top: 1px solid;
                border-right: 1px solid;
                border-left: 1px solid;
                flex-direction: column;
                margin-bottom: 10px;
              }
              #end {
                text-align: center;
                padding: 10px;
                border-bottom: 1px solid;
              }
          `}</style>
      </div>
    )
  }
}