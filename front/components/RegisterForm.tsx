import React from 'react'
import TextArea from './TextArea';
import Ingredients from './Ingredients';
import Router from 'next/router'
import { MySnackbar } from './Snackbar';
import Cookies from 'universal-cookie';

type MyProps = {};
type MyState = { snackOpen: boolean };
const cookies = new Cookies();

export default class RegisterForm extends React.Component<MyProps, MyState>  {


  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event) {
    event.preventDefault();
  }

  closeSnack() {
    this.setState({ snackOpen: false })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="form">

        <MySnackbar open={this.state.snackOpen} handleClose={() => this.closeSnack()} msg="Une erreur s'est produite"/>

        <div className="form-group">
          <label htmlFor="nom">Votre nom</label>
          <input required type="password" className="form-control" id="nom" placeholder="Bernard Friot" />
        </div>

        <div className="form-group">
          <label htmlFor="nid">Votre identifiant</label>
          <input required type="text" className="form-control" id="nid" placeholder="Identifiant" />
        </div>

        <div className="form-group">
          <label htmlFor="mdp">Mot de passe</label>
          <input required type="password" className="form-control" id="mdp" placeholder="Mot de passe" />
        </div>

        <div className="form-group">
          <label htmlFor="mdpc">Confimez le mot de passe</label>
          <input required type="password" className="form-control" id="mdpc" placeholder="Mot de passe" />
        </div>

        <button type="submit" className="btn btn-primary">S'inscrire</button>

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