import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Recipe from '../../models/Job';
import { jobSchema } from '../../validations/jobSchema';
import formidable from 'formidable';
import Job from '../../models/Job';

const formatJob = (object: any) => {
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const form = formidable();
        let fields = [] as any;

        form.on('field', (fieldName, fieldValue) => {
          fields.push({ key: fieldName, value: fieldValue });
        });

        await form.parse(req);

        var object = fields.reduce((obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }), {});

        jobSchema().parse(formatJob(object));

        await Job.create(formatJob(object));
        res.status(200).json({ status: 'success', message: 'Job successfully uploaded' });
      } catch (e: any) {
        console.error(e)
        let str = '';
        e.errors.forEach(function (error: any) {
          str += '<li>' + error.message + '</li>'; // build the list
        });
        res.status(404).json({
          status: 'error',
          message: str,
        });
      }
      break;
    case 'GET':
      try {
        const recipes = await Recipe.find({});
        res.status(200).json({ status: 'success', data: recipes });
      } catch (e) {
        res.status(404).json({
          status: 'error',
          message: 'Recipe search could not be performed.',
        });
      }
      break;
    default:
      res.setHeader('Allow', ['POST, GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
