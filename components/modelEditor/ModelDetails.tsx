import React, { Dispatch, useState } from 'react';
import { ModelDetailsSearchResults, ModelResult, Option, sortModelOptions } from './utils';
import ModelPagination from './ModelPagination';
import ModelSelect from './ModelSelect';
import { FaArrowRight, FaDatabase, FaFilter, FaSearch } from 'react-icons/fa';
import _ from 'lodash';

interface Props {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  selectedModel: ModelResult;
  setSelectedModel: Dispatch<React.SetStateAction<ModelResult>>;
  modelDetailsSearchResults: ModelDetailsSearchResults;
  setModelDetailsSearchResults: Dispatch<React.SetStateAction<ModelDetailsSearchResults>>;
  nextStep: () => void;
}

const ModelDetails = (props: Props) => {
  const { nextStep, setQuery, query, modelDetailsSearchResults, selectedModel, setSelectedModel } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [sortState, setSortState] = useState<Option>({ label: '', value: '' });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentModelDetailsSearchResults = modelDetailsSearchResults.predictions.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-xl p-5 bg-secondary flex flex-col">
      <div className="flex flex-row relative text-tertiary">
        <FaSearch style={{ top: '32px' }} className="absolute left-3" width={20} height={20} />
        <input className="p-3 pl-12 pr-12 my-5 w-full bg-primary text-tertiary rounded-full" placeholder="Choose a Model..." />
        <FaFilter style={{ top: '35px' }} width={15} height={15} className="absolute right-8" />
        <div className="ml-3 flex justify-center text-tertiary">
          {!_.isEmpty(selectedModel) && (
            <button color="bg-tertiary" onClick={nextStep}>
              <FaArrowRight size={10} />
            </button>
          )}
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <td className="px-3 flex place-items-center bg-primary text-septenary">
              <FaFilter width={10} height={10} />
              <p className="text-xs text-tertiary p-2 pr-3">Filter</p>
              <input
                className="p-1 pl-3 text-xs my-3 w-full bg-quaternary text-tertiary rounded-full"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Eg. latest updated..."
              />
              <ModelSelect id={'dd_modelSort'} state={sortState} setState={setSortState} options={sortModelOptions} />
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
              <tr className={`${selectedModel._id === item._id ? 'bg-senary' : ''} bg-primary text-tertiary`} key={index}>
                <td className="px-6 py-4">
                  <button
                    className="w-full block text-justify flex flew-row"
                    onClick={() => {
                      setSelectedModel(item);
                      nextStep();
                    }}
                  >
                    <FaDatabase width={10} height={10} className="mx-2" />
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
        totalPosts={modelDetailsSearchResults.predictions.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ModelDetails;
