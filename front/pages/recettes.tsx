import Layout from '../components/Layout';
import Head from 'next/head'
import React from 'react'
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from "cookie"
import { getUser } from '../API/Api';
import List from '../components/List';


type MyProps = any;
type MyState = { favs: any };

class MesRecettes extends React.Component<MyProps, MyState> {

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

    return { user: user }
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <h1>Recettes de {this.props.user.fullname} (@{this.props.user.username})</h1>
          <List liste={this.props.user.recettesCompactes} update={() => null} notesPerso={[]}/>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(MesRecettes)