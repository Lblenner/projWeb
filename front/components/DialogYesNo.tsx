// Popup pour se connecter

import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm';
import { DialogTitle, DialogActions, Button, DialogContentText, DialogContent } from '@material-ui/core';
import Router from 'next/router'

type MyProps = { open: any, handleClose: any, handleYes, titre, msg };
type MyState = { loading };

export default class DialogYesNo extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }; 
  }

  async handleYes() {
    this.setState({loading: true})
    await this.props.handleYes()
    this.props.handleClose()
    this.setState({loading: false})
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
          <DialogTitle id="simple-dialog-title">{this.props.titre}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Non
          </Button>
            <Button onClick={() => this.handleYes()} color="primary" autoFocus>
              Oui
          </Button>
          </DialogActions>
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