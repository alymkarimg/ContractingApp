export interface IJobForm {
  title: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  datetime__start?: string;
  datetime__end?: string;
  pay: number;
  occupation: string;
  description: string;
}

export interface IJob {
  _id: string;
  __v: string;
  title: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  datetime__start?: string;
  datetime__end?: string;
  pay: number;
  occupation: string;
  description: string;
}
