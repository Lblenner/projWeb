import Layout from '../components/Layout';
import Head from 'next/head'
import TextArea from '../components/TextArea'
import AddForm from '../components/AddForm';
import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'


type MyProps = {};
type MyState = { favs: any };

class Add extends React.Component<MyProps, MyState> {

  static async getInitialProps(ctx) {

    const { res } = ctx

    //On peut utiliser isServer à la place de res
    if (res && !ctx.store.token) {
      res.writeHead(301, {
        Location: '/login'
      });
      res.end();
    } else if (!ctx.store.token){
      Router.push('/login')
    }

  }


  render() {

    return (
      <div>
        <Head>
          <title>Les recettes de Martine</title>
        </Head>
        <Layout>
          <div className="container-fluid">
            <AddForm />
          </div>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Add)