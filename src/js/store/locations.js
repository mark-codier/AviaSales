import api from "../services/apiService";
import formatDate from "../../helpers/date";
import currencyUI from "../views/currency";
class Locations {
    constructor(api,helpers){
        this.api = api;
        this.countries = null;
        this.cities = null; 
        this.countries_code = null;
        this.airlines = null;
        this.ticketResult = {};
        this.formatDate = helpers.formatDate
    }
    async init(){
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines()
            // this.api.prices  
        ])
        const [countries,cities,airlines] = response;
        this.airlines = this.serializeAirlines(airlines)
        this.countries = this.serializeCountries(countries)
        this.cities_code = this.serializeCitiesCode(cities)
        this.cities = this.serializeCities(cities)
        this.shortList = this.createShortCutList(this.cities)
        console.log(this.cities_code)
               return response;
    }
    serializeCitiesCode(cities){
        return cities.reduce((acc,city)=>{
            acc[city.code] = city;
            return acc;
        },{}) 
    }
    serializeCities(cities){
        const objOfCities = cities.reduce((acc,city) => {
          for(let i=0;i<2;i++){
            if(i<1){
            const cityName = city.name;
            const countryName = this.getCountryByCode(city.country_code,0)
            acc[`${cityName}, ${countryName}`] = city   
            }else if(i>0){
            const cityName = city.name_translations.en;
            const countryName = this.getCountryByCode(city.country_code,1);
            acc[`${cityName}, ${countryName}`] = city 
            }}
             return acc;
        },{})
        return objOfCities;
    }
    serializeCountries(countries){
        const objOfCountries = countries.reduce((acc,country) => {
            acc[country.code] = country;
            return acc;
        },{});
        return objOfCountries;
    }
    serializeAirlines(airlines){
        const objOfAirlines = airlines.reduce((acc,airline) => {
            airline.logo_url = this.getAirlineLogoByCode(airline.code); 
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        },{});
        return objOfAirlines;
    }
    getCountryByCode(code,x){
        if(x<1){
            return this.countries[code].name;
        }else if(x>0){
            return this.countries[code].name_translations.en;
        }
    }
    createShortCutList(cities){
        return Object.entries(cities).reduce((acc,[key,value])=>{
            acc[key] = null;
            return acc;
        },{})
    }
    getCityNameByCode(code){
        return this.cities_code[code].name || this.cities_code[code].name_translations.en
    }
    getAirlineNameByCode(key){
        return this.airlines[key].name || this.airlines[key].name_translations.en
    }
    getAirlineLogoByCode(key){
        return `https://pics.avs.io/200/200/${key}.png`
    }
    getCityCodeByKey(key){
        return this.cities[key].code
    }
    async fetchTickets(param){
        const response = await this.api.prices(param);
        this.ticketResult = this.serializeTickets(response);
        console.log(this.ticketResult)
    }
    serializeTickets(response){
        const stringForDate = 'dd MMM yyyy hh:mm' 
        return Object.values(response).reduce((acc, ticket)=>{
            ticket.logo = this.getAirlineLogoByCode(ticket.airline)
            ticket.airlineName = this.getAirlineNameByCode(ticket.airline)
            ticket.origin_name = this.getCityNameByCode(ticket.origin)
            ticket.destination_name = this.getCityNameByCode(ticket.destination)
            ticket.departureTime = this.formatDate(ticket.departure_at,stringForDate)
            ticket.returnTime = this.formatDate(ticket.return_at,stringForDate)
            ticket.currency = currencyUI.currencyValue
            acc.push(ticket)
            return acc;
        }, [])
    }
}
const locations = new Locations(api,{formatDate});
export default locations;
