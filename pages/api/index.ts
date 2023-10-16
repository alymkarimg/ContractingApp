import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Recipe from '../../models/Job';
import { jobSchema } from '../../validations/jobSchema';
import formidable from 'formidable';
import Job from '../../models/Job';
import { formatJob } from '@/validations/helper';
import { IJobForm } from '@/interfaces/jobForm.interface';

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
        const fields: { key: string; value: string }[] = [];

        form.on('field', (fieldName, fieldValue) => {
          fields.push({ key: fieldName, value: fieldValue });
        });

        await form.parse(req);

        const object = fields.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});

        jobSchema().parse(formatJob(object as IJobForm));

        await Job.create(formatJob(object as IJobForm));
        res.status(200).json({ status: 'success', message: 'Job successfully uploaded' });
      } catch (e: unknown) {
        console.error(e);
        res.status(404).json({ message: (e as { message: string }).message });
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
