import formidable from 'formidable';
import { NextApiRequest } from 'next';

export const parseForm = async (req: NextApiRequest) => {
  const form = formidable();
  const fields: { key: string; value: string }[] = [];

  form.on('field', (fieldName, fieldValue) => {
    fields.push({ key: fieldName, value: fieldValue });
  });

  await form.parse(req);

  const object: { [x: string]: string } = fields.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});

  return object;
};
