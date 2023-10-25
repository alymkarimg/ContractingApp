import React, { useState } from 'react';
import { DocumentDetailsSearchResults, Documentdata, ModelDetailsSearchResults, ModelResult, Modeldata, isJson } from './utils';
import DocumentDetails from './DocumentDetails';
import ModelDetails from './ModelDetails';
import DocumentEditor from './DocumentEditor';

const ModelEditor = () => {
  const [step, setStep] = useState<number>(1);
  const [modelDetailsSearchResults, setModelDetailsSearchResults] = useState<ModelDetailsSearchResults>({ predictions: Modeldata });
  const [modelDetailsQuery, setModelDetailsQuery] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelResult>({});
  const [documentDetailsSearchResults, setDocumentDetailsSearchResults] = useState<DocumentDetailsSearchResults>({ predictions: Documentdata });
  const [documentDetailsQuery, setDocumentDetailsQuery] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState({});

  // save document
  const saveDocument = (documentString: string) => {
    if (isJson(documentString)) {
      const document = JSON.parse(documentString);
      // save to db
      alert(`${document.title} has been saved`);
      setStep(1);
    }
    try {
      JSON.parse(documentString);
    } catch (e) {
      alert(e);
    }
  };

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="sm:container rounded">
      {step === 1 && (
        <ModelDetails
          query={modelDetailsQuery}
          setQuery={setModelDetailsQuery}
          modelDetailsSearchResults={modelDetailsSearchResults}
          setModelDetailsSearchResults={setModelDetailsSearchResults}
          nextStep={nextStep}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
      )}
      {step === 2 && (
        <DocumentDetails
          query={documentDetailsQuery}
          selectedModel={selectedModel}
          setQuery={setDocumentDetailsQuery}
          documentDetailsSearchResults={documentDetailsSearchResults}
          setDocumentDetailsSearchResults={setDocumentDetailsSearchResults}
          nextStep={nextStep}
          prevStep={prevStep}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
        />
      )}
      {step === 3 && (
        <DocumentEditor
          saveDocument={saveDocument}
          setSelectedDocument={setSelectedDocument}
          selectedDocument={selectedDocument}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default ModelEditor;
