
export default function gestionSautLigne (texte) {
    var texteFinal = [];

    if (texte != null) {
        var lignes = texte.split("\n")
        for (let i = 0; i < lignes.length; i++) {
            texteFinal.push(<div key={"Ligne"+i}> {lignes[i]} <br/> </div>);
        }
      }

      return texteFinal;
}