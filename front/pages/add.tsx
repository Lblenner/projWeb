import Layout from '../components/Layout';
import Head from 'next/head'
import TextArea from '../components/TextArea'
import AddForm from '../components/AddForm';
import { Snackbar } from '@material-ui/core';

export default function About() {

  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Layout>
        <div className="container">
          <AddForm/>
        </div>
      </Layout>
    </div>
  );
}