import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { jobSchema } from '../../../validations/jobSchema';
import Job from '../../../models/Job';
import { formatJob } from '@/validations/helper';
import { parseForm } from '@/helper';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    // find job
    case 'GET':
      try {
        const job = await Job.findOne({ _id: id });
        res.status(200).json({ data: job });
      } catch (e) {
        res.status(400).json({});
      }

      break;
    // create one job
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
    // update one job = all fields
    case 'PUT':
      try {
        const object = await parseForm(req);

        jobSchema().parse(formatJob(object));

        await Job.findByIdAndUpdate(id, formatJob(object));
        res.status(200).json({ message: 'Job successfully updated' });
      } catch (e: unknown) {
        console.error(e);
        res.status(400).json({ message: (e as { message: string }).message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET, POST, PUT']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
