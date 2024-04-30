import config from "../config/apiConfig";
import Axios from "axios";
//Methods:
//countries - array of countries
//cities - array of cities
//price - array of 
class Api {
    constructor(config){
        this.url = config.url;
    }
    async countries(){
            try{ const response = await Axios.get(`${this.url}/countries.json`);
                return(response.data.data)
            }
            catch(error){
            console.log(error);
             return Promise.reject(error)
            }
    }
    async cities(){
        try{ const response = await Axios.get(`${this.url}/cities.json`);
         console.log(response.data.data)
                return(response.data.data)
            }
            catch(error){
            console.log(error);
             return Promise.reject(error)
            }
    }
    async airlines(params){
            try{
            const response = await Axios.get(`${this.url}/airlines.json`);
                return(response.data)
            }
            catch(error){
            console.log(error);
             return Promise.reject(error)
            }
    }
    async prices(params){
            try{
            const response = await Axios.get(`https://aviasales-api.herokuapp.com/prices/cheap`,{params});
                return(response.data.data)
            }
            catch(error){
            console.log(error);
             return Promise.reject(error)
            }
    }
}
const api = new Api(config);
export default api;