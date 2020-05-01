import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import Cookies from 'universal-cookie';
import List from '../components/List';
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from 'next/link';
import { connect } from 'react-redux'


const cookies = new Cookies();

type MyProps = any;
type MyState = { favs: any };

class Fav extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props)
    this.state = {
      favs: []
    }
  }
  
  componentDidMount() {
    var favs = cookies.get('favs')
    this.setState({ favs: favs })
  }

  render() {
    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <div id="main_container">
            <h1>Favoris</h1>
            {this.props.token? null : <Alert severity="info">
              Vous n'êtes pas connecté, les favoris seront donc stockés dans le navigateur. <br/>
              Ils pourront donc être supprimé si vous nettoyez vos cookies. <br/>
              Pour être sûr de conserver vos recettes, 
              <Link href="/login"><a className="link"><strong> connectez vous</strong></a></Link> ou 
              <Link href="/login"><a className="link"><strong> inscrivez vous</strong></a></Link>.
            </Alert>}
            <List liste={this.state.favs} update={(id) => {
              this.setState({ favs: this.state.favs.filter((e) => e.id != id) })
            }} />
          </div>

          <style jsx>{`
              .link {
                color: black
              }
              .link:hover {
                cursor: pointer;
                color: blue;
                text-decoration: none;
              }
              `}</style>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Fav)