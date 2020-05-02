import Layout from '../components/Layout';
import Head from 'next/head'
import React from 'react'
import { Button, IconButton, } from '@material-ui/core';
import { connect } from 'react-redux'
import Router from 'next/router'
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { MdSearch } from 'react-icons/md'
import MinimalActivite from '../components/MinimalComment';
import { BsChevronCompactDown } from 'react-icons/bs'


type MyProps = any;
type MyState = { search: any, listeact };

class Profil extends React.Component<MyProps, MyState> {

  constructor(props) {
    super(props)
    this.state = {
      search: false,
      listeact: [<MinimalActivite type="comment" />, <MinimalActivite type="note" avis={{ note: 0 }} />, <MinimalActivite type="favRemove" />, <MinimalActivite type="favAdd" />, <MinimalActivite type="note" avis={{ note: 10 }} />, <MinimalActivite type="addRecette" />]
    }
  }

  deco() {

    const action = { type: "REMOVE_SESSION" }
    this.props.dispatch(action)

    Router.push('/')
  }

  render() {
    let p = {
      fullname: "Jean de la Riviere",
      email: "leki.dgigfe@difoe.fr",
      username: "rodu54",
      biographie: "ma bio"
    }
    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <div style={{ display: "flex", flexGrow: 1, flexDirection: 'row', marginTop: "5px", marginBottom: "5px" }}>
            <div id="left">
              <div style={{ padding: 4 }}>
                <div style={{ width: '350px', height: '450px', borderWidth: 1, border: 'solid', }}>

                </div>
                <div style={{ padding: '10px', paddingBottom: 0 }}>
                  <h1 style={{ marginBottom: 0 }}>{p.fullname}</h1>
                  <h4 style={{ marginBottom: 16, marginLeft: 5 }}>@{p.username}</h4>
                  <h6>Mail: {p.email} </h6>
                  <h6>Date de Naissance: 06/90/9999 </h6>
                  <h6>Inscription: 76/34/1234 </h6>
                  <div id="button_container">
                    <Button color="primary" variant="contained" >Favoris</Button>
                    <Button color="primary" variant="contained" >Liste des recettes</Button>
                  </div>
                  <h5 style={{ marginTop: 20 }}>Activités Récentes</h5>
                </div>
              </div>
              {this.state.listeact}
              <div id="loadmore" style={{ border: 'solid', height: 45, marginBottom: 50, borderWidth: "1px 0px 1px 0px",borderColor: '#D3D3D3'}}
                onClick={() => null}>
                <div style={{ position: 'relative', left: '-46%', float: 'right', }}><BsChevronCompactDown size={40} />
                </div>
              </div>
            </div>
            <div id="right">
              <div style={{ minHeight: '200px', maxHeight: '600px', padding: "5px" }}>
                {p.biographie}
              </div>
              <div style={{ border: 'solid', borderWidth: '1px 0px 0px 0px', margin: "10px", borderColor: '#D3D3D3' }}>
                <div style={{ paddingTop: "10px" }}>
                  <h1 style={{ marginBottom: 0 }}>Recettes ajoutées<label htmlFor="icon-button-file">
                    <IconButton onClick={() => this.setState({ search: !this.state.search })} color="primary" aria-label="upload picture" component="span">
                      <MdSearch size={33} color={this.state.search ? '#0099FF' : 'grey'} />
                    </IconButton>
                  </label></h1>

                  {this.state.search && <SearchBar />}
                </div>

                <List liste={[{ nom: "recette", id: 1, auteurUsername: "gerard", description: "lalala" }]} update={() => null} />
              </div>
            </div>

            <style jsx>{`
              #left {
                width:360px;
                border: 1px solid;
                border-color: #D3D3D3;
                border-width: 0px 1px 0px 1px;
                min-height:100vh;
              }
              #right {
                display: flex;
                flex: 1;
                flex-direction: column;
                border: solid;
                border-width: 0px 1px 0px 0px;
                border-color: #D3D3D3;
              }
              #button_container { 
                margin-top: 20px;
                margin-bottom: 15px;              
                display: flex;
                flex-direction: row;
                justify-content: space-around;
              }
              #loadmore:hover {
                opacity: 0.7;
                cursor: pointer;
                background-color: #ffeaea;
              }
            `}</style>
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