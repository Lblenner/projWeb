import React from 'react'
import Link from 'next/link';

type MyProps = { recette: any };
type MyState = {};

export default class recetteItem extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const recette = this.props.recette
    return (
      <div>
        <Link href="/recette" as={`/recette/${recette.id}`}>
          <a className="c">
            <div id="item">
              <h3>{recette.nom}</h3>
            </div>
          </a>
        </Link>

        <style jsx>{`
          #item {
            height : 60px;
            margin-top: 10px;
            border : 1px solid;
            padding: 5px;
            border-radius: 10px 10px 10px 10px;
            border-color: black;
          }
          #item:hover {

          }
          a:hover {
            text-decoration: none;
          }
        `}</style>
      </div >

    )
  }
}