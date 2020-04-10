import React from 'react'

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

    console.log(json)
    this.setState({ liste: json })

  }

  render() {
    return (
      <div>
        {this.state.liste.map((elem) => <p>{elem.nom}</p>)}
      </div>
    )
  }
}