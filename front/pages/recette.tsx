
import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import FicheRecette from '../components/FicheRecette'
import {getRecette} from '../API/Api'

type MyProps = { recette };
type MyState = {  };

class Recette extends React.Component<MyProps, MyState> {

    static async getInitialProps(ctx) {
        let id = ctx.query.id
        let recette = null

        if (id != null) {
            let response = await getRecette(id)

            if (response.status > 400) {
                console.log("Erreur")
                return
            }

            recette = await response.json()
        }

        return { recette: recette }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>{this.props.recette.nom}</title>
                </Head>
                <Layout>
                    <FicheRecette recette={this.props.recette}/>
                </Layout>
            </div>
        )
    }
}



export default Recette