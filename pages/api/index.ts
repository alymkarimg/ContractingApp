import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import { jobSchema } from '../../validations/jobSchema';
import formidable from 'formidable';
import Job from '../../models/Job';
import { formatJob } from '@/validations/helper';
import { parseForm } from '@/helper';

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
        const object = await parseForm(req);

        jobSchema().parse(formatJob(object));

        await Job.create(formatJob(object));
        res.status(200).json({ message: 'Job successfully uploaded' });
      } catch (e: unknown) {
        console.error(e);
        res.status(400).json({ message: (e as { message: string }).message });
      }
      break;
    case 'PUT':
      try {
        const object = await parseForm(req);

        jobSchema().parse(formatJob(object));

        await Job.updateOne(formatJob({ _id: object._id }));
        res.status(200).json({ message: 'Job successfully updated' });
      } catch (e: unknown) {
        console.error(e);
        res.status(400).json({ message: (e as { message: string }).message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST, PUT']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
