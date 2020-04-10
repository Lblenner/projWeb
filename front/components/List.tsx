import React from 'react'
import RecetteItem from './RecetteItem';

type MyProps = {};
type MyState = { liste: Array<any> };

export default class List extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      liste: []
    };
  }

  async componentDidMount() {

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    var myInit = {
      method: 'GET',
      headers: requestHeaders,
      mode: 'cors' as RequestMode,
      cache: 'default' as RequestCache,
      credentials: 'include' as RequestCredentials
    };
    var response = await fetch("http://134.122.90.48/api/v1/recettes", myInit)

    if (response.status > 400) {
      return
    }

    var json = await response.json()
    console.log(json)
    this.setState({ liste: json })

  }

  render() {
    return (
      <div id="main_container">
        <div id="right">
        </div>
        <div id="list_container">
          {this.state.liste.map((elem, index) => <RecetteItem key={index} recette={elem} />)}
        </div>
        <div id="left">
        </div>
        <style jsx>{`
              #main_container {
                display: flex;
                justify-content: center;
                flex-grow: 1;
                flex-direction: row;
              }
              #list_container {
                display: flex;
                flex-grow: 3;
                margin-top: 40px;
                border-top: 1px solid;
                border-right: 1px solid;
                border-left: 1px solid;
                flex-direction: column
              }
              #left {
                display: flex;
                justify-content: center;
                flex-grow: 1;
              }
              #right {
                display: flex;
                justify-content: center;
                flex-grow: 1;
              }
          `}</style>
      </div>
    )
  }
}