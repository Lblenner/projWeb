import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'

const titre = {
  fontSize: 20
};

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-dark navbar-custom">

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      < GiHamburgerMenu /> Les recettes de Martine
    </button>

    <div className="collapse navbar-collapse">

      <Link href="/">
        <a className="navbar-brand" style={titre}><img src={require('../images/logorogne.png')} id="img"/> Les recettes de Martine</a>
      </Link>

      <ul className="navbar-nav" id="center">
        <li className="nav-item active">
          <Link href="/add">
            <button className="btn btn-success" id="addAddress"><AiOutlinePlusSquare size={titre.fontSize*1.25} /> Ajouter une recette</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link active" id="recherche"><GoSearch size={titre.fontSize-3} />  Rechercher</a>
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto" id="right">
        <li className="nav-item">
          <Link href="/profil">
            <a className="nav-link active" id="button">Favoris</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/profil">
            <a className="nav-link active" id="button">Mes recettes</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/profil">
            <a className="nav-link active" id="button">Profil</a>
          </Link>
        </li>
      </ul>

    </div>

    <style jsx>{`
    #nav {
      background-color: red;
    }
    #img {
      width: ${titre.fontSize*2.5}px;
      height: auto;
    }
    #right {
      display: flex
    }
    #center {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center
    }
    #recherche {
      font-size: 20px;
      margin-left: 10px;
      white-space: nowrap;
    }
    #button {
      white-space: nowrap;
    }
    #addAddress {
      white-space: nowrap;
      height: ${titre.fontSize*2}px;
      align-items: center;
      justify-content: center;
      background-color: #FFCC7A;
      border-color: #FFCC7A;
    }
    .navbar-custom {
      background-color: #ed3232;
    }
    `}</style>
  </nav>

);


export default Header;