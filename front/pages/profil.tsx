import Layout from '../components/Layout';
import Head from 'next/head'


export default function Profil() {
  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Layout>
        <p>Profil</p>
      </Layout>
    </div>
  );
}