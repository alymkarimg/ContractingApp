export interface IJobForm {
  title: string;
  location: string;
  datetime__start?: string;
  datetime__end?: string;
  pay: number;
  occupation: string;
  description: string;
}

export interface IJob {
  _id: string;
  title: string;
  location: string;
  datetime__start?: string;
  datetime__end?: string;
  pay: number;
  occupation: string;
  description: string;
}
