import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs';
import MinimalActivite from './MinimalAct';

type MyProps = { listeRecette, listeComment, listeFavs, listeNote }

type MyState = { liste };

export default class Activites extends React.Component<MyProps, MyState> {


  constructor(props) {
    super(props);
    this.biglisteDate = []
    this.taille = 5
    this.state = {
      liste: []
    };
  }

  biglisteDate
  taille

  componentDidMount() {
    let formatRecette = []
    for (let elem of this.props.listeRecette){
      formatRecette.push({...elem, date: elem.dateCreation, type:"addRecette"})
    }
    let bigliste = this.props.listeComment.map((elem) => {return {...elem, type:"comment"}})
    bigliste = bigliste.concat(this.props.listeFavs.map((elem) => {return {...elem, type:"favAdd"}})) // à différencier
    bigliste = bigliste.concat(this.props.listeNote.map((elem) => {return {...elem, type:"note"}})) 
    bigliste = bigliste.concat(formatRecette)
    for (let elem of bigliste){
      this.biglisteDate.push({...elem, date: new Date(elem.date)})
    }
    this.biglisteDate.sort((a, b) => (a.date <= b.date) ? 1 : -1)

    this.setState({liste: this.biglisteDate.slice(0,this.taille)})
  }


  render() {

    return (<div>
      {this.state.liste.map((elem,i) => <MinimalActivite key={i} type={elem.type} value={elem}/>)}
      <div id="loadmore" style={{ border: 'solid', height: 45, marginBottom: 50, borderWidth: "1px 0px 1px 0px", borderColor: '#D3D3D3' }}
        onClick={() => null}>
        <div style={{ position: 'relative', left: '-46%', float: 'right', }}><BsChevronCompactDown size={40} />
        </div>
      </div>
    </div>)
  }
}
