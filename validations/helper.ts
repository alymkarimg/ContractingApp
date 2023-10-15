export const formatJob = (object: any) => {
    return {
      title: object.title,
      latitude: Number.parseInt(object.latitude),
      longitude: Number.parseInt(object.longitude),
      datetime__start: new Date(object.datetime__start),
      datetime__end: new Date(object.datetime__end),
      pay: object.pay * 100,
      occupation: object.occupation,
      description: object.description,
    }
  }

export const formatZodErrors = (e: any) => {
    let str = '';
    e.forEach(function (error: any) {
      str += '<li>' + error.message + '</li>'; // build the list
    });

    return str;
}