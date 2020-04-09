import Layout from '../components/Layout';
import Head from 'next/head'
import TextArea from '../components/TextArea'
import AddForm from '../components/AddForm';

export default function About() {

  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <div className="container">
          <AddForm/>
        </div>
      </Layout>
    </div>
  );
}