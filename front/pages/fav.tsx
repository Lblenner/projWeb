import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import Cookies from 'universal-cookie';
import List from '../components/List';
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from 'next/link';
import { connect } from 'react-redux'
import { getUser, addFav } from '../API/Api';
import cookie from "cookie"
import { FaChevronDown, FaChevronUp, FaMinus } from "react-icons/fa"


const cookies = new Cookies();

type MyProps = any;
type MyState = { cookieFavs: any, notesUser: any, accountFavs, masque,};


class Fav extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props)
    this.state = {
      cookieFavs: [],
      notesUser: this.props.notes,
      accountFavs: this.props.listeFav,
      masque: false
    }
  }

  static async getInitialProps(ctx) {
    let username = ctx.query.username
    let listeFav = null
    let notes = []

    if (username == null && ctx.isServer) {
      username = cookie.parse(ctx.req.headers.cookie).username
    }

    if (username == null && !ctx.isServer) {
      username = ctx.store.getState().username
    }

    if (username) {
      let response = await getUser(username)

      if (response.status != 200) {
        console.log("Erreur")
        console.log(response)
        return { listeFav: null, name: ctx.query.username }
      }

      let user = await response.json()

      listeFav = user.favoris
      notes = user.notes
    }

    return { listeFav: listeFav, name: ctx.query.username, notes: notes }
  }

  async componentDidMount() {
    //Recuperatio ndes favoris cookies
    var cookieFavs = cookies.get('favs')
    this.setState({ cookieFavs: cookieFavs })

    if (cookieFavs.length == 0) {
      this.setState({ masque: true })
    }

  }

  async sync() {
    cookies.set('favs', [])
    let username = this.props.username
    for (let i = 0; i < this.state.cookieFavs.length; i++) {
      let fav = this.state.cookieFavs[i]
      let token = this.props.token
      let response = await addFav(token, username, fav.id)

      if (response.status != 200) {
        console.log("Une erreur c'est produite lors de l'ajout d'un favoris")
        console.log(response)
      }
    }

    this.setState({ cookieFavs: [] })

    let response = await getUser(username)

    if (response.status != 200) {
      console.log("Erreur")
      console.log(response)
      return
    }

    let user = await response.json()
    this.setState({ accountFavs: user.favoris, masque: true })
  }

  render() {
    let content

    if (this.props.name) {
      //Page avec username => Affichage des favoris du username
      let l = this.state.accountFavs.map((elem) => elem.recetteCompact)

      content = <div>
        <h1>Favoris de {this.props.name}</h1>
        <List liste={l} update={(id) => {
          this.setState({ accountFavs: l.filter((e) => e.id != id) })
        }} notesPerso={this.state.notesUser} listeFav={this.state.accountFavs} />
      </div>

    } else if (this.props.username) {
      //Page sans username + connecté => Affichage des favoris cookies et du compte
      let l = this.state.accountFavs.map((elem) => elem.recetteCompact)

      content = <div>
        <h1 style={{ marginTop: "10px" }}>Mes favoris </h1>
        <List liste={l} update={(id) =>
          this.setState({ accountFavs: this.state.accountFavs.filter((e) => e.recetteCompact.id != id) })}
          notesPerso={this.state.notesUser} listeFav={this.state.accountFavs} />


        <h1 style={{ marginTop: "10px" }}>
          Mes favoris associé au navigateur
          <button onClick={() => this.setState({ masque: !this.state.masque })} className="btn btn-success" >
            {this.state.masque ? "Afficher" : "Masquer"}
          </button>
        </h1>

        {!this.state.masque &&
          <div>
            <Alert style={{ marginBottom: 10, marginTop: 10 }} severity="info">
              Vous pouvez synchroniser votre navigateur avec votre compte <br />
              Attention ! Cela supprimera vos favoris de votre navigateur mais les conservera sur votre compte <br />
              <strong id="link" onClick={() => this.sync()}>Synchroniser</strong>
            </Alert>
            < List listeFav={[]} liste={this.state.cookieFavs} update={(id) =>
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
      //Page sans username + Compte déconnecté => affiche des favoris cookies

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
        <List listeFav={[]} liste={this.state.cookieFavs} update={(id) => {
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