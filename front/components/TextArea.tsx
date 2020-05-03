import React from 'react'

type MyProps = { placeHolder: Array<string>, id: string, size: number, onChange, value, required };
type MyState = { taille: number, value };


export default class TextArea extends React.Component<MyProps, MyState>  {

  public static defaultProps = {
    onChange: null,
    value: "",
    required: true
  };

  placeholder: string

  constructor(props) {
    super(props);
    this.state = {
      taille: this.props.size,
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
    //On utilise un tableau car pas trouvé de moyen de faire passé un \n en prop qui soit interprété comme un saut à la ligne
    this.placeholder = this.props.placeHolder.reduce(function (accumulateur, valeurCourante, index, array) {
      return accumulateur + "\n" + valeurCourante;
    });
  }

  componentDidUpdate(prevProps){
    if(this.props.value != prevProps.value){
      this.setState({value: this.props.value})
    }
  }
  async handleChange(event) {
    event.persist() //Permet dutiliser l'event aprés un await
    if (this.props.onChange != null){
      this.props.onChange(event.target.value)
    }else {
      this.setState({value: event.target.value})
    }
    await this.setState({ taille: 1, })
    this.setState({ taille: event.target.scrollHeight });
  }

  render() {
    return (
      <div>
        <textarea id={this.props.id} placeholder={this.placeholder} value={this.state.value} className="form-control" required={this.props.required} onChange={(event) => this.handleChange(event)} />
        <style jsx>{`
            #${this.props.id} {
	            min-height: ${this.props.size}px;
	            overflow: hidden;
              resize: none;
              height: ${this.state.taille}px;
            }
      `}</style>
      </div>
    );
  }
}