import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // job id
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    // find job and update booking id
    case 'GET':
      try {
        // Retrieve document
        const job = await Job.findOne({ _id: id });

        // Delete role field
        job.userId = undefined;

        // Save changes
        await job.save();

        res.status(200).json({ message: 'Booking deleted' });
      } catch (e) {
        res.status(400).json({});
      }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
