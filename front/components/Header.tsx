import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { FaRegPlusSquare } from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'

const titre = {
  fontSize: 35
};

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-primary">

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      < GiHamburgerMenu/> Les recettes de Martine
    </button>


    <div className="collapse navbar-collapse" id="collapsibleNavbar">

      <Link href="/">
        <a className="navbar-brand" style={titre}>Les recettes de Martine</a>
      </Link>

      <ul className="navbar-nav" id="center">
        <li className="nav-item active">
          <Link href="/add">
            <button className="btn btn-success"><FaRegPlusSquare size={30} /> Ajouter une recette </button>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link active" id="recherche"><GoSearch size={20} />  Rechercher</a>
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link href="/profile">
            <a className="nav-link active">Profil</a>
          </Link>
        </li>
      </ul>
    </div>

    <style jsx>{`
    #center {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center
    }
    #recherche {
      font-size: 20px;
      margin-left: 20px
    }
    `}</style>
  </nav>



);


export default Header;