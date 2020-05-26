import Layout from '../components/Layout';
import Head from 'next/head'
import React from 'react'
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from "cookie"
import { getUser } from '../API/Api';
import List from '../components/List';
import { FaChevronDown, FaChevronUp, FaMinus } from "react-icons/fa"
import RecetteItem from '../components/RecetteItem';


type MyProps = any;
type MyState = { liste, fav };

class MesRecettes extends React.Component<MyProps, MyState> {

  liste
  listeDown
  listeUp

  constructor(props) {
    super(props)
    this.state = {
      liste: this.props.user.recettesCompactes,
      fav : []
    }
  }


  deco() {
    const action = { type: "REMOVE_SESSION" }
    this.props.dispatch(action)

    Router.push('/')
  }

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
      console.log("Erreur")
      return { user: null }
    }

    user = await response.json()

    //On renvoie ici l'user dont affiche les recettes
    return { user: user, fav: user.favoris }
  }


  render() {

    let liste = this.state.liste

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <h1>Recettes de {this.props.user.fullname} (@{this.props.user.username})</h1>
          <List listeFav={this.state.fav} liste={liste} notesPerso={[]} />
        </Layout>

        <style jsx>{`
          #note {
            width: 100px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            border: solid; 
            border-width: 1px 1px 0px 1px;
          }
          #note:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(MesRecettes)