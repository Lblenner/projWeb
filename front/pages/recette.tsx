
import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import FicheRecette from '../components/FicheRecette'

type MyProps = { nom: string, id: any };
type MyState = { nom: string };

class Recette extends React.Component<MyProps, MyState> {

    constructor(props) {
        super(props)
        this.state = {
            nom: this.props.nom
        }
    }

    static getInitialProps(ctx) {
        let nom = ctx.query.nom
        let id = ctx.query.id

        return { nom: nom, id: id }
    }

    changeNom(nom) {
        this.setState({ nom: nom })
    }

    render() {
        return (
            <div>
                <Head>
                    <title>{this.state.nom}</title>
                </Head>
                <Layout>
                    <FicheRecette id={this.props.id} changeNom={(n) => this.changeNom(n)} />
                </Layout>
            </div>
        )
    }
}



export default Recette