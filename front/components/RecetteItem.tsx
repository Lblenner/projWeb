import React from 'react'
import TextTruncate from 'react-text-truncate';
import ReactHoverObserver from 'react-hover-observer';
import { connect } from 'react-redux'

type MyProps = { recette: any, update: any, notePerso: any, listFav, username, token };
type MyState = { isFavorite: any, loading };

import Router from 'next/router';
import NoteDisplay from './NoteDisplay';
import Cookies from 'universal-cookie';
import FavoriteStar from './FavoriteStar';
import { CircularProgress } from '@material-ui/core';
import { addFav, removeFav } from '../API/Api';

const cookies = new Cookies();

class RecetteItem extends React.Component<MyProps, MyState> {

  public static defaultProps = {
  };

  user = false
  fid = null

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.loadFav()
    }
  }

  componentDidMount(){
    this.loadFav()
  }



  loadFav() {
    //Affichage favoris navigateur
    let favs = cookies.get("favs")
    if (favs == undefined) {
      favs = []
      cookies.set('favs', favs)
      return
    }
    var r = this.props.recette
    if (favs.find(elem => elem.id == r.id)) {
      this.setState({ isFavorite: true })
      this.user = false
    }

    //Affichage favoris compte
    let listeFav = this.props.listFav
    let elem = listeFav.find(elem => elem.recetteCompact.id == r.id )
    if (listeFav && elem) {
      this.setState({ isFavorite: true })
      this.fid = elem.id
      this.user = true
    }
  }

  itemPressed() {
    Router.push('/recette?id=' + this.props.recette.id)
  }

  namePressed(e, username) {
    e.stopPropagation()
    Router.push('/profil?username=' + username)
  }

  async unfavoritePressed(e) {
    e.stopPropagation()
    var r = this.props.recette


    if (this.user) {
      this.setState({ loading: true })
      let token = this.props.token
      let username = this.props.username
      let response = await removeFav(token, username, this.fid)

      if (response.status != 204) {
        console.log("Une erreur c'est produite lors de la suppression d'un favoris")
        console.log(response)
      } else {
        this.setState({ isFavorite: false, })
        this.props.update(r.id)
      }

      this.setState({ loading: false })
    } else {
      let favs = cookies.get("favs")
      favs = favs.filter(function (el) { return el.id != r.id });
      cookies.set('favs', favs)
      this.props.update(r.id)
      this.setState({ isFavorite: false, })
    }
  }

  async favoritePressed(e) {
    e.stopPropagation()

    if (this.props.username) {
      this.setState({ loading: true })
      let token = this.props.token
      let username = this.props.username
      let response = await addFav(token, username, this.props.recette.id)

      if (response.status != 200) {
        console.log("Une erreur c'est produite lors de l'ajout d'un favoris")
        console.log(response)
      } else {
        this.setState({ isFavorite: true })
        let json = await response.json()
        this.fid = json.id
      }

      this.setState({ loading: false })
    } else {
      let favs = cookies.get("favs")
      if (!favs.find(elem => elem.id == this.props.recette.id)) {
        favs = favs.concat([this.props.recette])
      }
      cookies.set('favs', favs)
      this.setState({ isFavorite: true })
    }

  }

  render() {
    const recette = this.props.recette
    var a = recette.description
    if (a == null) {
      a = "Cette recette n'a pas de description"
    }
    if (a.length < 3) {
      a = "Description: " + a
    }
    return (
      <div id="container"
        onClick={() => this.itemPressed()}>
        <div id="left">
          <div className="row">
            <h3 style={{ flexGrow: 1 }} id="trunc">{recette.nom}</h3>
            <ReactHoverObserver>
              {this.state.loading ?
                <CircularProgress /> :
                <FavoriteStar isHovering isFavorite={this.state.isFavorite} favorite={(e) => this.favoritePressed(e)} unfavorite={(e) => this.unfavoritePressed(e)} />}
            </ReactHoverObserver>
          </div>
    De <span onClick={(e) => this.namePressed(e, recette.auteurUsername)} id="name"> {recette.auteurFullname} (@{recette.auteurUsername})</span>
          <div id="rating">
            <NoteDisplay name="Note" value={recette.note} />
            <NoteDisplay name="Ma note" value={this.props.notePerso} />
          </div>
          <div style={{ flexGrow: 1, display: "flex" }}>
            <TextTruncate
              line={2}
              element="span"
              truncateText="..."
              text={a}
            />
          </div>
        </div>
        <div id="right">
          {recette.photo && <img src={recette.photo} id="img" />}
          {!recette.photo && <img src={require('../images/No_photo.jpg')} id="img" />}

          <img src={require('../images/dents.png')} id="dent" />

        </div>


        <style jsx>{`
          #container {
            color: black;
            height : 160px;
            border-bottom: 1px solid;
            display: flex;
            flex-grow: 1;
            flex-direction: row;
            overflow: hidden;
          }
          #container:hover {
            cursor: pointer;
            opacity: 0.8;
          }
          a:hover {
            text-decoration: none;
          }
          #left {
            dispay: flex;
            flex: 1;
            padding: 5px;
            padding-right: 0px;
          }
          #right {
            width: 360px;
            overflow: hidden;
            position : relative;
          }
          #img {
            width: 100%;
            min-height: 100%;
            position: absolute;
            z-axis: 1;
          }  
          #dent {
            width : 10px;
            position: absolute;
            z-axis: 2;
          }
          #name {
            color: blue;
          }
          #name:hover {
            text-decoration: underline;
          }
          #trunc {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            margin-bottom: 0;
          }
          #rating {
            height: 25px;
            margin-top: 5px;
            margin-bottom: 5px;
            display: flex;
            flex-direction: row;
          }
          .row {
            max-width: 100%;
            display: flex;
            flex-direction: row;
            flex-growth: 1;
            padding-left: 15px;
            flex-wrap: nowrap;
          }
        `}</style>
      </div >

    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(RecetteItem)

