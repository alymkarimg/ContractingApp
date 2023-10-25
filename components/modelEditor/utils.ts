import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface ModelDropdown {
  options: Option[];
  setState: React.Dispatch<React.SetStateAction<Option>>;
  id: string;
}

export interface ModelResult {
  [x: string]: string | number;
}

export interface DocumentResult {
  [x: string]: string | number;
}

export interface ModelDetailsSearchResults {
  predictions: [] | ModelResult[];
}

export interface DocumentDetailsSearchResults {
  predictions: [] | DocumentResult[];
}

export interface Option {
  label: string;
  value: string;
}

const getModelDetails = async (query: string) => {
  try {
    const response = await fetch(`../api/google/location-autocomplete?query=${query}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

const getDocumentDetails = async (query: string) => {
  try {
    const response = await fetch(`../api/google/location-autocomplete?query=${query}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const updateSearchModelDetails = async (
  query: string,
  setSearchResults: Dispatch<SetStateAction<ModelDetailsSearchResults>>,
  previousResults: MutableRefObject<ModelDetailsSearchResults>
) => {
  const results = await getModelDetails(query);

  if (results) {
    setSearchResults((prev) => {
      previousResults.current.predictions = prev?.predictions ?? results.predictions;
      return results;
    });
  }
};

export const updateSearchDocumentDetails = async (
  query: string,
  setSearchResults: Dispatch<SetStateAction<DocumentDetailsSearchResults>>,
  previousResults: MutableRefObject<ModelDetailsSearchResults>
) => {
  const results = await getDocumentDetails(query);

  if (results) {
    setSearchResults((prev) => {
      previousResults.current.predictions = prev?.predictions ?? results.predictions;
      return results;
    });
  }
};

export const findModels = (result: string, previousResults: MutableRefObject<ModelDetailsSearchResults>) => {
  const predictions = previousResults.current?.predictions.filter((q) => q.title === result);
  return { predictions };
};

export const findDocuments = (result: string, previousResults: MutableRefObject<ModelDetailsSearchResults>) => {
  const predictions = previousResults.current?.predictions.filter((q) => q.title === result);
  return { predictions };
};

export interface DocumentEditorProps {
  document: object;
  nextStep: () => void;
  prevStep: () => void;
}

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const prettyPrint = (value: string) => {
  // check if the jsonstring is valid, if it is, parse thr string, make it pretty then stringify it
  // if it is not, return the original invalid string
  const obj = isJson(value) ? JSON.stringify(JSON.parse(value), undefined, 4) : value;
  return obj;
};

export const Modeldata = [
  {
    title: 'AEntityX',
    _id: 1,
  },
  {
    title: 'BEntityY',
    _id: 2,
  },
  {
    title: 'CEntity',
    _id: 3,
  },
  {
    title: 'DEntity',
    _id: 4,
  },
  {
    title: 'EEntity',
    _id: 5,
  },
  {
    title: 'FEntity',
    _id: 6,
  },
  {
    title: 'GEntity',
    _id: 7,
  },
  {
    title: 'HEntity',
    _id: 8,
  },
];

export const Documentdata = [
  {
    title: 'Document 1',
    _id: 1,
  },
  {
    title: 'Document 2',
    _id: 2,
  },
  {
    title: 'Document 3',
    _id: 3,
  },
  {
    title: 'Document 4',
    _id: 4,
  },
  {
    title: 'Document 5',
    _id: 5,
  },
  {
    title: 'Document 6',
    _id: 6,
  },
  {
    title: 'Document 7',
    _id: 7,
  },
  {
    title: 'Document 8',
    _id: 8,
  },
];

export const sortModelOptions = [
  {
    label: 'Title',
    value: 'title',
  },
  {
    label: 'Time (Ascending)',
    value: 'time_asc',
  },
  {
    label: 'Time (Descending)',
    value: 'time_desc',
  },
];

export const sortDocumentOptions = [
  {
    label: 'Title',
    value: 'title',
  },
  {
    label: 'Time (Ascending)',
    value: 'time_asc',
  },
  {
    label: 'Time (Descending)',
    value: 'time_desc',
  },
];
