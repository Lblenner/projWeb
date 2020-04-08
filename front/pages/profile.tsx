import Layout from '../components/Layout';
import Head from 'next/head'
import Link from 'next/link'


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