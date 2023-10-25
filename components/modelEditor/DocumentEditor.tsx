import _ from 'lodash';
import { FaArrowLeft } from 'react-icons/fa';
import { DocumentResult } from './utils';
import { Dispatch, useRef, useState } from 'react';

interface Props {
  setSelectedDocument: Dispatch<React.SetStateAction<DocumentResult>>;
  selectedDocument: DocumentResult;
  prevStep: () => void;
  saveDocument: (document: string) => void;
}

const DocumentEditor = (props: Props) => {
  const { prevStep, selectedDocument, saveDocument } = props;
  const intialDocument = useRef(selectedDocument);
  const [selectedDocumentString, setSelectedDocumentString] = useState(JSON.stringify(selectedDocument, undefined, 4));

  const resetDocument = () => {
    setSelectedDocumentString(JSON.stringify(intialDocument.current, undefined, 4));
  };

  const onChange = (e: { target: { value: string } }) => {
    setSelectedDocumentString(e.target.value);
  };

  return (
    <div className="rounded-xl p-5 bg-secondary flex flex-col">
      <div className="flex flex-col text-tertiary">
        <div className="flex flex-row justify-end relative m-2">
          {/* Reset and save buttons */}
          <button
            onClick={resetDocument}
            className={`mr-2 flex items-center justify-center px-3 h-8 border-solid border-tertiary border-2 text-tertiary bg-primary hover:text-primary hover:bg-tertiary hover:text-secondary`}
          >
            Reset
          </button>
          <button
            onClick={() => saveDocument(selectedDocumentString)}
            className={`mr-3 flex items-center justify-center px-3 h-8 text-tertiary bg-quinary hover:text-primary hover:bg-tertiary hover:text-secondary`}
          >
            Save
          </button>
          <div className="ml-1 flex justify-center text-tertiary gap-1">
            <button color="bg-tertiary" onClick={prevStep}>
              <FaArrowLeft size={10} />
            </button>
          </div>
        </div>
        {/* JSON editor */}
        <pre>
          <textarea onChange={onChange} rows={20} className="text-septenary p-3 bg-primary w-full" value={selectedDocumentString} />
        </pre>
      </div>
    </div>
  );
};

export default DocumentEditor;
