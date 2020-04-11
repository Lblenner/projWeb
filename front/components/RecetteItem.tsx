import React from 'react'
import Link from 'next/link';
import TextTruncate from 'react-text-truncate';
type MyProps = { recette: any, img: string };
type MyState = {};
import Router from 'next/router';

export default class RecetteItem extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  itemPressed() {
    Router.push('/recette?id=' + this.props.recette.id + '&nom=' + this.props.recette.nom)
  }
  namePressed(e) {
    e.stopPropagation()
    Router.push('/profil')
  }

  render() {
    var a = "Un gigot, une bouteille de vin et 2 heures à dispositions ? J'aime les saucisses à la creme. N'hesitez plus, cette recette est faites pour vous !"
    const recette = this.props.recette
    return (
      <div id="container" onClick={() => this.itemPressed()}>
        <div id="left">
          <h3>{recette.nom}</h3>
          De <span onClick={(e) => this.namePressed(e)} id="name">Bernard Friaut</span>
          <p><TextTruncate
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
            height : 150px;
            border-bottom: 1px solid;
            display: flex;
            flex-grow: 1;
            flex-direction: row;
            overflow: hidden;
          }
          #container:hover {
            opacity: 0.7;
            cursor: pointer;
          }
          a:hover {
            text-decoration: none;
          }
          #left {
            width: 60%;
            padding: 10px;
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
          p {
            margin-top : 10px
        `}</style>
      </div >

    )
  }
}
