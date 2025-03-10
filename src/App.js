import logo from './logo.svg';
import './App.css';

import {useState} from 'react';

import {Compte} from './business/Compte';

import {lancer, correction, randomInt, rndNumbers} from './business/moteur';

function App() {
    const [compte, setCompte] = useState();
    //const [nmbers, setNmbers] = useState([]);
    const [donne_correction, setDonne_correction] = useState(false);
    const [game] = useState({nmbers: [], compte:0});
    
function tirageAleatoire(){
      let compte = (randomInt(100,900));
      game.compte = compte;
      setCompte(compte);
      setDonne_correction(false);
      game.nmbers = rndNumbers(6);
      game.initNmbers = [...game.nmbers];
  }

function chercher(){
      // setDonne_correction(["Désolé, en CC"]);
      const compte_est_bon = lancer(compte, game.initNmbers);
      const mess = compte_est_bon?"Le compte est bon!": "Compte impossible!";
      if(compte_est_bon)
          setDonne_correction([mess].concat(correction()));
      else setDonne_correction([mess]);
  }
  
  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>
                Le compte est bon ... ou pas
            </h2>
        </header>
        <p className='compte'>
            {compte}
        </p>
        <Compte game={game}/>
        <div>{donne_correction? 
            <div>{donne_correction.map((line)=><p>{line}</p>)}</div>
            :<span><i>Non corrigé</i></span>}
        </div>
        <div id='footer'>
            <input type='button' value='Tirage' onClick={()=>tirageAleatoire()}/>
            <input type='button' value='Chercher' onClick={()=>chercher()}/>
        </div>
    </div>
  );
}

export default App;
