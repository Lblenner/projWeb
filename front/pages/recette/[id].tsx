
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'

const Recette = () => {
    const router = useRouter()
    const { id } = router.query
    console.log(router.query)

    return (
        <div>
            <Head>
                <title>Les recettes de Martine</title>
            </Head>
            <Layout>
                <div className="container">
                    {id}
                </div>
            </Layout>
        </div>
    )
}

export default Recette