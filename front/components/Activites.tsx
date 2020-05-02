import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs';

type MyProps = { listeRecette, listeComment, listeFavs, listeNote }

type MyState = { liste };

export default class Activites extends React.Component<MyProps, MyState> {


  constructor(props) {
    super(props);
    this.state = {
      liste: []
    };
  }

  componentDidMount() {
    let formatRecette = []
    for (let elem of this.props.listeRecette){
      formatRecette.push({...elem, date: elem.dateCreation})
    }
    let bigliste = this.props.listeComment.concat(this.props.listeFavs.concat(this.props.listeNote.concat(formatRecette)))
    let biglisteDate = []
    for (let elem of bigliste){
      biglisteDate.push({...elem, date: new Date(elem.date)})
    }
    biglisteDate.sort((a, b) => (a.date >= b.date) ? 1 : -1)
    console.log(biglisteDate)

  }


  render() {

    return (<div>
      {this.state.liste}
      <div id="loadmore" style={{ border: 'solid', height: 45, marginBottom: 50, borderWidth: "1px 0px 1px 0px", borderColor: '#D3D3D3' }}
        onClick={() => null}>
        <div style={{ position: 'relative', left: '-46%', float: 'right', }}><BsChevronCompactDown size={40} />
        </div>
      </div>
    </div>)
  }
}
