import Layout from '../components/Layout';
import Head from 'next/head'


export default function Profile() {
  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <p>Profile</p>
      </Layout>
    </div>
  );
}