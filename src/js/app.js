import '../css/style.css';
import './plugins/index.js';
import locations from "./store/locations";
import formUI from "./views/form";
document.addEventListener('DOMContentLoaded',()=>{
    initApp()
    async function initApp(){
       await locations.init()
       formUI.setAutoCompleteData(locations.shortList) 
    }
    locations.init().then(res=>{
        console.log(locations.cities)
    })
    
})
