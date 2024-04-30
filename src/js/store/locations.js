import api from "../services/apiService";

class Locations {
    constructor(api){
        this.api = api;
        this.countries = null;
        this.cities = null; 
        this.countries_code = null;
        this.airlines = null;
        this.ticketResult = {};
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
        this.cities = this.serializeCities(cities)
        this.shortList = this.createShortCutList(this.cities)
        console.log(this.airlines)
        // this.countries_code = this.getCountriesCodeObj(countries);
        // this.locationEntries = this.getLocationEntries(this.serializeCities(cities))
               return response;
    }

    serializeCities(cities){
        const objOfCities = cities.reduce((acc,city) => {
          for(let i=0;i<2;i++){
            if(i<1){
            const cityName = city.name || city.name_translations.en;
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
        this.ticketResult = response;
        console.log(this.ticketResult)
    }
}
const locations = new Locations(api);
export default locations;
//DZ
//N1
// 'countries-code': country
//N2
//method(){
//     return `${cities} ${countries}`
// }