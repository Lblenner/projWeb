import Layout from '../components/Layout';
import Head from 'next/head'
import List from '../components/List'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Layout>
        <List/>
      </Layout>
    </div>
  );
}