import { getAutoCompleteInstance,getDatePickerInstance } from "../plugins/materialize";
class FormUI{
    constructor(autoCompleteInstance,datePickerInstance){
        //DOM]
        this.$form = document.forms["aviasales"]
        this.origin = document.getElementById('autocomplete-Origin')
        this.destiny = document.getElementById('autocomplete-destination')
        this.departure = document.getElementById('datepicker-departure');
        this.arrival = document.getElementById('datepicker-arrival');
        //material instance
        this.originAutocomplete = autoCompleteInstance(this.origin);
        this.destinationAutoomplete = autoCompleteInstance(this.destiny);
    }
    get originValue(){
        return this.origin.value
    }
    get destinationValue(){
        return this.destiny.value
    }
    get departureValue(){
        return this.departure.value
    }
    get arrivalValue(){
        return this.arrival.value
    }
    get form(){
        return this.$form;
    }
    setAutoCompleteData(data){
        this.originAutocomplete.updateData(data)
        this.destinationAutoomplete.updateData(data)
    }
}
const formUI = new FormUI(getAutoCompleteInstance,getDatePickerInstance);

export default formUI;