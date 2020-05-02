import Layout from '../components/Layout';
import Head from 'next/head'
import TextArea from '../components/TextArea'
import AddForm from '../components/AddForm';
import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import cookie from "cookie"



type MyProps = any;
type MyState = { favs: any };

class Add extends React.Component<MyProps, MyState> {

  static async getInitialProps(ctx) {

    if (ctx.isServer) {

      const token = cookie.parse(ctx.req.headers.cookie).logged
      console.log(token)
      console.log("HEy")
      const { res } = ctx

      if (token == null) {
        res.writeHead(301, {
          Location: '/login'
        });
        res.end();
      }

      return {}
    }


    return {}
  }


  render() {

    if (!this.props.token) {
      Router.push('/login')
      return <div></div>
    }

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