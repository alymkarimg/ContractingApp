import moment from 'moment';
import { z } from 'zod'

function isDate(dateStr: string) {
  const t = moment(dateStr, 'dd-MM-yyyy hh:mm').isValid();
  return t
}

export const jobSchema = () => {
  return z.object({
    title: z.string().min(3, { message: 'Expected a title with more than three characters'}),
    location: z.string().min(1, { message: 'Expected a location to be selected'}),
    datetime__start: z.string().refine((data) => {  
      if (data === '') { return false }
      if( !isDate(data)) { return false}
      return true
    }, {message: 'Expected a valid start date to be selected'}),
    datetime__end: z.string().refine((data) => {  
      if (data === '') { return false }
      if( !isDate(data)) { return false}
      return true
    }, {message: 'Expected a valid end date to be selected'}),
    occupation: z.string().min(1, { message: 'Expected a value to be selected for occupation'}),
    description: z.string().min(10, { message: 'Expected a description with more than ten characters'}),
  }).refine(schema => {  
    const t =  moment(schema.datetime__end, 'dd-MM-yyyy hh:mm').isSameOrAfter(moment(schema.datetime__start, 'dd-MM-yyyy hh:mm')) ? true : false
  return t 
    },
    {
    message: 'Expected end date to be greater than or equal to the start date'
    });
} 