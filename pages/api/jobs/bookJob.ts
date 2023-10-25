import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  await dbConnect();

  switch (method) {
    // find job and update booking id
    case 'GET':
      try {
        await Job.findByIdAndUpdate(id, { userId: new ObjectId(session?.user.id) });
        res.status(200).json({ message: 'Job booked' });
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
