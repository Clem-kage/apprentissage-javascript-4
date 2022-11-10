let nom = document.querySelector('input[id="name"]');
let valeur = document.querySelector('input[id="value"]');
let formulaire  = document.querySelector('form');
let bouttonAfficher = document.querySelector('.display-cookie-btn');
let liste = document.querySelector('ul[class="cookies-list"]')
//-------------- (listeStatus: afficher la liste ou non)
let listeStatus = false;
let loc = JSON.parse(localStorage.getItem('loc'))
let tab = []
//-----------(done: précise si on peut recharger l'affichage(mise à jour de tab))
let done = false
//-----------------(modifPossible: précise si on peut créer ou modifier un local)
let modifPossible = false

// let currentTab = null
function init() {
    if(!loc){
        tab = localStorage.setItem('loc', JSON.stringify(tab));
    }
    else{
        tab =  JSON.parse(localStorage.getItem('loc'))
    }
}

init()
  
let suppLastList = ()=>{
    while (liste.hasChildNodes()) {
        liste.removeChild(liste.firstChild);
      }
}

    let enregTab = (tab, res)=>{
      tab.push(res)
      localStorage.setItem('loc', JSON.stringify(tab))
      //------------------------------
      done = false
      suppLastList()
    }

    let enregistrer = (e)=>{
        if(!modifPossible){
        e.preventDefault()
        console.log(`valeur: ${valeur.value}`)
        console.log(`valeur: ${nom.value}`)
        let nm = nom.value;
        let val = valeur.value
        result = {nom: nm, valeur: val}
        enregTab(tab, result);
        }
        else{
            console.log('nop')
        }
    }
   

    createList = (data)=>{
        let element = document.createElement('li');
        element.textContent = `nom: ${data.nom}    valeur: ${data.valeur}`;
        element.style.listStyle = 'none';
        liste.appendChild(element);

        let supp = document.createElement('button');
        supp.textContent = "X";
        supp.classList.add('croix')
        supp.setAttribute('id', data.nom);
        element.appendChild(supp)
        supp.addEventListener('click', ()=>{
            let resultat = tab.filter((obj)=> {
                if(obj.nom === supp.id){
                    console.log(obj.nom, supp.id)
                    return false
               }
               else{
                   return true
               }
        })
            element.remove()
            localStorage.setItem('loc', JSON.stringify(resultat));
            console.log(resultat)
        });

        let modif = document.createElement('button');
        modif.textContent = "M";
        modif.classList.add('modif')
        modif.setAttribute('id', data.valeur);
        element.appendChild(modif)
        modif.addEventListener('click', ()=>{
            let res = tab.find((obj)  => obj.valeur === modif.id )
            modifPossible = true
            console.log(modifPossible)
            formulaire.addEventListener("submit",()=>{
                if(modifPossible){
                    res.nom = nom.value,
                    res.valeur = valeur.value
                    const index = tab.indexOf(res);
                    console.log(index)
                    console.log(res)
                    tab.splice(index, 1, res);
                    console.log(tab)
                    localStorage.setItem('loc', JSON.stringify(tab));
                }
            }
            )
            console.log(res)  
          }
        );

       

    }

    let stautusManager = ()=>{
        if(!listeStatus){
           listeStatus = true;
           liste.style.display = "flex";
           console.log(listeStatus)
           if(!done){
           afficher();
           }
        }
        else{
           listeStatus = false
           liste.style.display = "none";
           console.log(listeStatus)
        }
    }

    let afficher =()=>{
            console.log('afficher')
            console.log(liste);
            tab.forEach(el => {
                createList(el)
            });
            done = true
    }

       //TODO -nom unique  === id unique
       //     -préciser le process de l'app
       //     -factoriser la fonction createList()

     
    formulaire.addEventListener("submit", enregistrer);
    bouttonAfficher.addEventListener('click', stautusManager)
    