import { useEffect, useState } from 'react';
import ReactSearchBox from 'alymkarimg-react-search-box';

// type GeoLocation = { latitude: number; longitude: number };

// const GeoBanner = (props: any) => {
//   const { geoLocation, geoError } = props;
//   if (geoError) {
//     return <p className="banner warn">{geoError.message} </p>;
//   } else if (geoLocation.latitude) {
//     return (
//       <p className="banner success">
//         Lat:
//         <strong>{geoLocation.latitude.toFixed(4)} </strong>, Long:
//         <strong>{geoLocation.longitude.toFixed(4)} </strong>
//       </p>
//     );
//   } else {
//     return null;
//   }
// };

interface Result {
  id: string;
  poi: { name: string };
  address: { freeformAddress: string };
  index: number;
  dist: number;
}

interface SearchResults {
  results: Result[];
}

export const LocationSearchBox = (props: {
  apiKey: string;
  setTargetGeoLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: Blob;
      longitude: Blob;
    }>
  >;
  locationQuery: string;
  setLocationQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { apiKey, setTargetGeoLocation, locationQuery, setLocationQuery } = props;

  const [state, setState] = useState({
    geoLocation: {} as { latitude: number; longitude: number },
    geoError: null as GeolocationPositionError | null,
    searchResults: {} as SearchResults,
  });

  const getNearbyPlaces = async (apiKey: string, query: string, lat: number, long: number, limit = 10, radius = 1000000) => {
    const baseUrl = 'https://api.tomtom.com/search/2/search';

    const queryString = `key=${apiKey}&typeahead=true&extendedPostalCodesFor=PAD,Addr,POI&language=en-US&limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&countrySet=GB/GBR&resultSet=category,brand`;

    try {
      const response = await fetch(`${baseUrl}/${query}.json?${queryString}`);
      return response.json();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        if (e.coords.latitude && e.coords.longitude) {
          setState({
            ...state,
            geoLocation: {
              latitude: e.coords.latitude,
              longitude: e.coords.longitude,
            },
          });
        }
      },
      async (err) => {
        setState({ ...state, geoError: err as GeolocationPositionError });
      }
    );
  }, [state]);

  useEffect(() => {
    const updateSearch = async () => {
      if (locationQuery.length > 0 && apiKey) {
        const results = await getNearbyPlaces(apiKey, locationQuery, state.geoLocation.latitude, state.geoLocation.longitude);

        if (results) {
          if (results.summary) {
            setTargetGeoLocation({ latitude: results.summary.geoBias.lat, longitude: results.summary.geoBias.lon });
          }

          setState({ ...state, searchResults: results });
        }
      }
    };
    updateSearch();
  }, [apiKey, setTargetGeoLocation, state, locationQuery]);

  const results = state.searchResults.results ?? [];

  const getValue = (result: Result) => {
    if (result.poi?.name) return result.poi?.name + ' ' + result.address.freeformAddress;
    else return result.address.freeformAddress;
  };

  return (
    <div id="frm-location" className="no-margin-front">
      <ReactSearchBox
        data={results
          ?.map((result) => ({
            key: result.id,
            name: getValue(result),
            dist: result.dist,
            value: getValue(result),
          }))
          .sort((a: { dist: number }, b: { dist: number }) => a.dist - b.dist)}
        matchedRecords={results
          ?.map((result) => ({
            key: result.id,
            name: getValue(result),
            dist: result.dist,
            value: ` ${getValue(result)} | ${(result.dist / 1000).toFixed(2)} km `,
          }))
          .sort((a: { dist: number }, b: { dist: number }) => a.dist - b.dist)}
        autoFocus={true}
        fuseConfigs={{
          minMatchCharLength: 0,

          threshold: 1,

          distance: 100000,

          sort: false,
        }}
        keys={['name']}
        clearInput={false}
        value={locationQuery}
        setValue={setLocationQuery}
      />
    </div>
  );
};
