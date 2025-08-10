/****Construire les nombres en jeu****/
const siphers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const authNumber = siphers.concat(siphers).concat([10, 25, 50, 75, 100]);

function compareRankedNumbers(a,b){
		return a.rnk-b.rnk;    
	}

export function randomInt(mini, maxi) {
	  return mini + Math.round((maxi-mini)*Math.random());
  }

/**Nombres parmi les 'plaques'****/  
export function rndNumbers(N) {
		var result = authNumber.map((x)=>{return {item: x, rnk: Math.random()}});
		return result.sort(compareRankedNumbers).slice(0,N).map((obj)=>obj.item);
	}

var nmax=6;
var liste_operateur = ['+','-','x','/'];
var compte = 0;
var detail = new Array(nmax);

//Fonctions
function setCompte(c)
	{
		compte=c;
	}

export function correction()
	{return detail.filter((x)=>x).reverse();}

export function lancer(cmp,liste){
   setCompte(cmp);
   return combine(liste,liste.length);
}

/*Retourne 1 si la liste peut donner le bon compte
Limite le calcul à n valeurs:critère d'arrêt si n<2*/
function combine(liste,n)
{detail = new Array(nmax);
   var liste2 = new Array(6);
   var resu = 0;
   var indoper = 0;
   var k1 = 0;
   var k2 = 0;
   var i;
   var oper = '+';
   for (k1=0;k1<=n-2;k1++)
   {
      for(k2=k1+1;k2<=n-1;k2++)   //toutes les paires blesipo
      {
         for(indoper=0;indoper<4;indoper++)  //les 4 op�rateurs
            {oper=liste_operateur[indoper];
            resu=calculer(liste[k1],liste[k2],oper);
            //detail[n-2]=(liste[k1]+oper+liste[k2]+"="+resu+"\n");
            if(resu==compte)
              {
              detail[n-2]=(liste[k1]+oper+liste[k2]+"="+resu+"\n");
              return 1;
              }
            if(resu>0)
              	{for(i=0;i<k2;i++)
                	liste2[i]=liste[i];  //fabriquer une nouvelle liste
              	for(i=k2;i<=n-1;i++)
                	liste2[i]=liste[i+1]; /*liste[k2] disparait*/
              	liste2[k1]=resu;    //remplacement de liste2[k1]

              	if ((n>=3)&&(resu<3000))
                	if (combine(liste2,n-1)) //il doit rester au moins deux nombres!
                     {
                      detail[n-2]=(liste[k1]+oper+liste[k2]+"="+resu+"\n");	
                      return 1;
                     }
                }/*resu*/
            }/*oper*/
      }/*k2*/
   }/*k1*/
   return 0;
   }

export function calculer(n1,n2,oper)
	 	{switch(oper)
	 		{case '+':return eval(n1)+eval(n2);
	 		 case '-':return n1-n2;
	 		 case 'x': case '*': return n1*n2;
	 		 case '/':return (n1%n2==0?n1/n2:-1);
 		 	}
 		}