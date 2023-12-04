export interface IJob {
  _id: string;
  __v: string;
  title: string;
  location: string;
  address: string;  
  userId?: string;
  datetime__start?: string;
  datetime__end?: string;
  pay: number;
  occupation: string;
  description?: string;
}
