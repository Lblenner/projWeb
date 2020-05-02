import Layout from '../components/Layout';
import Head from 'next/head'
import LoginForm from '../components/LoginForm';
import Router from 'next/router'

function whereToGo () {
   Router.push('/profil')
}

export default function Login() {

  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <div className="container-fluid">
          <LoginForm whereToGo={whereToGo}/>
        </div>
      </Layout>
    </div>
  );
}