import React from 'react'

type MyProps = { placeHolder: Array<string>, id: string };
type MyState = { value: string, taille: number };

const defaultSize = 300;

export default class TextArea extends React.Component<MyProps, MyState>  {

  placeholder: string

  constructor(props) {
    super(props);
    this.state = {
      taille: defaultSize,
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    //On utilise un tableau car pas trouvé de moyen de faire passé un \n en prop qui soit interprété comme un saut à la ligne
    this.placeholder = this.props.placeHolder.reduce(function (accumulateur, valeurCourante, index, array) {
      return accumulateur + "\n" + valeurCourante;
    });
  }

  async handleChange(event) {
    event.persist() //Permet d'utiliser l'event aprés un await
    await this.setState({ taille: 1 }) //Permet d'avoir la bonne taille du texte (ScrollHeight >= height)
    this.setState({ value: event.target.value, taille: event.target.scrollHeight });
  }

  render() {
    return (
      <div>
        <textarea id={this.props.id} placeholder={this.placeholder} className="form-control" required onChange={(event) => this.handleChange(event)} />
        <style jsx>{`
            #${this.props.id} {
	            min-height: ${defaultSize}px;
	            overflow: hidden;
              resize: none;
              height: ${this.state.taille}px;
            }
      `}</style>
      </div>
    );
  }
}