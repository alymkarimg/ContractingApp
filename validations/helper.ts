export const formatJob = (object: {
  title: string;
  location: string;
  datetime__start: string;
  datetime__end: string;
  pay: number;
  occupation: string;
  description: string;
}) => {
  return {
    title: object.title,
    location: object.location,
    datetime__start: new Date(object.datetime__start),
    datetime__end: new Date(object.datetime__end),
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
