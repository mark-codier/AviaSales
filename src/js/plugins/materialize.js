import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
const select = document.querySelectorAll('select');
M.FormSelect.init(select,{
})
const autocompletes = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocompletes, {
    data:{
        "Apple": null,
       },
});
export function getAutoCompleteInstance(elem){
    return M.Autocomplete.getInstance(elem)
}
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers,{autoClose: true,showClearBtn:true,format:'yyyy-mm',});
export function getDatePickerInstance(elem){
    return M.Datepicker.getInstance(elem)
}
//N1
//ВБИВАТЬ НА АНГЛИЙСКОМ
//N2
//ДОСТАЮ ВАЛЮ ИЗ ИНПУТОВ И ВВОЖУ В КОНСОЛЬ