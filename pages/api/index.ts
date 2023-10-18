import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import { jobSchema } from '../../validations/jobSchema';
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
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const job = await Job.findOne({ _id: id });
        res.status(200).json({ data: job });
      } catch (e) {
        res.status(400).json({});
      }

      break;
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

        await Job.updateOne({ _id: object._id }, formatJob(object));
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
