import React from 'react'
import TextArea from './TextArea';
import Ingredients from './Ingredients';
import Router from 'next/router'
import { MySnackbar } from './Snackbar';
import { connect } from 'react-redux'
import InputFile from './InputFile';

type MyProps = any;
type MyState = { open: boolean };

class AddForm extends React.Component<MyProps, MyState>  {

  textarea
  imageUrl

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textarea = ""
  }

  async addRecette(recette) {

    let token = this.props.token

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('authorization', 'Basic ' + token);


    var myInit = {
      method: 'POST',
      headers: requestHeaders,
      mode: 'cors' as RequestMode,
      cache: 'default' as RequestCache,
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify(recette)
    };

    var response = await fetch("https://134.122.90.48/api/v1/recettes", myInit)

    console.log("Voici le fetch" + JSON.stringify(recette))

    if (response.status >= 400) {
      this.setState({ open: true })
      return
    }


    var json = await response.json()

    console.log("Voici la réponse: " + JSON.stringify(json))
    Router.push('/')
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.uploadImage(this.imageUrl)
    //let recette = this.createBody(event.target)
    //this.addRecette(recette)
  }

  setImage(img) {
    this.imageUrl = img
  }

  async uploadImage(url) {
    
    const formData = new FormData();

    formData.append("image", url);
    formData.append("type", "url");

    const requestHeaders: HeadersInit = new Headers({ Authorization: 'Client-ID 024ab219c29e9f3' });

    //e38534b89de183c1405736b8ecf958ed1f904705

    const response = await fetch("https://api.imgur.com/3/image", {
      method: 'POST',
      headers: requestHeaders,
      body: formData
    });

    console.log(response)
    let json = await response.json()
    console.log(json)
  }

  createBody(listeData) {
    let n = listeData.length
    let recette = new Recette(listeData[0].value, listeData[1].value, listeData[n - 2].value)
    recette.elements.push({ ingredient: { nom: listeData[5].value }, quantite: { nombre: listeData[3].value, unite: listeData[4].value } })
    for (let i = 6; i < n - 4; i += 4) {
      let nombre = listeData[i].value
      let unite = listeData[i + 1].value
      let nom = listeData[i + 2].value

      recette.elements.push({ ingredient: { nom: nom }, quantite: { nombre: nombre, unite: unite } })
    }
    return recette
  }

  closeSnack() {
    this.setState({ open: false })
  }

  render() {

    if (!this.props.token) { //A faire dans initial props dans la page
      Router.push('/login')
    }


    return (
      <form onSubmit={this.handleSubmit} id="form">

        <MySnackbar open={this.state.open} handleClose={() => this.closeSnack()} msg="Une erreur s'est produite, nous n'avons pas pu poster votre recette" />

        <div className="form-group">
          <label htmlFor="titre">Titre</label>
          <input required type="text" className="form-control" id="titre" placeholder="Brownie au curry" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input required type="text" className="form-control" id="description" placeholder="Une recette original pour les friands de nouvelles expériences" />
        </div>

        <InputFile setImage={(img) => this.setImage(img)} />

        <div className="form-group">
          <label htmlFor="">Ingrédients</label>
          <Ingredients />
        </div>

        <div className="form-group">
          <label htmlFor="area">Recette</label>
          <TextArea id="area" placeHolder={["Etape 1:", "Préparer le chou...", "Etape 2:", "Videz un bol de curry..."]} />
        </div>

        <button type="submit" className="btn btn-primary">Créer la recette</button>

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

class Recette {
  nom: string;
  description: string;
  elements: Array<object>;
  //recette: string;

  constructor(nom, description, recette) {
    this.nom = nom
    this.description = description
    //this.recette = recette
    this.elements = []
  }


}