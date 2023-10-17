import { z } from 'zod';

export const jobSchema = () => {
  return z
    .object({
      title: z.string().min(3, { message: 'Expected a title with more than three characters' }),
      location: z.string().min(1, { message: 'Expected a location to be selected' }),
      address: z
        .string({
          errorMap: () => {
            return { message: 'Expected a address to be supplied, please select a location' };
          },
        })
        .min(1, { message: 'Expected an address to be supplied, please select a location' }),
      lat: z.number({
        errorMap: () => {
          return { message: 'Expected a latitude to be supplied, please select a location' };
        },
      }),
      lng: z.number({
        errorMap: () => {
          return { message: 'Expected a longitude to be supplied, please select a location' };
        },
      }),
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
