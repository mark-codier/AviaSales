import api from "../services/apiService";

class Locations {
    constructor(api){
        this.api = api;
        this.countries = null;
        this.cities = null; 
        this.countries_code = null;
    }
    async init(){
        const response = await Promise.all([
            this.api.countries(),this.api.cities(),
        ])
        const [countries,cities] = response;
        this.countries = this.serializeCountries(countries)
        this.cities = this.serializeCities(cities)
        this.shortList = this.createShortCutList(this.cities)
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
    // getLocationEntries(cits){
    //     const cities = cits;
    //     const codes = this.countries_code;
    
    //     return cities;
    // }
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