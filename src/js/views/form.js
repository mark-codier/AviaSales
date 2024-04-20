import { getAutoCompleteInstance,getDatePickerInstance } from "../plugins/materialize";
class FormUI{
    constructor(autoCompleteInstance,datePickerInstance){
        //DOM
        this.origin = document.getElementById('autocomplete-Origin')
        this.destiny = document.getElementById('autocomplete-destination')
        this.departure = document.getElementById('datepicker-departure');
        this.arrival = document.getElementById('datepicker-arrival');
        //material instance
        this.originAutocomplete = autoCompleteInstance(this.origin);
        this.destinationAutoomplete = autoCompleteInstance(this.destiny);
    }
    getValueFromInputs(){
        return newObj = {
            origin: this.origin.value,
            destiny: this.destiny.value,
            departure: this.departure.value,
            arrival: this.arrival.value,
        }
    }
    setAutoCompleteData(data){
        this.originAutocomplete.updateData(data)
        this.destinationAutoomplete.updateData(data)
    }
}
const formUI = new FormUI(getAutoCompleteInstance,getDatePickerInstance);

export default formUI;