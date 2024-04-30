class Currency{
    constructor(){
        this.currencySelector = document.getElementById('currency');
    }
    get currencyValue(){
        return this.currencySelector.value;
    }
}
const currencyUI = new Currency()
export default currencyUI;