import { useEffect, useRef, useState } from 'react';
import ReactSearchBox from 'alymkarimg-react-search-box';

interface Result {
  place_id: string;
  description: string;
}

interface SearchResults {
  predictions: Result[];
}

export const LocationSearchBox = (props: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  locationQuery: string;
  setLocationQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { locationQuery, setLocationQuery, setLocation } = props;

  const [searchResults, setSearchResults] = useState<SearchResults>();

  useEffect(() => {
    const updateSearch = async () => {
      const getNearbyPlaces = async (query: string) => {
        try {
          const response = await fetch(`../api/google/location-autocomplete?query=${query}`);
          return await response.json();
        } catch (e) {
          console.log(e);
        }
      };

      const results = await getNearbyPlaces(locationQuery);

      if (results) {
        setSearchResults((prev) => {
          previousResults.current = prev?.predictions ?? results.predictions;
          return results;
        });
      }
    };
    updateSearch();
  }, [locationQuery]);

  const previousResults = useRef<Result[]>([]);

  const results = searchResults?.predictions ?? [];

  return (
    <div id="frm-location" className="no-margin-front">
      <ReactSearchBox
        data={results?.map((result) => ({
          key: result.place_id,
          name: result.description,
          value: result.description,
          place_id: result.place_id,
        }))}
        matchedRecords={results?.map((result) => ({
          key: result.place_id,
          name: result.description,
          value: result.description,
          place_id: result.place_id,
        }))}
        autoFocus={false}
        fuseConfigs={{
          minMatchCharLength: 0,

          threshold: 1,

          distance: 100000,

          sort: false,
        }}
        keys={['place_id']}
        clearInput={false}
        value={locationQuery}
        setValue={setLocationQuery}
        onChange={(result: string) => {
          const findPlaceId = (result: string) => {
            const record = previousResults.current.find((q) => q.description === result);
            return record?.place_id ?? '';
          };

          const placeId = findPlaceId(result);

          setLocation(placeId);
        }}
      />
    </div>
  );
};
