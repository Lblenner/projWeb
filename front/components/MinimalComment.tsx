import React from 'react'

type MyProps = { type: "comment" | "note" | "favAdd" | "favRemove" | "addRecette", avis }

type MyState = {};

export default class MinimalActivite extends React.Component<MyProps, MyState> {

  public static defaultProps = {
    avis: "default"
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  comment() {
    return <div >
      Jean De la Rivière a commenté
    <h5 id="nom" style={{ marginBottom: 5 }}>Tarte aux pommes à la creme</h5>
      <p style={{ marginLeft: 15, marginBottom: 5 }}>
        Pas terrible, j'ai pas aimé les pommes et surtout pas le plastique
    </p>
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

  note() {
    return (<div>
      Jean De la Rivière a donné une note de {this.props.avis.note}  à
      <h5 id="nom" style={{ marginBottom: 5 }}>Tarte aux pommes à la creme</h5>
      <style jsx>{`
        #nom:hover {
          color: blue;
          cursor: pointer;
        }
      `}</style>
    </div>)

  }

  addRecette() {
    return (<div>
      Jean De la Rivière a ajouté la recette
      <h5 id="nom" style={{ marginBottom: 5 }}>Tarte aux pommes à la creme</h5>
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
        content = this.comment()
        break;
      case "note":
        content = this.note()
        break;
      case "favAdd":
        content = this.fav(true)
        break;
      case "favRemove":
        content = this.fav(false)
        break;
      case "addRecette":
        content = this.addRecette()
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
