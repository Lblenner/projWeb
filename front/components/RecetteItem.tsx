import React from 'react'
import Link from 'next/link';
import TextTruncate from 'react-text-truncate';
type MyProps = { recette: any };
type MyState = {};

export default class recetteItem extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var a = "Un gigot, une bouteille de vin et 2 heures à dispositions ? J'aime les saucisses à la creme. N'hesitez plus, cette recette est faites pour vous !"

    const recette = this.props.recette
    return (
      <div>
        <Link href="/recette" as={`/recette/${recette.id}`}>
          <a><div id="container">
            <div id="left">
              <h3>Gigot d'agneaux à la saucisse et au miel</h3>
                De <a id="name">Bernard Friaut</a>
              <p><TextTruncate
                line={2}
                element="span"
                truncateText="…"
                text={a}
              /></p>
            </div>
            <div id="right">
              <img src={require('../images/bouffe.jpeg')} id="img" />
            </div>
          </div></a>
        </Link>

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
          }
          #img {
            width: 100%;
          }  
          #name {
            color: blue;
          }
          #name:hover {
            text-decoration: underline;
          }
          p {
            margin-top : 10px
          }
        `}</style>
      </div >

    )
  }
}