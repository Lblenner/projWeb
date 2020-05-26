import Layout from '../components/Layout';
import Head from 'next/head'
import LoginForm from '../components/LoginForm';
import Router from 'next/router'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRouter } from 'next/router' 


function whereToGo() {
  Router.push('/profil')
}

export default function Login() {


  const router = useRouter()
  console.log(router.query);  

  return (
    <div>
      <Head>
        <title>Les recettes de Martine</title>
      </Head>
      <Layout>
        <div className="container-fluid">
          {router.query.msg == "1" && <Alert style={{ marginBottom: 10, marginTop: 10 }} severity="info">
            Vous devez vous connecter pour ajouter une recette.
          </Alert>}
          <LoginForm whereToGo={whereToGo} />
        </div>
      </Layout>
    </div>
  );
}