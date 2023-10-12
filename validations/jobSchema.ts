import moment from 'moment';
import { z } from 'zod'

export const jobSchema = () => {
  return z.object({
    title: z.string().min(3, { message: 'Expected a title with more than three characters'}),
    location: z.string().min(1, { message: 'Expected a location to be selected'}),
    datetime: z.string().refine((data) => {  
      if (data === '') { return false }
      function isDate(dateStr: string) {
          return moment(dateStr, 'DD-MM-YYYY', true).isValid();
      }
      let dates = data.split( " - " );
      const startIsDate = isDate(dates[0])
      if(dates[1]){
        const endIsDate = isDate(dates[1])
        return startIsDate || endIsDate
      }
      return startIsDate
    }, {message: 'Expected a date or range to be selected'}),
    occupation: z.string().min(1, { message: 'Expected a value to be selected for occupation'}),
    description: z.string().min(10, { message: 'Expected a description with more than ten Characters'}),
  });
} 