import React from 'react'

type MyProps = { commentaire: any };

export default class CommentaireItem extends React.Component<MyProps> {

  constructor(props) {
    super(props);
  }

  render() {

    const pourcentageProfil = 20;
    const espaceProfilCom = 10;

    /* {
    "id": 1,
    "recetteId": 1,
    "date": "2020-05-02T14:29:45.124986",
    "texte": "[object Object]",
    "auteurFullname": "Emilie Fiplin",
    "auteurUsername": "mimi"
  }
  */

    return (
       <div id='container'>
         <div id='profil'>
            <div id="fullname">{this.props.commentaire.auteurFullname}</div>
            <div id="username">(@{this.props.commentaire.auteurUsername})</div>
         </div>
         <div id='commentaire'>

         </div>
        <style jsx>{`

          #fullname {
            font-size: 19px;
          }

          #username {
            font-size: 14px;
          }

          #container {
            width: 100%;
            display: table;
            clear: both;
            margin-top: 25px;
          }

          #profil {
            border: 1px solid;
            border-radius: 10px;
            float: left;
            width: ${pourcentageProfil}%;
            margin-right: ${espaceProfilCom-1}px;
            padding: 10px;
            text-align : center;
          }

          #commentaire {
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
            margin-left: ${pourcentageProfil+1}%;
          }

        `}</style>
      </div >

    )
  }
}
