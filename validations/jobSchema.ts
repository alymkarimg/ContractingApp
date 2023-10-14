import moment from 'moment';
import { z } from 'zod'

function isDate(dateStr: string) {
  const t = moment(dateStr, 'dd-MM-yyyy hh:mm').isValid();
  return t
}

export const jobSchema = () => {
  return z.object({
    title: z.string().min(3, { message: 'Expected a title with more than three characters'}),
    latitude: z.number({errorMap: () => {return { message: 'Expected a latitude to be sent, please select a location'}
    }}),
    longitude: z.number({errorMap: () => {return { message: 'Expected a longitude to be sent, please select a location'}
    }}),
    datetime__start: z.date({errorMap: () => {return { message: 'Expected a valid start date to be selected'}
    }}),
    datetime__end: z.date({errorMap: () => {return { message: 'Expected a valid end date to be selected'}
    }}),
    occupation: z.string().min(1, { message: 'Expected a value to be selected for occupation'}),
    }).refine(schema => {  
    const t =  new Date(schema.datetime__end) >= new Date(schema.datetime__start)
      return t 
    },
    {
    message: 'Expected end date to be greater than or equal to the start date'
    });
} 