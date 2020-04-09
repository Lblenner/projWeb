import React from 'react'
import TextArea from './TextArea';

type MyProps = {};
type MyState = {};



export default class AddForm extends React.Component<MyProps, MyState>  {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="form-group">
          <label htmlFor="titre">Titre</label>
          <input required type="text" className="form-control" id="titre" placeholder="Brownie au curry" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input required type="text" className="form-control" id="description" placeholder="Une recette original pour les friands de nouvelles expériences" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Ingrédients</label>
          <input type="text" className="form-control" id="description" placeholder="Une recette original pour les friands de nouvelles expériences" />
        </div>

        <div className="form-group">
          <label htmlFor="area">Recette</label>
          <TextArea id="area" placeHolder={["Etape 1:", "Préparer le chou...", "Etape 2:", "Videz un bol de curry..."]} />
        </div>

        <button type="submit" className="btn btn-primary">Créer la recette</button>

      </form>
    );
  }
}