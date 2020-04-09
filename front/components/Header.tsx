import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { FaRegPlusSquare } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

const titre = {
  fontSize: 30
};

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-primary">

    {/*<a className="navbar-brand" href="#">
        <img src={require('./Logo.jpg')} alt="" width="50px" height="50px">
        </img>
</a>*/}

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      < GiHamburgerMenu /> Les recettes de Martine
    </button>


    <div className="collapse navbar-collapse" id="collapsibleNavbar">

      <Link href="/">
        <a className="navbar-brand" style={titre}>Les recettes de Martine</a>
      </Link>

      <ul className="navbar-nav" id="center">
        <li className="nav-item active">
          <Link href="/add">
            <button className="btn btn-success" id="button"><FaRegPlusSquare size={30} /> Ajouter une recette</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link active" id="recherche"><GoSearch size={20} />  Rechercher</a>
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
    `}</style>
  </nav>



);


export default Header;