let nom = document.querySelector('input[id="name"]');
let valeur = document.querySelector('input[id="value"]');
let formulaire  = document.querySelector('form');
let bouttonAfficher = document.querySelector('.display-cookie-btn');
let liste = document.querySelector('ul[class="cookies-list"]')
let listeStatus = false;
let loc = JSON.parse(localStorage.getItem('loc'))
let tab = []
let done = false

let currentTab = null
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
        e.preventDefault()
        console.log(`valeur: ${valeur.value}`)
        console.log(`valeur: ${nom.value}`)
        let nm = nom.value;
        let val = valeur.value
        result = {nom: nm, valeur: val}
        enregTab(tab, result);
    }

    createList = (data)=>{
        let element = document.createElement('li');
        element.textContent = `nom: ${data.nom}    valeur: ${data.valeur}`;
        element.style.listStyle = 'none';
        liste.appendChild(element);
    }

    let stautusManager = ()=>{
        if(!listeStatus){
           listeStatus = true;
           liste.style.display = "block";
           if(!done){
           afficher();
           }
        }
        else{
           listeStatus = false
           liste.style.display = "none";
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


    formulaire.addEventListener("submit", enregistrer);
    bouttonAfficher.addEventListener('click', stautusManager)