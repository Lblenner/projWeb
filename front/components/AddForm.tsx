import React from 'react'
import TextArea from './TextArea';
import Ingredients from './Ingredients';
import Router from 'next/router'
import { MySnackbar } from './Snackbar';
import { connect } from 'react-redux'
import InputFile from './InputFile';
import { uploadImage } from '../API/Api'
import { addRecette } from '../API/Api'
import { CircularProgress } from '@material-ui/core';

type MyProps = any;
type MyState = { open: boolean, msg, loading };

class AddForm extends React.Component<MyProps, MyState>  {

  textarea
  image: File

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg: "Une erreur s'est produite",
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textarea = ""
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.persist();

    this.setState({loading: true})
    let link
    let prepa = 2

    //Upload de l'image si image précisé
    if (this.image != null) {
      let imgresponse = await uploadImage(this.image)

      if (!imgresponse.ok) {
        this.setState({ open: true, loading: false })
        console.log(imgresponse)
        return
      }

      let imgjson = await imgresponse.json()

      if (!imgjson.success) {
        this.setState({ open: true, loading: false })
        console.log(imgjson)
        return
      }

      link = imgjson.data.link
      prepa = 1
    }


    //Création de la recette
    let token = this.props.token
    let recette = this.createBody(event.target, link, prepa)
    let response = await addRecette(recette, token)

    if (response.status != 201) {
      console.log(response)
      let json = await response.json()
      console.log(JSON.stringify(json))
      this.setState({ msg: json.message, open: true, loading: false })
      return
    }


    var json = await response.json()

    console.log("Voici la réponse: " + JSON.stringify(json))
    Router.push('/')
  }

  setImage(img) {
    this.image = img
  }

  //On crée le body de la requete a partir des events du formulaire
  createBody(listeData, link,k) {
    let n = listeData.length
    let recette = new Recette(listeData[0].value, listeData[1].value, listeData[3].value, listeData[n - k].value, link)

    recette.elements.push({ ingredient: { nom: listeData[6].value }, quantite: { nombre: listeData[4].value, unite: listeData[5].value } })
    for (let i = 7; i < n - 4; i += 4) {
      let nombre = listeData[i].value
      let unite = listeData[i + 1].value
      let nom = listeData[i + 2].value

      recette.elements.push({ ingredient: { nom: nom }, quantite: { nombre: nombre, unite: unite } })
    }
    return recette
  }


  render() {

    return (
      <form onSubmit={this.handleSubmit} id="form">

        <MySnackbar open={this.state.open} handleClose={() => this.setState({ open: false })} msg={this.state.msg} />

        <div className="form-group">
          <label htmlFor="titre">Titre</label>
          <input required type="text" className="form-control" id="titre" placeholder="Brownie au chocolat" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input required type="text" className="form-control" id="description" placeholder="Une recette originale pour les friands de nouvelles expériences" />
        </div>

        <InputFile setImage={(img) => this.setImage(img)} aspectRatio={9 / 4} />

        <div className="form-group">
          <label htmlFor="parts">Nombre de parts de la recette (facultatif)</label>
          <input type="number" min={1} max={100} className="form-control" id="nbParts" placeholder="10" />
        </div>

        <div className="form-group">
          <label htmlFor="">Ingrédients</label>
          <Ingredients />
        </div>

        <div className="form-group">
          <label htmlFor="area">Recette</label>
          <TextArea size={300} id="area" placeHolder={["Etape 1:", "Faire fondre le chocolat...", "Etape 2:", "Battre les oeufs..."]} />
        </div>

        {this.state.loading ?
          <CircularProgress /> :
          <button type="submit" className="btn btn-primary">Créer la recette</button>
        }

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

export default connect(mapStateToProps)(AddForm)


//Objet du body de la requete d'ajout de recette
class Recette {
  photo: string
  nom: string;
  description: string;
  elements: Array<object>;
  preparation: string;
  nombreParts: Uint8Array;

  constructor(nom, description, nombreParts, recette, link) {
    this.photo = link
    this.nom = nom
    this.description = description
    this.preparation = recette
    this.elements = []
    this.nombreParts = nombreParts == null ? 0 : nombreParts
  }


}