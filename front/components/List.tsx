import React from 'react'
import RecetteItem from './RecetteItem';

type MyProps = { liste: any, update: any};
type MyState = {};

export default class List extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.liste == undefined || this.props.liste.length == 0){
      return <h1>Pas de recette</h1>
    }

    return (
      <div id="main_container">
        <div id="list_container">
          {this.props.liste.map((elem, index) => {
            var defaultImg = require('../images/No_photo.jpg')
            return <RecetteItem img={defaultImg} key={elem.id} recette={elem} update={this.props.update}/>
          })}
          <div id="end">Pas d'autres recettes</div>
        </div>
        <style jsx>{`
              #main_container {
                display: flex;
                justify-content: center;
                flex-grow: 1;
              }
              #list_container {
                width: 900px;
                margin-top: 10px;
                border-top: 1px solid;
                border-right: 1px solid;
                border-left: 1px solid;
                flex-direction: column;
                margin-bottom: 30px;
              }
              #end {
                text-align: center;
                padding: 10px;
                border-bottom: 1px solid;
              }
          `}</style>
      </div>
    )
  }
}