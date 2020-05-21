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
type MyState = { type, icon, liste };

class MesRecettes extends React.Component<MyProps, MyState> {

  liste
  listeDown
  listeUp

  constructor(props) {
    super(props)
    this.state = {
      type: "neutre",
      icon: <FaMinus style={{ marginLeft: 5 }} size={20} />,
      liste: null
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

    return { user: user }
  }

  item(elem) {

    let note = this.props.user.notes.find((note) => note.recetteId == elem.id)

    let valeur = note ? note.valeur : null

    return (<div id="note">

      {valeur ? valeur : "--"}
      <style jsx>{`
          #note {
            font-size: 35px;
            width: 99px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: solid; 
            border-width: 0px 1px 1px 0px;
          }
        `}</style>
    </div>)
  }

  changeType() {
    switch (this.state.type) {
      case "neutre":
        this.setState({
          type: "down",
          icon: <FaChevronDown style={{ marginLeft: 5 }} size={20} />,
          liste: this.listeDown
        })
        break;
      case "up":
        this.setState({
          type: "neutre",
          icon: <FaMinus style={{ marginLeft: 5 }} size={20} />,
          liste: this.liste
        })
        break;
      case "down":
        this.setState({
          type: "up",
          icon: <FaChevronUp style={{ marginLeft: 5 }} size={20} />,
          liste: this.listeUp
        })
        break
    }
  }

  componentDidMount() {
    this.setState({ liste: this.props.user.recettesCompactes })
    this.liste = this.props.user.recettesCompactes

    //Tri
    this.listeDown = this.props.user.recettesCompactes.slice().sort((a, b) => {
      let note1 = this.props.user.notes.find((note) => note.recetteId == a.id)
      let note2 = this.props.user.notes.find((note) => note.recetteId == b.id)
      let v1 = note1 ? note1.valeur : -1
      let v2 = note2 ? note2.valeur : -1
      return v1 < v2
    })
    this.listeUp = this.props.user.recettesCompactes.slice().sort((a, b) => {
      let note1 = this.props.user.notes.find((note) => note.recetteId == a.id)
      let note2 = this.props.user.notes.find((note) => note.recetteId == b.id)
      let v1 = note1 ? note1.valeur : 11
      let v2 = note2 ? note2.valeur : 11
      return v1 > v2
    })

  }
  render() {
    let liste
    if (this.state.liste) {
      liste = this.state.liste
    } else {
      liste = this.props.user.recettesCompactes
    }

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <h1>Recettes de {this.props.user.fullname} (@{this.props.user.username})</h1>
          <div onClick={() => this.changeType()} id="note" >Notes  {this.state.icon}</div>
          <List liste={liste} notesPerso={[]} customItem={(elem => this.item(elem))} />
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