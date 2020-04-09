import React from 'react'
import Ingredient from './Ingredient';

type MyProps = {};
type MyState = { liste: any };

export default class Ingredients extends React.Component<MyProps, MyState>  {


  constructor(props) {
    super(props);
    this.state = {
      liste: [0,1]
    };
  }

  addIngredient() {
    var i = this.state.liste.length
    var liste = this.state.liste.concat([i])
    this.setState({ liste: liste })
  }

  delIngredient(i) {
    var nliste = this.state.liste.filter((elem) => elem != i)
    this.setState({liste:nliste})
  }

  render() {
    return (
      <div>
        {this.state.liste.map((i) => <Ingredient key={i.toString()} del={() => this.delIngredient(i)}/>)}
        <button type="button" className="btn btn-primary" id="addRecette" onClick={() => this.addIngredient()}>Ajouter un ingrédient</button>

        <style jsx>{`
        #addRecette {
          margin-top: 0px
        }
        `}</style>
      </div>
    );
  }
}