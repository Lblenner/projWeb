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
      }
      #mid {
        padding-bottom : ${tailleFooter}px;
      }
    `}</style>
  </div>
);

export default Layout;