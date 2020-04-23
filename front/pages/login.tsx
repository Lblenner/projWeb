import Layout from '../components/Layout';
import Head from 'next/head'
import LoginForm from '../components/LoginForm';


export default function Login() {

  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <div className="container-fluid">
          <LoginForm/>
        </div>
      </Layout>
    </div>
  );
}