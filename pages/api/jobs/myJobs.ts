import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';
import { parseForm } from '@/helper';
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
  const session = await getServerSession(req, res, authOptions);

  await dbConnect();

  switch (method) {
    // get all jobs or jobs for user
    case 'GET':
      try {
        const jobs = await Job.find({ userId: new ObjectId(session?.user.id) });
        res.status(200).json({ data: jobs });
      } catch (e) {
        res.status(400).json({});
      }

      break;
    default:
      res.setHeader('Allow', ['PUT, GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
