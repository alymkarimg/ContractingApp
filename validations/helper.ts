export const formatJob = (object: { [x: string]: string }) => {
  return {
    title: object.title,
    location: object.location,
    address: object.address,
    lat: parseFloat(object.lat),
    lng: parseFloat(object.lng),
    datetime__start: new Date(object.datetime__start),
    datetime__end: new Date(object.datetime__end),
    pay: parseInt(object.pay) * 100,
    occupation: object.occupation.toLowerCase(),
    description: object.description,
  };
};

export const formatZodErrors = (e: { message: string }[]) => {
  let str = '';
  e.forEach(function (error) {
    if (error.message) str += '<li>' + error.message + '</li>'; // build the list
  });

  return str;
};
