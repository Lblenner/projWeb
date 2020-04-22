import React from 'react'
import Link from 'next/link';
import TextTruncate from 'react-text-truncate';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'

type MyProps = { recette: any, img: string, update: any };
type MyState = { starHover: any, isFavorite: any, afterRemove: any, added: any };

import Router from 'next/router';
import NoteDisplay from './NoteDisplay';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class RecetteItem extends React.Component<MyProps, MyState> {

  hover
  constructor(props) {
    super(props);
    this.state = {
      starHover: false,
      isFavorite: false,
      afterRemove: false,
      added: false
    };
    this.hover = 0
  }

  componentDidMount() {
    let favs = cookies.get("favs")
    if (favs == undefined) {
      favs = []
      cookies.set('favs', favs)
      return
    }
    var r = this.props.recette
    if (favs.find(elem => elem.id == r.id)) {
      this.setState({ isFavorite: true })
    }
  }

  itemPressed() {
    Router.push('/recette?id=' + this.props.recette.id + '&nom=' + this.props.recette.nom)
  }

  namePressed(e) {
    e.stopPropagation()
    Router.push('/profil')
  }

  async unfavoritePressed(e) {
    e.stopPropagation()
    let favs = cookies.get("favs")
    var r = this.props.recette
    favs = favs.filter(function (el) { return el.id != r.id });
    cookies.set('favs', favs)
    this.setState({ isFavorite: false, })
    this.setState({ afterRemove: true, starHover: false })
    this.props.update(r.id)

  }

  favoritePressed(e) {
    e.stopPropagation()
    let favs = cookies.get("favs")
    console.log(favs)
    favs = favs.concat([this.props.recette])
    cookies.set('favs', favs)
    this.setState({ isFavorite: true })
    this.setState({ added: true, starHover: false })
  }



  star() {

    if (this.state.afterRemove) {
      return <AiOutlineStar
        onClick={(e) => e.stopPropagation()}
        onPointerLeave={() => this.setState({ afterRemove: false })}
        style={{ flexShrink: 0 }}
        size={40} color="#FFCC7A" />
    }

    if (this.state.added) {
      return <AiFillStar
        onClick={(e) => e.stopPropagation()}
        onPointerLeave={() => this.setState({ added: false })}
        style={{ flexShrink: 0 }} size={40} color="#FFCC7A" />
    }

    if (this.state.isFavorite) {
      if (!this.state.starHover) {
        return <AiFillStar
          onPointerEnter={() => this.setState({ starHover: true })}
          style={{ flexShrink: 0 }} size={40} color="#FFCC7A" />
      }

      return <div
        onPointerLeave={() => this.setState({ starHover: false })}
        onClick={(e) => this.unfavoritePressed(e)} >
        <span style={{ display: 'inline-block', position: 'relative', }}>
          <AiFillStar
            textAnchor="middle" alignmentBaseline="middle"
            style={{ flexShrink: 0 }} size={40} color="red" />
          <FaTimes
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ flexShrink: 0, position: 'absolute', left: '0px', }}
            color="black"
            size={40}
          />
          <FaTimes
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ flexShrink: 0, position: 'absolute', left: '5px', bottom: '5px' }}
            color="red"
            size={30}
          />
        </span>
      </div>
    }

    if (!this.state.starHover) {
      return <AiOutlineStar
        onPointerEnter={() => this.setState({ starHover: true })}
        style={{ flexShrink: 0 }}
        size={40} color="#FFCC7A" />
    } else {
      return <AiFillStar
        onClick={(e) => this.favoritePressed(e)}
        onPointerLeave={() => { this.setState({ starHover: false }) }}
        style={{ flexShrink: 0, height: "40px", marginRight: 5 }} size={30} color="#ffdea8" />
    }
  }

  render() {
    var a = "Un gigot, la la une bouteille de vin et 2 heures à dispositions ? J'aime les saucisses à la creme. N'hesitez plus, cette recette est faites pour vous !"
    const recette = this.props.recette
    return (
      <div id="container"
        onClick={() => this.itemPressed()}>
        <div id="left">
          <div className="row">
            <h3 style={{ flexGrow: 1 }} id="trunc">{recette.nom}</h3>
            {this.star()}
          </div>
          De <span onClick={(e) => this.namePressed(e)} id="name">Bernard Friaut</span>
          <div id="rating">
            <NoteDisplay name="Note" value="8.14" />
            <NoteDisplay name="Ma note" value="--" />
          </div>
          <p style={{ marginTop: 10 }}><TextTruncate
            line={2}
            element="span"
            truncateText="…"
            text={a}
          /></p>
        </div>
        <div id="right">
          <img src={this.props.img} id="img" />

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
            width: 60%;
            padding: 5px;
            padding-right: 0px;
          }
          #right {
            width: 40%;
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
