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
    var json = await response.json()

    this.setState({ liste: json })

  }

  render() {
    return (
      <div className="container">
        {this.state.liste.map((elem, index) => <RecetteItem key={index} recette={elem}/>)}
      </div>
    )
  }
}