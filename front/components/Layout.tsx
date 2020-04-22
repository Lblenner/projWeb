import Header from './Header';
import Footer from './Footer'
import {tailleFooter} from "./Footer"


const Layout = props => (
  <div id="container">
    <Header />
    <div id="mid">
    {props.children}
    </div>
    <Footer />

    <style jsx>{`
      #container {
        position: relative;
        min-height: 100vh;
        min-width: 900px; 
      }
      #mid {
        padding-bottom : ${tailleFooter}px;
      }
    `}</style>
  </div>
);

//La taille minimum de 900px est le taille minimal du header (sommes des différentes taillede texte)
//Si ajout d'un onglet au header => adapation de cette taille
export default Layout;