import React from 'react'
import Router from 'next/router'

type MyProps = { type: "comment" | "note" | "favAdd" | "favRemove" | "addRecette", value }

type MyState = {};

export default class MinimalActivite extends React.Component<MyProps, MyState> {

  public static defaultProps = {
    content: "default"
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToRecette(id) {
    Router.push("/recette?id="+id)
  }
  
  comment(value) {
    return <div onClick={() => this.goToRecette(value.recetteId)}>
      {value.auteurFullname} (@{value.auteurUsername})  a commenté
  <h5 style={{ marginBottom: 5 }}><span id="nom">{value.recetteNom}</span></h5>
      <p style={{ marginLeft: 15, marginBottom: 5 }}>
        {value.texte}
    </p>
    <div style={{fontSize:10, textAlign: 'right'}}>{value.date.toLocaleTimeString()} {value.date.toLocaleDateString("fr-FR")}</div>
      <style jsx>{`
        #nom:hover {
          color: blue;
          cursor: pointer;
        }
      `}</style>
    </div>
  }

  fav(add) {
    if (add) {
      return (<div>
        Jean De la Rivière a ajouté à ses favoris
        <h5 id="nom" style={{ marginBottom: 5 }}>Tarte aux pommes à la creme</h5>
        <style jsx>{`
        #nom:hover {
          color: blue;
          cursor: pointer;
        }
      `}</style>
      </div>)
    }
    return (<div>
      Jean De la Rivière a retiré à ses favoris
      <h5 id="nom" style={{ marginBottom: 5 }}>Tarte aux pommes à la creme</h5>
      <style jsx>{`
        #nom:hover {
          color: blue;
          cursor: pointer;
        }
      `}</style>
    </div>)
  }

  note(value) {
    return (<div>
      Jean De la Rivière a donné une note de {value.note}  à
      <h5 id="nom" style={{ marginBottom: 5 }}>Tarte aux pommes à la creme</h5>
      <style jsx>{`
        #nom:hover {
          color: blue;
          cursor: pointer;
        }
      `}</style>
    </div>)

  }

  addRecette(value) {
    return (<div onClick={() => this.goToRecette(value.id)}>
      {value.auteurFullname} (@{value.auteurUsername}) a ajouté la recette
    <h5 style={{ marginBottom: 5 }}><span id="nom">{value.nom}</span></h5>
    <div style={{fontSize:10, textAlign: 'right'}}>{value.date.toLocaleTimeString()} {value.date.toLocaleDateString("fr-FR")}</div>
      <style jsx>{`
        #nom:hover {
          color: blue;
          cursor: pointer;
        }
      `}</style>
    </div>)
  }

  render() {
    let content

    switch (this.props.type) {
      case "comment":
        content = this.comment(this.props.value)
        break;
      case "note":
        content = this.note(this.props.value)
        break;
      case "favAdd":
        content = this.fav(true)
        break;
      case "favRemove":
        content = this.fav(false)
        break;
      case "addRecette":
        content = this.addRecette(this.props.value)
        break;
      default:
        content = "Erreur"
    }

    return (<div id="item" style={{ border: "solid", borderWidth: "1px 0px 0px 0px", padding: 4, borderColor: '#D3D3D3' }}>
      {content}

      <style jsx>{`
        #item:hover {
          background-color: #ffeaea;
          opacity: 0.7;
          cursor: pointer;
        }
      `}</style>
    </div>)
  }
}
