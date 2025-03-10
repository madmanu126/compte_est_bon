import React, {useState, useEffect} from 'react';
import {calculer} from './moteur.js';

/**Travail utilisateur***/
export function Compte(props){
    useEffect(()=>reset(), [props.game.compte]);
    /**Valeurs initiales***/
    let {game} = props;

    const [nmbCourant, setNmbCourant] = useState();
    //const [wNumbers, setWNumbers] = useState([...game.nmbers]);
    const [operator, setOperator] = useState();
    const [message, setMessage] = useState("A vous de jouer!");
    const [apprecie, setApprecie] = useState();

    const eappr={ok: "bien", ko:"mal"};

    function reset(restore){
        console.log("reset!");
        setNmbCourant();
        setOperator();
        if(restore) game.nmbers = game.initNmbers;
        setMessage("A vous de jouer!");
        setApprecie(eappr.ok);
    }
    function feedback(mess, appr){
        setMessage(mess);
        setApprecie(appr);
    }
    function operande(nb){
        if(!nmbCourant){
            setNmbCourant(nb);
            echange(nb);
            return;
        }else if(operator){
            echange(nb);
            let nouv = calculer(nmbCourant, nb, operator);  //Addition pour l'instant
            if(nouv==game.compte){
                setMessage("Gagné! le compte est bon!");
                setApprecie(eappr.ok);
                animer();
            }
            setNmbCourant(nouv);
        }else echange(nb, nmbCourant);
        setOperator(false);
    }
    function echange(nb, nouv){
        let nd = game.nmbers.indexOf(nb);
        if(nouv) {
            game.nmbers.splice(nd, 1, nouv);
            setNmbCourant(nb);
        }
        else game.nmbers.splice(nd, 1);
        game.nmbers = [...game.nmbers];
    }
    function animer(){
        const emess = document.querySelector(".apprecie");
        let frames=[{fontSize:"40px", top:"300px"}, {fontSize:"10px", top:"0"}];
	    emess.animate(frames,{duration:1500, iteration:1, fill:"forwards"});
    }
    return <div className='user_engine'>
        <span>{nmbCourant}</span>
        <span>{operator}</span>
        <div>
            {['+','-','*','/'].map(item=>
                <input type='button' value={item} onClick={()=>setOperator(item)}/>
            )}
        </div>
        <div>{game.nmbers.map(item=>
            <span className='nmber' onClick={()=>operande(item)}>{item}</span>
        )}</div>
        <div className='apprecie'>
            <span className={apprecie}>{message}</span>
        </div>
        <input type='button' value='Debut' onClick={()=>reset(true)}/>
    </div>
}


