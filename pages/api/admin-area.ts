import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import formidable from 'formidable';
import Job from '../../models/Job';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const jobs = await Job.find({});
        res.status(200).json({ data: jobs });
      } catch (e) {
        res.status(404).json({});
      }

      break;
    case 'DELETE':
      try {
        const form = formidable();

        const [fields] = await form.parse(req);

        const selectedRowsJson = fields['selectedRows'];

        const selectedRows = JSON.parse(selectedRowsJson as never);

        await Job.deleteMany({ _id: selectedRows.map((q: { _id: string }) => q._id) });
        res.status(200).json({});
      } catch (e) {
        res.status(404).json({
          message: 'Job successfully deleted.',
        });
      }
      break;
    default:
      res.setHeader('Allow', ['DELETE, GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
