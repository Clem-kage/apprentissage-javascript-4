let nom = document.querySelector('input[id="name"]');
let valeur = document.querySelector('input[id="value"]');
let formulaire  = document.querySelector('form');
let liste = document.querySelector('ul[class="cookies-list"]')


let loc = JSON.parse(localStorage.getItem('loc'))
let tab = []
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

    let enregTab = (tab, res)=>{
      tab.push(res)
      localStorage.setItem('loc', JSON.stringify(tab))
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

    let afficher =()=>{
        console.log(tab);
    }

    formulaire.addEventListener("submit", enregistrer);