import Layout from '../components/Layout';
import Head from 'next/head'
import React from 'react'
import { Button, IconButton, } from '@material-ui/core';
import { connect } from 'react-redux'
import Router from 'next/router'
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { MdSearch } from 'react-icons/md'
import { getUser } from '../API/Api';
import cookie from "cookie"
import Activites from '../components/Activites';
import DialogModifProfil from '../components/DialogModifProfil';


type MyProps = any;
type MyState = { search: any, own: boolean, openModif: boolean, user, notesUser };

class Profil extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props)
    this.state = {
      notesUser: [],
      search: false,
      own: false,
      openModif: false,
      user: this.props.user
    }
  }

  //Executé sur le serveur et le client
  static async getInitialProps(ctx) {
    let username = ctx.query.username
    let user = null

    if (username == null && ctx.isServer) {
      username = cookie.parse(ctx.req.headers.cookie).username
    }

    if (username == null && !ctx.isServer) {
      username = ctx.store.getState().username
    }

    let response = await getUser(username)

    if (response.status > 400) {
      const action = { type: "REMOVE_SESSION" }
      ctx.store.dispatch(action)
      return { user: null }
    }

    user = await response.json()

    return { user: user }
  }

  
  async componentDidMount() {

    //Affiche deconnexion/modification
    if (this.props.user && this.props.username == this.props.user.username) {
      this.setState({ own: true })
    }

    //Chargement des notes de la personne connecté
    let username = this.props.username
    if (!username) {
      return
    }

    let response = await getUser(username)

    //Deconnexion si credential invalide
    if (response.status != 200) {
      const action = { type: "REMOVE_SESSION" }
      this.props.dispatch(action)
      return
    }
    let user = await response.json()

    this.setState({ notesUser: user.notes })

  }

  deco() {
    const action = { type: "REMOVE_SESSION" }
    this.props.dispatch(action)

    Router.push('/')
  }

  page = (p) => {
    return (<div style={{ display: "flex", flexGrow: 1, flexDirection: 'row', marginTop: "5px", marginBottom: "5px" }}>
      <DialogModifProfil open={this.state.openModif} handleClose={() => this.setState({ openModif: false })}
        date={p.dateNaissance} mail={p.email} nom={p.fullname} bio={p.biographie} photo={p.photo}
        success={() => this.reloadUser()} />
      <div id="left">
        <div style={{ padding: 4 }}>
          {this.state.own && <div id="button_container">
            <Button color="primary" variant="contained" onClick={() => this.deco()}>Se déconnecter</Button>
            <Button color="primary" variant="contained" onClick={() => this.setState({ openModif: true })}>Modifier profil</Button>
          </div>}
          <div style={{ width: '350px', height: '450px', borderWidth: 1, border: 'solid', }}>
            {p.photo != null &&
              <img src={p.photo} id="photo" width='344px' height='444px' />}
          </div>
          <div style={{ padding: '10px', paddingBottom: 0 }}>
            <h1 style={{ marginBottom: 0 }}>{p.fullname}</h1>
            <h4 style={{ marginBottom: 16, marginLeft: 5 }}>@{p.username}</h4>
            {p.email && <h6>Mail: {p.email} </h6>}
            {p.dateNaissance && <h6>Date de Naissance: {(new Date(p.dateNaissance)).toLocaleDateString("fr-FR")} </h6>}
            {p.dateInscription && <h6>Inscription: {(new Date(p.dateInscription)).toLocaleDateString("fr-FR")} </h6>}
            <div id="button_container" style={{ marginTop: '20px' }}>
              <Button color="primary" variant="contained" >Favoris</Button>
              <Button color="primary" variant="contained" onClick={() => Router.push("/recettes?username=" + p.username)}>Liste des recettes</Button>
            </div>
            <h5 style={{ marginTop: 20 }}>Activités Récentes</h5>
          </div>
        </div>
        <Activites listeComment={p.commentaires} listeFavs={[]} listeNote={[]} listeRecette={p.recettesCompactes} />
      </div>
      <div id="right">
        <div style={{ minHeight: '200px', maxHeight: '600px', padding: "5px" }}>
          {p.biographie}
        </div>
        <div style={{ border: 'solid', borderWidth: '1px 0px 0px 0px', margin: "10px", borderColor: '#D3D3D3' }}>
          <div style={{ paddingTop: "10px" }}>
            <h1 style={{ marginBottom: 0 }}>Recettes ajoutées<label htmlFor="icon-button-file">
              <IconButton onClick={() => this.setState({ search: !this.state.search })} color="primary" aria-label="upload picture" component="span">
                <MdSearch size={33} color={this.state.search ? '#0099FF' : 'grey'} />
              </IconButton>
            </label></h1>

            {this.state.search && <SearchBar />}
          </div>

          <List listeFav={p.favoris?p.favoris:[]} liste={p.recettesCompactes} update={() => null} notesPerso={this.state.notesUser} />
        </div>
      </div>

      <style jsx>{`
      #left {
        width:360px;
        border: 1px solid;
        border-color: #D3D3D3;
        border-width: 0px 1px 0px 1px;
        min-height:100vh;
      }
      #right {
        display: flex;
        flex: 1;
        flex-direction: column;
        border: solid;
        border-width: 0px 1px 0px 0px;
        border-color: #D3D3D3;
      }
      #button_container { 
        margin-bottom: 15px;              
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      `}</style>
    </div>)
  }

  async reloadUser() {
    let response = await getUser(this.state.user.username)

    if (response.status != 200) {
      console.log("Erreur")
      return
    }

    let user = await response.json()
    this.setState({ user: user })

  }

  render() {

    let p = this.state.user
    let content = null

    if (p == null) {
      content = "Cet utilisateur n'existe pas"
    } else {
      content = this.page(p)
    }

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          {content}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Profil)