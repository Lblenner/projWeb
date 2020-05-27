import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import List from '../components/List'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { getUser, getRecettes } from '../API/Api'

type MyProps = any
type MyState = { notesUser, fav, liste };

const fetch = require('node-fetch');

class Index extends React.Component<MyProps, MyState> {

  static async getInitialProps(ctx) {

    var response = await getRecettes("")

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


    this.setState({ notesUser: user.notes, fav: user.favoris })
  }


  constructor(props) {
    super(props)
    this.state = {
      notesUser: [],
      fav: [],
      liste : this.props.liste.slice().reverse()
    }
  }

  async search(texte) {
    
    var response = await getRecettes(texte)

    if (response.status != 200) {
      return
    }

    var json = await response.json()

    this.setState({liste: json})
  }

  render() {

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
        </Head>
        <Layout>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <SearchBar search={(texte => this.search(texte))}/>
          </div>
          <List listeFav={this.state.fav} liste={this.state.liste} update={() => 1} notesPerso={this.state.notesUser}/>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Index)