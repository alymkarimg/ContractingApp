import { z } from 'zod';

export const jobSchema = () => {
  return z
    .object({
      title: z.string().min(3, { message: 'Expected a title with more than three characters' }),
      location: z.string().min(1, { message: 'Expected a location to be selected' }),
      address: z
        .string({
          errorMap: () => {
            return { message: 'Expected address to be a string' };
          },
        })
        .min(1, { message: 'Expected the address to be more than one letter' }),
      datetime__start: z.date({
        errorMap: () => {
          return { message: 'Expected a valid start date to be selected' };
        },
      }),
      datetime__end: z.date({
        errorMap: () => {
          return { message: 'Expected a valid end date to be selected' };
        },
      }),
      occupation: z.string().min(1, { message: 'Expected a value to be selected for occupation' }),
    })
    .refine(
      (schema) => {
        const t = new Date(schema.datetime__end.setSeconds(0, 0)) >= new Date(schema.datetime__start.setSeconds(0, 0));
        return t;
      },
      {
        message: 'Expected end date to be greater than or equal to the start date',
      }
    );
};
