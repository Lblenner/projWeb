import React from 'react'
import Layout from '../components/Layout';
import Head from 'next/head'
import Cookies from 'universal-cookie';
import List from '../components/List';

const cookies = new Cookies();

type MyProps = { };
type MyState = { favs: any };

export default class Fav extends React.Component<MyProps, MyState> {

  constructor(props){
    super(props)
    this.state = {
      favs: []
    }
  }
  componentDidMount(){
    var favs = cookies.get('favs')
    this.setState({favs: favs})
  }
  
  render() {
    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <h1>Favorite</h1>
          <List liste={this.state.favs} update={(id) => {
            this.setState({favs: this.state.favs.filter((e) => e.id != id)})
          }} />
        </Layout>
      </div>
    );
  }
}