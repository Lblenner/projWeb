import Layout from '../components/Layout';
import Head from 'next/head'
import React from 'react'
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'
import Router from 'next/router'

type MyProps = any;
type MyState = { favs: any };

class Profil extends React.Component<MyProps, MyState> {

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
          <div style={{display:"flex", flexGrow: 1,backgroundColor:'blue', flexDirection: 'row'}}>
            <div style={{width:'350px', backgroundColor:'red'}}>
              <h1>Jean de la Riviere du gros</h1>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Profil)