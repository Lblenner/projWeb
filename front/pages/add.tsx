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

  render() {

    //Redirection
    if (!this.props.token) {
      Router.push('/login?msg=1')
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