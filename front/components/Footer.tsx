
export const tailleFooter = 80

const Header = () => (
  <div id="foot">
    
    <h6 id="pp">Informations du footer</h6>
    <p>Retour au source</p>
    <style jsx>{`
      #foot {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: ${tailleFooter}px; 
        border-top: 1px solid;
      }
      #pp {
        margin-top : 10px;
        text-align: center
      }
      p {
        text-align: center
      }
    `}</style>
  </div>
);


export default Header;