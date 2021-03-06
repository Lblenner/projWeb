import React from 'react'
import { MySnackbar } from './Snackbar';
import { connect } from 'react-redux'

type MyProps = { whereToGo: Function, dispatch };
type MyState = { snackOpen: boolean, msg: any };


class LoginForm extends React.Component<MyProps, MyState>  {

  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
      msg: "Une erreur s'est produite"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleSubmit(event) {
    event.preventDefault();
    let username = event.target[0].value 
    var token = btoa(username + ":" + event.target[1].value)

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('accept', 'application/json');
    requestHeaders.set('authorization', 'Basic '+token);


    var myInit = {
      method: 'GET',
      headers: requestHeaders,
      mode: 'cors' as RequestMode,
      cache: 'default' as RequestCache,
      credentials: 'include' as RequestCredentials,
    };
    var response = await fetch("https://martine.rest/api/v1/users/login", myInit)

    if (response.status != 200) {
      this.setState({ snackOpen: true,})
      return
    }

    const action = { type: "SET_SESSION", value: token, username: username }
    this.props.dispatch(action)

    this.props.whereToGo()

  }

  closeSnack() {
    this.setState({ snackOpen: false })
  }

  render() {
    return (
      <div>
      <MySnackbar open={this.state.snackOpen} handleClose={() => this.closeSnack()} msg={this.state.msg} />
      <form onSubmit={this.handleSubmit} id="form">

        <div className="form-group">
          <label htmlFor="id">Identifiant</label>
          <input required type="text" className="form-control" id="id" placeholder="Identifiant" />
        </div>

        <div className="form-group">
          <label htmlFor="mdp">Mot de passe</label>
          <input required type="password" className="form-control" id="mdp" placeholder="Mot de passe" />
        </div>

        <button type="submit" className="btn btn-primary">Se connecter</button>

        <style jsx>{`
        #form {
          margin-top: 20px;
          margin-bottom: 30px;
        }
        .btn-primary {
          background-color: #FFCC7A;
          border-color: #FFCC7A;
        }
        `}</style>

      </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(LoginForm)