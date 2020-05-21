import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs';
import MinimalActivite from './MinimalAct';

type MyProps = { listeRecette, listeComment, listeFavs, listeNote }

type MyState = { liste, loadMore };

export default class Activites extends React.Component<MyProps, MyState> {


  constructor(props) {
    super(props);
    this.biglisteDate = []
    this.taille = 5
    this.state = {
      liste: [],
      loadMore: false
    };
  }

  biglisteDate
  taille

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.loadListe()
    }
  }

  loadListe() {
    this.biglisteDate = []
    let formatRecette = []
    for (let elem of this.props.listeRecette) {
      formatRecette.push({ ...elem, date: elem.dateCreation, type: "addRecette" })
    }
    let bigliste = this.props.listeComment.map((elem) => { return { ...elem, type: "comment" } })
    bigliste = bigliste.concat(this.props.listeFavs.map((elem) => { return { ...elem, type: "favAdd" } })) // à différencier
    bigliste = bigliste.concat(this.props.listeNote.map((elem) => { return { ...elem, type: "note" } }))
    bigliste = bigliste.concat(formatRecette)
    for (let elem of bigliste) {
      this.biglisteDate.push({ ...elem, date: new Date(elem.date) })
    }
    this.biglisteDate.sort((a, b) => (a.date <= b.date) ? 1 : -1)

    this.taille = 5
    this.setLoadMore()
    this.setState({ liste: this.biglisteDate.slice(0, this.taille) })
  }

  setLoadMore() {
    if (this.biglisteDate.length > this.taille) {
      this.setState({ loadMore: true })
    } else {
      this.setState({ loadMore: false })
    }
  }

  componentDidMount() {
    this.loadListe()
  }

  loadMore() {
    this.setState({ liste: this.biglisteDate.slice(0, this.taille + 5) })
    this.taille = this.taille + 5
    this.setLoadMore()
  }

  render() {

    return (<div>
      {this.state.liste.map((elem, i) => <MinimalActivite key={i} type={elem.type} value={elem} />)}
      {this.state.loadMore ?
        <div id="loadmore" style={{ border: 'solid', height: 45, marginBottom: 50, borderWidth: "1px 0px 1px 0px", borderColor: '#D3D3D3' }}
          onClick={() => this.loadMore()}>
          <div style={{ position: 'relative', left: '-46%', float: 'right', }}><BsChevronCompactDown size={40} /> </div>
        </div>
        : <div style={{ border: 'solid', height: 30, marginBottom: 50, borderWidth: "1px 0px 1px 0px", borderColor: '#D3D3D3', textAlign: 'center', paddingTop: 4 }} >
          Pas d'autres activités
        </div>
      }

      <style jsx>{`
      #loadmore:hover {
        opacity: 0.7;
        cursor: pointer;
        background-color: #ffeaea;
      }
    `}</style>
    </div>)
  }
}
