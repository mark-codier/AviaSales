import {format} from 'date-fns'

export default function formatDate(date,str){
    const resultDate = format(new Date(date),str);
    return resultDate
}