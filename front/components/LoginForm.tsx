import React from 'react'
import { MySnackbar } from './Snackbar';
import { connect } from 'react-redux'

type MyProps = any;
type MyState = { snackOpen: boolean };


class LoginForm extends React.Component<MyProps, MyState>  {

  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event) {
    event.preventDefault();
    const action = { type: "SET_SESSION", value: "er" }
    this.props.dispatch(action)
  }

  closeSnack() {
    this.setState({ snackOpen: false })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="form">

        <MySnackbar open={this.state.snackOpen} handleClose={() => this.closeSnack()} msg="Une erreur s'est produite"/>

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
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(LoginForm)