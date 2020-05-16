// Popup pour se connecter

import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions, DialogContent, CircularProgress } from '@material-ui/core';
import { Button, } from '@material-ui/core';
import TextArea from './TextArea';
import { patchUser } from '../API/Api'
import { connect } from 'react-redux'
import { MySnackbar } from './Snackbar';
import InputFile from './InputFile';
import { uploadImage } from '../API/Api'


type MyProps = { open: any, handleClose: any, nom, mail, date, bio, photo, username, token, success };
type MyState = { nom, mail, date, bio, photo, load, msg, open };

class DialogModifProfil extends React.Component<MyProps, MyState> {

  image

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      nom: this.props.nom ? this.props.nom : "",
      mail: this.props.mail ? this.props.mail : "",
      date: this.props.date ? this.props.date : "",
      bio: this.props.bio ? this.props.bio : "",
      photo: this.props.photo,
      msg: "Une erreur s'est produite",
      open: false
    };
  }

  handleAnnule = () => {
    this.props.handleClose()
    this.setState({
      nom: this.props.nom ? this.props.nom : "",
      mail: this.props.mail ? this.props.mail : "",
      date: this.props.date ? this.props.date : "",
      bio: this.props.bio ? this.props.bio : "",
      photo: this.props.photo
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.persist();

    let link

    if (this.image != null) {
      let imgresponse = await uploadImage(this.image)

      if (!imgresponse.ok) {
        this.setState({ open: true })
        console.log(imgresponse)
        return
      }

      let imgjson = await imgresponse.json()

      if (!imgjson.success) {
        this.setState({ open: true })
        console.log(imgjson)
        return
      }

      link = imgjson.data.link

    }

    this.setState({ load: true })
    let username = this.props.username
    let token = this.props.token
    let response = await patchUser(username, token, null, this.state.bio, link, this.state.nom, this.state.date, this.state.mail)

    console.log(response)
    let json = await response.json()
    console.log(JSON.stringify(json))

    if(response.status != 200){
      this.setState({msg: json.propertyViolations[0].message, open: true, load: false})
      return
    }

    this.props.success()
    this.props.handleClose()
    this.setState({ load: false })
  }

  setImage(img) {
    this.image = img
  }

  render() {

    return (
      <div id="dialoguePopUp">

        <MySnackbar open={this.state.open} handleClose={() => this.setState({ open: false })} msg={this.state.msg} />

        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogTitle id="simple-dialog-title">Modifier Profil</DialogTitle>

          {this.state.load ? <DialogContent><CircularProgress /></DialogContent> :
            <form onSubmit={this.handleSubmit}>
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
                    onChange={(value) => this.setState({ bio: value })} value={this.state.bio} required={false} />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date de Naissance</label>
                  <input className="form-control" type="date"
                    onChange={(e) => this.setState({ date: e.target.value })} value={this.state.date} id="date" />
                </div>

                <InputFile setImage={(img) => this.setImage(img)} aspectRatio={7 / 9} />

              </DialogContent>

              <DialogActions>
                <Button color="primary" variant="contained" style={{ margin: 10 }} onClick={this.handleAnnule}>Annuler</Button>
                <Button color="primary" variant="contained" style={{ margin: 10 }} type="submit">Enregistrer</Button>
              </DialogActions>
            </form>}

        </Dialog>

      </div>

    )

  }

}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(DialogModifProfil)