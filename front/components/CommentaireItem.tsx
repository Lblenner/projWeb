import React from 'react'
import gestionSautLigne from '../src/gestionFormatText';
import Avatar from '@material-ui/core/Avatar';

type MyProps = { commentaire: any , token };

export default class CommentaireItem extends React.Component<MyProps> {

  constructor(props) {
    super(props);
  }

  render() {

    const pourcentageProfil = 20;
    const espaceProfilCom = 10;

    var date = this.props.commentaire.date
    var commentaire = gestionSautLigne(this.props.commentaire.texte)

    var ensembleNom = this.props.commentaire.auteurFullname.split(" ");
    var initiales = ensembleNom[0].slice(0,1).toUpperCase() ;
    if (ensembleNom.length >= 2) {
      initiales =  initiales + ensembleNom[1].slice(0,1).toUpperCase();
    }

    return (
       <div id='container'>
         <div id='profil'>
            <Avatar id="avatar" style={{alignSelf: 'center'}}>{initiales}</Avatar>
            <a href={"/profil?username="+this.props.commentaire.auteurUsername}>
              <div id="fullname">{this.props.commentaire.auteurFullname}</div>
              <div id="username">(@{this.props.commentaire.auteurUsername})</div>
            </a>
         </div>
         <div id='commentaire'>
            {commentaire}
            <br/>
            <div id="dateEtheure">
              {date.slice(11,16) + " " + date.slice(8,10) + "/" + date.slice(5,7) + "/" + date.slice(0,4)}
            <div/>
         </div>
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
            display: flex;
            flex-direction:column;
            float: left;
            width: ${pourcentageProfil}%;
            margin-right: ${espaceProfilCom-1}px;
            padding: 10px;
            text-align : center;
          }

          #avatar {
            text-align : center;
            justify-content: center;
          }

          #commentaire {
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
            margin-left: ${pourcentageProfil+1}%;
          }

          #dateEtheure {
            text-align: right;
            font-size: 10px;
          }

        `}</style>
      </div >

    )
  }
}
