import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import List from '../components/List'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { getUser, getRecettes } from '../API/Api'

type MyProps = any
type MyState = { notesUser, fav };

const fetch = require('node-fetch');

class Index extends React.Component<MyProps, MyState> {

  static async getInitialProps(ctx) {

    var response = await getRecettes()

    if (response.status > 400) {
      return
    }

    var json = await response.json()

    return { liste: json }

  }

  async componentDidMount() {

    //Affiche des notes de la perosnne connecté
    let username = this.props.username
    if (!username) {
      return
    }

    let response = await getUser(username)

    if (response.status > 400) {
      console.log("Vous n'etes pas connecté")
      return
    }
    let user = await response.json()

    console.log(user.notes)

    this.setState({ notesUser: user.notes, fav: user.favoris })
  }


  constructor(props) {
    super(props)
    this.state = {
      notesUser: [],
      fav: []
    }
  }

  render() {

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <SearchBar />
          </div>
          <List listeFav={this.state.fav} liste={this.props.liste} update={() => 1} notesPerso={this.state.notesUser}/>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Index)