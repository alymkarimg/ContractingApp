import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { ActionMeta, SingleValue } from 'react-select';

export interface ModelSelectProps {
  options: Option[];
  onChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  value: Option;
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
    label: 'Title (Ascending)',
    value: 'title_asc',
  },
  {
    label: 'Title (Descending)',
    value: 'title_descending',
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
    label: 'Title (Ascending)',
    value: 'title_asc',
  },
  {
    label: 'Title (Descending)',
    value: 'title_desc',
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
