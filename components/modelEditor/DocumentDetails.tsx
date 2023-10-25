import React, { Dispatch, useState } from 'react';
import { DocumentDetailsSearchResults, DocumentResult, ModelResult, Option, sortDocumentOptions } from './utils';
import ModelPagination from './ModelPagination';
import ModalSelect from './ModelSelect';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import _ from 'lodash';

interface Props {
  query: string;
  selectedModel: ModelResult;
  setQuery: Dispatch<React.SetStateAction<string>>;
  selectedDocument: DocumentResult;
  setSelectedDocument: Dispatch<React.SetStateAction<DocumentResult>>;
  documentDetailsSearchResults: DocumentDetailsSearchResults;
  setDocumentDetailsSearchResults: Dispatch<React.SetStateAction<DocumentDetailsSearchResults>>;
  nextStep: () => void;
  prevStep: () => void;
}

const DocumentDetails = (props: Props) => {
  const { nextStep, prevStep, setQuery, query, documentDetailsSearchResults, selectedDocument, setSelectedDocument, selectedModel } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [, setSortState] = useState<Option>({ label: '', value: '' });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentModelDetailsSearchResults = documentDetailsSearchResults.predictions.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-xl p-5 bg-secondary flex flex-col">
      <div className="w-full relative flex flex-row ">
        <Image style={{ top: '13px' }} className="absolute left-3" width={20} height={20} src="/Database.svg" alt="Follow us on Twitter" />
        <input disabled className="p-3 pl-12 pr-12 w-full bg-primary text-tertiary rounded-full" placeholder={`${selectedModel.title}`} />
        <Image style={{ top: '13px' }} width={15} height={15} src="/filter.svg" alt="Vercel Logo" className="absolute right-12" />
        <div className="ml-3 flex justify-center text-tertiary gap-1">
          <button color="bg-tertiary" onClick={prevStep}>
            <FaArrowLeft size={10} />
          </button>
          {!_.isEmpty(selectedDocument) && (
            <button color="bg-tertiary" onClick={nextStep}>
              <FaArrowRight size={10} />
            </button>
          )}
        </div>
        ;
      </div>
      <div className="relative">
        <Image style={{ top: '32px' }} className="absolute left-3" width={20} height={20} src="/Search.svg" alt="Follow us on Twitter" />
        <input
          defaultValue={query}
          className="p-3 pl-12 pr-12 my-5 w-full bg-primary text-tertiary rounded-full"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Choose a Document..."
        />
        <Image style={{ top: '35px' }} width={15} height={15} src="/filter.svg" alt="Vercel Logo" className="absolute right-12" />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <td className="px-3 flex place-items-center bg-primary">
              <Image width={10} height={10} src="/filter.svg" alt="Vercel Logo" className="logo" />;
              <p className="text-xs text-tertiary p-2 pr-3">Filter</p>
              <input
                className="p-1 pl-3 text-xs my-3 w-full bg-quaternary text-tertiary rounded-full"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Eg. latest updated..."
              />
              <ModalSelect id={'dd_modelSort'} setState={setSortState} options={sortDocumentOptions} />
              <div className="flex flex-col"></div>
            </td>
          </tr>
        </thead>

        <tbody>
          {currentModelDetailsSearchResults
            .filter((item) => {
              const formattedQuery = query.toLowerCase();
              if (formattedQuery === '') return item;
              return (item.title as string).toLowerCase().includes(formattedQuery);
            })
            .map((item, index) => (
              <tr className={`${selectedDocument._id === item._id ? 'bg-senary' : ''} bg-primary text-tertiary`} key={index}>
                <td className="px-6 py-4">
                  <button
                    className="w-full h-full text-justify"
                    onClick={() => {
                      setSelectedDocument(item);
                      nextStep();
                    }}
                  >
                    {item.title}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModelPagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={documentDetailsSearchResults.predictions.length}
        paginate={paginate}
      />
    </div>
  );
};

export default DocumentDetails;
