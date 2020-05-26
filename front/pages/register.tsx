import Layout from '../components/Layout';
import Head from 'next/head'
import RegisterForm from '../components/RegisterForm';

export default function About() {

  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <div className="container-fluid">
          <RegisterForm />
        </div>
      </Layout>
    </div>
  );
}