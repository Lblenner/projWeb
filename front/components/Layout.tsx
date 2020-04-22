import Header from './Header';
import Footer from './Footer'
import { tailleFooter } from "./Footer"
import { Paper } from '@material-ui/core';


const Layout = props => (
  <div id="container">
    <Header />
    <div id="mid">
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display:'flex',flexGrow: 1, flexBasis:0}}></div>
        <div id="content">
          {props.children}
        </div>
        <div style={{display:'flex',flexGrow: 1, flexBasis:0, justifyContent:'center'}}>
          <Paper style={{margin: 20, padding: 10, width: 200, height: 185}}>
            Pas de Balance ? <br/>
            Pas de Probleme ! <br/>
            Télécharge l'appli de Martine pour faire la cuisine avec des ecocups ! <br/>
            <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.cuisineapp&fbclid=IwAR1nwfw8lOv6CuBdsEnl2h1_lAYze5-UPx7IiSyjh7WSzrkZgXrrSl03DDA">Telecharger</a>
          </Paper>
        </div>
      </div>
    </div>
    <Footer />

    <style jsx>{`
      #container {
        position: relative;
        min-height: 100vh;
        min-width: 1240px; 
      }
      #mid {
        padding-bottom : ${tailleFooter}px;
      }
    `}</style>
  </div >
);

//La taille de 1200 px vient de la largeur max ici: Searchbar = 1000px + Paper = 100 px + margin= 50*2px
export default Layout;