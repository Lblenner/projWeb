import React from 'react'
import Router from 'next/router'
import { MySnackbar } from './Snackbar';
import { connect } from 'react-redux'
import {createUser } from '../API/Api'


type MyProps = any;
type MyState = { snackOpen: boolean, msg: any };

class RegisterForm extends React.Component<MyProps, MyState>  {


  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
      msg: "Une erreur s'est produite"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async createUser(fullname, username, password) {

    var response = await createUser(fullname, username,password)
    var json = await response.json()

    if (response.status != 201) {
      this.setState({ snackOpen: true, msg: json.details })

      return
    }


    var token = btoa( username+ ":" + password)
    const action = { type: "SET_SESSION", value: token, username: username }
    this.props.dispatch(action)

    Router.push('/profil')
  }

  handleSubmit(event) {
    event.preventDefault();

    if (event.target[2].value != event.target[3].value){
      this.setState({msg:"Confirmation du mot de passe incorrect", snackOpen: true})
      return 
    }

    this.createUser(event.target[0].value,event.target[1].value,event.target[2].value)
  }

  closeSnack() {
    this.setState({ snackOpen: false })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="form">

        <MySnackbar open={this.state.snackOpen} handleClose={() => this.closeSnack()} msg={this.state.msg}/>

        <div className="form-group">
          <label htmlFor="nom">Votre nom</label>
          <input required type="text" className="form-control" id="nom" placeholder="Bernard Friot" />
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


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(RegisterForm)