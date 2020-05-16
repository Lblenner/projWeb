// Popup pour se connecter

import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm';
import { DialogTitle } from '@material-ui/core';
import Router from 'next/router'

type MyProps = { open: any, handleClose: any};
type MyState = {};

export default class DialogConnectionCom extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleOnClick = () => {
    Router.push('/register')
  }

  render() {

    return (
      <div id="dialoguePopUp">

        <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <DialogTitle id="simple-dialog-title">Connectez-vous pour ajouter un commentaire !</DialogTitle>
            <div id="login">
              <LoginForm whereToGo={this.props.handleClose}/>
            </div>
            <div id="inscription">
              <DialogTitle id="simple-dialog-title">Pas de compte ? Inscrivez-vous !</DialogTitle>
              <button onClick={this.handleOnClick} className="btn btn-success" >M'inscrire</button>
            </div>
        </Dialog>

      <style jsx>{`

        #login {
          margin-left: 50px;
          margin-right: 50px;
        }

        #inscription {
          margin-bottom: 20px;
          text-align : center;
        }

        .btn {
          background-color: #FFCC7A;
          border-color: #FFCC7A;
        }
        
      `}</style>

      </div>
      
    )

  }

}