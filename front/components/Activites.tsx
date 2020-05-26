import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs';
import MinimalActivite from './MinimalAct';

type MyProps = { listeRecette, listeComment, listeFavs, listeNote }

type MyState = { liste, loadMore };

//Pannea udes activités récente de l'utilisateur
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

  biglisteDate //liste d'activité
  taille //Nombre d'element a afficher

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      //Si on modifie les les listes donné on recalcule la liste d'activité
      this.loadListe()
    }
  }

  //Transforme les liste donné en props en une unique liste d'activité
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

  //Gere l'affiche de l'element de bas de liste
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

  //Ajoute 5 element a afficher dans la liste
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
