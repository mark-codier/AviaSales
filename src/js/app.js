import '../css/style.css';
import './plugins/index.js';
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from './views/currency';
import ticketUI from './views/ticket.js';

document.addEventListener('DOMContentLoaded',()=>{
    initApp()
    const form = formUI.form;
    form.addEventListener('submit',e=>{
        e.preventDefault();
        onFormSubmit()
    })
    async function initApp(){
       await locations.init()
       formUI.setAutoCompleteData(locations.shortList) 
    }
    async function onFormSubmit(){
        const origin = locations.getCityCodeByKey(formUI.originValue)
        const destination = locations.getCityCodeByKey(formUI.destinationValue)
        const depart_date = formUI.departureValue
        const return_date = formUI.arrivalValue
        const currency = currencyUI.currencyValue
        await locations.fetchTickets({
            origin,destination,depart_date,return_date,currency
        })

        ticketUI.renderTicket(locations.ticketResult);

        //code,code,yyyy-mm,yyyy-mm
    }
})

//get/prices/cheap/origin=MOW&destinatiion=ASB&depart_date=2024-05-04&...
