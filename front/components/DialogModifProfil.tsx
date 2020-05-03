// Popup pour se connecter

import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm';
import { DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core';
import Router from 'next/router'
import { Button, } from '@material-ui/core';
import TextArea from './TextArea';


type MyProps = { open: any, handleClose: any, nom, mail, date, bio, photo };
type MyState = { nom, mail, date, bio, photo };

export default class DialogModifProfil extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props);
    this.state = {
      nom: this.props.nom ? this.props.nom : "",
      mail: this.props.mail ? this.props.mail : "",
      date: this.props.date ? this.props.date : "",
      bio: this.props.bio ? this.props.bio : "",
      photo: this.props.photo   
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
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogTitle id="simple-dialog-title">Modifier Profil</DialogTitle>


          <form>
            <DialogContent>

              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input required type="text" className="form-control" id="nom" placeholder="Nom"
                  onChange={(e) => this.setState({ nom: e.target.value })} value={this.state.nom} />
              </div>

              <div className="form-group">
                <label htmlFor="mail">Mail</label>
                <input required type="text" className="form-control" id="mail" placeholder="Mail"
                  onChange={(e) => this.setState({ mail: e.target.value })} value={this.state.mail} />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Biographie</label>
                <TextArea size={70} id="bio" placeHolder={["Ma biographie"]}
                  onChange={(value) => this.setState({ bio: value })} value={this.state.bio}/>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date de Naissance</label>
                <input className="form-control" type="date"
                  onChange={(e) => this.setState({ date: e.target.value })} value={this.state.date} id="date" />
              </div>


            </DialogContent>

            <DialogActions>
              <Button color="primary" variant="contained" style={{ margin: 10 }}>Annuler</Button>
              <Button color="primary" variant="contained" style={{ margin: 10 }}>Enregistrer</Button>

            </DialogActions>
          </form>

          <div>


          </div>




        </Dialog>

        <style jsx>{`

        .row { 
          align-items: center;
        }
        
      `}</style>

      </div>

    )

  }

}