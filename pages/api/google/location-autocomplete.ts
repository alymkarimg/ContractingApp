import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';

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
      // TODO:  change cors policy to be more restrictive account for preview, local and prod enviroments
      try {
        const query = req.query['query'] as string;
        const baseUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?`;

        const queryString = `input=${encodeURIComponent(query)}&components=country:gb&key=${process.env.GOOGLE_API_KEY}&limit=${encodeURIComponent(
          10
        )}`;

        const headers = new Headers();

        headers.append('Access-Control-Allow-Origin', '*');

        const response = await fetch(`${baseUrl}${queryString}`, {
          headers,
        });

        const googleApiJson = await response.json();

        return res.status(200).json(googleApiJson);
      } catch (e) {
        console.log(e);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
