import _ from 'lodash';
import { FaArrowLeft } from 'react-icons/fa';
import { DocumentResult, prettyPrint } from './utils';
import { Dispatch, useRef, useState } from 'react';

interface Props {
  setSelectedDocument: Dispatch<React.SetStateAction<DocumentResult>>;
  selectedDocument: DocumentResult;
  prevStep: () => void;
  saveDocument: (document: string) => void;
}

const DocumentEditor = (props: Props) => {
  const { prevStep, selectedDocument, setSelectedDocument, saveDocument } = props;
  const intialDocument = useRef(selectedDocument);
  const [selectedDocumentString, setSelectedDocumentString] = useState(JSON.stringify(selectedDocument));

  const resetDocument = () => {
    setSelectedDocumentString(JSON.stringify(intialDocument.current));
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
        <textarea onChange={onChange} rows={20} className="text-septenary bg-primary" value={prettyPrint(selectedDocumentString)}></textarea>
      </div>
    </div>
  );
};

export default DocumentEditor;
