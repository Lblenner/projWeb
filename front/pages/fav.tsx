import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import Cookies from 'universal-cookie';
import List from '../components/List';
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from 'next/link';
import { connect } from 'react-redux'
import { getUser } from '../API/Api';
import cookie from "cookie"

const cookies = new Cookies();

type MyProps = any;
type MyState = { cookieFavs: any, notesUser: any, accountFavs, masque };


function getFavoris(username) {
  let e = () => []
  return { status: 401, json: e }
}

class Fav extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props)
    this.state = {
      cookieFavs: [],
      notesUser: [],
      accountFavs: this.props.listeFav,
      masque: false
    }
  }

  static async getInitialProps(ctx) {
    let username = ctx.query.username
    let listeFav = null

    if (username == null && ctx.isServer) {
      username = cookie.parse(ctx.req.headers.cookie).username
    }

    if (username == null && !ctx.isServer) {
      username = ctx.store.getState().username
    }

    if (username) {
      let response = getFavoris(username)

      if (response.status > 400) {
        console.log("Erreur")
        return { listeFav: null, name: ctx.query.username }
      }

      listeFav = await response.json()
    }


    return { listeFav: "r", name: ctx.query.username }
  }

  async componentDidMount() {
    var cookieFavs = cookies.get('favs')
    console.log(cookieFavs)
    this.setState({ cookieFavs: cookieFavs })

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

    this.setState({ notesUser: user.notes })
  }

  sync() {
    
  }

  render() {
    let content

    if (this.props.name) {
      //Si un nom est précisé

      content = <div>
        <h1>Favoris de {this.props.name}</h1>
        <List liste={this.state.accountFavs} update={(id) => {
          this.setState({ accountFavs: this.state.accountFavs.filter((e) => e.id != id) })
        }} notesPerso={this.state.notesUser} />
      </div>

    } else if (this.props.username) {
      //Si pas de nom et connecté

      content = <div>
        <h1 style={{ marginTop: "10px" }}>Mes favoris </h1>

        <List liste={this.state.accountFavs} update={(id) =>
          this.setState({ accountFavs: this.state.accountFavs.filter((e) => e.id != id) })}
          notesPerso={this.state.notesUser} />


        <h1 style={{ marginTop: "10px" }}>
          Mes favoris associé au navigateur
          <button onClick={() => this.setState({ masque: !this.state.masque })} className="btn btn-success" >
            {this.state.masque ? "Afficher" : "Masquer"}
          </button>
        </h1>

        {!this.state.masque &&
          <div>
            <Alert style={{ marginBottom: 10, marginTop: 10 }} severity="info">
              Vous pouvez synchroniser votre navigateur avec votre compte <br/>
              Attention ! Cela supprimera vos favoris de votre navigateur mais les conservera sur votre compte <br/>
              <strong id="link" onClick={() => this.sync()}>Synchroniser</strong>
            </Alert>
            < List liste={this.state.cookieFavs} update={(id) =>
              this.setState({ cookieFavs: this.state.cookieFavs.filter((e) => e.id != id) })}
              notesPerso={this.state.notesUser} />
          </div>}

        <style jsx>{`
          .btn {
            background-color: #ed3232;
            border-color: #ed3232;
            margin-left: 30px
          }
          #link {
            color: black
          }
          #link:hover {
            cursor: pointer;
            color: blue;
            text-decoration: none;
          }
        `}</style>

      </div>

    } else {
      //Pas de nom pas connecté

      content = <div>
        <h1>Mes favoris</h1>
        {this.props.token ? null :
          <Alert style={{ marginBottom: 10, marginTop: 10 }} severity="info">
            Vous n'êtes pas connecté, les favoris seront donc stockés dans le navigateur. <br />
            Ils pourront donc être supprimé si vous nettoyez vos cookies. <br />
            Pour être sûr de conserver vos recettes,
            <Link href="/login"><a className="link"><strong> connectez vous</strong></a></Link> ou
            <Link href="/register"><a className="link"><strong> inscrivez vous</strong></a></Link>.
          </Alert>
        }
        < List liste={this.state.cookieFavs} update={(id) => {
          this.setState({ cookieFavs: this.state.cookieFavs.filter((e) => e.id != id) })
        }}
          notesPerso={this.state.notesUser} />
      </div>

    }



    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <div id="main_container">
            {content}
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