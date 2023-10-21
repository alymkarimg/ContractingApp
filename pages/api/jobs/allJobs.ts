import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';
import { parseForm } from '@/helper';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    // get all jobs that are not booked
    case 'GET':
      try {
        const jobs = await Job.find({ userId: undefined });
        res.status(200).json({ data: jobs });
      } catch (e) {
        res.status(400).json({});
      }

      break;
    // delete selected jobs
    case 'PUT':
      try {
        const object = await parseForm(req);

        const selectedRows = JSON.parse(object.selectedRows);

        await Job.deleteMany({ _id: selectedRows.map((q: { _id: string }) => q._id) });
        res.status(200).json({ message: `Job${selectedRows.length > 1 ? "'s" : ''} were successfully deleted.` });
      } catch (e) {
        res.status(400).json({
          message: `Job'(s) were not successfully deleted.`,
        });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT, GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
