import Layout from '../components/Layout';
import Head from 'next/head'
import List from '../components/List'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <List/>
      </Layout>
    </div>
  );
}