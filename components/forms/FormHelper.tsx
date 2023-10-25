// form stuff
export const filterTime = (time: string | number | Date) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};
