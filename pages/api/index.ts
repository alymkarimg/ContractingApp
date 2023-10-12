import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Recipe from '../../models/Recipe';
import { jobSchema } from '../../validations/jobSchema';
import formidable from 'formidable';
import { z } from 'zod';

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

        const response = jobSchema().parse(object);

        const recipes = await Recipe.find({});
        res.status(200).json({ status: 'success', data: recipes });
      } catch (e: any) {
        console.error(e);
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
