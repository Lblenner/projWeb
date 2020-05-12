import React from 'react'
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { connect } from 'react-redux'

const titre = {
  fontSize: 20
};

type MyProps = any;
type MyState = { };

class Header extends React.Component<MyProps, MyState> {

  modulableMenu() {

    let token = this.props.token
    var custom = []

    if (token) {
      custom.push(<li className="nav-item" key="1">
        <Link href="/recettes">
          <a className="nav-link active" id="button">Mes recettes</a>
        </Link>
      </li>)
      custom.push(<li className="nav-item" key="2">
        <Link href="/profil">
          <a className="nav-link active" id="button">Profil</a>
        </Link>
      </li>)
    } else {
      custom.push(<li className="nav-item" key="1">
        <Link href="/register">
          <a className="nav-link active" id="button">S'inscrire</a>
        </Link>
      </li>)
      custom.push(<li className="nav-item" key="2">
        <Link href="/login">
          <a className="nav-link active" id="button">Se connecter</a>
        </Link>
      </li>)
    }

    return <ul className="navbar-nav ml-auto" id="right">
      <li className="nav-item">
        <Link href="/fav">
          <a className="nav-link active" id="button">Favoris</a>
        </Link>
      </li>
      {custom.map((elem) => elem)}
    </ul>
  }

  render() {
    return <nav className="navbar navbar-expand-md navbar-dark navbar-custom">

      <Link href="/">
        <a className="navbar-brand" style={titre}><img src={require('../images/logorogne.png')} id="img" /> Les recettes de Martine</a>
      </Link>

      <ul className="navbar-nav" id="center">
        <li className="nav-item active">
          <Link href="/add">
            <button className="btn btn-success" id="addAddress"><AiOutlinePlusSquare size={titre.fontSize * 1.25} /> Ajouter une recette</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link active" id="recherche"><GoSearch size={titre.fontSize - 3} />  Rechercher</a>
          </Link>
        </li>
      </ul>

      {this.modulableMenu()}


      <style jsx>{`
        #nav {
          background-color: red;
        }
        #img {
          width: ${titre.fontSize * 2.5}px;
          height: auto;
        }
        #right {
          display: flex;
          flex-shrink: 0;
          flex-direction: row;
        }
        #center {
          flex-shrink: 0;
          flex-direction: row;
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
          margin-left: 10px;
        }
        #addAddress {
          white-space: nowrap;
          height: ${titre.fontSize * 2}px;
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
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Header)