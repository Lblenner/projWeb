import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import List from '../components/List'
import SearchBar from '../components/SearchBar'

type MyProps = { liste: any };
type MyState = {};

const fetch = require('node-fetch');

export default class Index extends React.Component<MyProps, MyState> {

  static async getInitialProps(ctx) {

    const requestHeaders: HeadersInit = {'Content-Type': 'application/json'}

    var myInit = {
      method: 'GET',
      headers: requestHeaders,
      mode: 'cors' as RequestMode,
      cache: 'default' as RequestCache,
      credentials: 'include' as RequestCredentials
    };
    var response = await fetch("https://martine.rest/api/v1/recettes", myInit)

    if (response.status > 400) {
      return
    }

    var json = await response.json()

    return { liste: json }

  }


  render() {

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          {/*<SearchBar />*/}
          <List liste={this.props.liste} update={() => 1}/>
        </Layout>
      </div>
    );
  }
}