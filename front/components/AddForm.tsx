import React from 'react'
import TextArea from './TextArea';
import Ingredients from './Ingredients';

type MyProps = {};
type MyState = {};



export default class AddForm extends React.Component<MyProps, MyState>  {

  textarea

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textarea = ""
  }

  handleSubmit(event) {
    event.preventDefault();
    let recette = this.createBody(event.target)
    console.log(recette)
  }

  createBody(listeData) {
    let n = listeData.length
    let recette = new Recette(listeData[0].value, listeData[1].value, listeData[n - 2].value)
    for (let i = 2; i < n - 4; i += 4) {
      let nombre = listeData[i].value
      let unite = listeData[i + 1].value
      let nom = listeData[i + 2].value

      recette.elements.push({ ingredient: { nom: nom }, quantite: { nombre: nombre, unite: unite } })
    }
    return recette
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="form">

        <div className="form-group">
          <label htmlFor="titre">Titre</label>
          <input required type="text" className="form-control" id="titre" placeholder="Brownie au curry" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input required type="text" className="form-control" id="description" placeholder="Une recette original pour les friands de nouvelles expériences" />
        </div>

        <div className="form-group">
          <label htmlFor="">Ingrédients</label>
          <Ingredients />
        </div>

        <div className="form-group">
          <label htmlFor="area">Recette</label>
          <TextArea id="area" placeHolder={["Etape 1:", "Préparer le chou...", "Etape 2:", "Videz un bol de curry..."]} />
        </div>

        <button type="submit" className="btn btn-primary">Créer la recette</button>

        <style jsx>{`
        #form {
          margin-top: 20px
        }
        `}</style>

      </form>
    );
  }
}

class Recette {
  titre: string;
  description: string;
  elements: Array<object>;
  recette: string;

  constructor(titre, description, recette) {
    this.titre = titre
    this.description = description
    this.recette = recette
    this.elements= []
  }


}