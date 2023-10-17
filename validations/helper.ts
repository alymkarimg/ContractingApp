import { IJobForm } from '@/interfaces/job.interface';

export const formatJob = (object: IJobForm) => {
  return {
    title: object.title,
    location: object.location,
    datetime__start: new Date(object.datetime__start as string),
    datetime__end: new Date(object.datetime__end as string),
    pay: object.pay * 100,
    occupation: object.occupation,
    description: object.description,
  };
};

export const formatZodErrors = (e: { message: string }[]) => {
  let str = '';
  e.forEach(function (error) {
    str += '<li>' + error.message + '</li>'; // build the list
  });

  return str;
};
