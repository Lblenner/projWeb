import Layout from '../components/Layout';
import Head from 'next/head'
import React from 'react'
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'
import Router from 'next/router'

type MyProps = any;
type MyState = { favs: any };

class MesRecettes extends React.Component<MyProps, MyState> {

  deco() {
    const action = { type: "REMOVE_SESSION" }
    this.props.dispatch(action)

    Router.push('/')
  }

  render() {
    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <p>Profil</p>
          <Button onClick={() => this.deco()}>Se deconnecter</Button>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(MesRecettes)