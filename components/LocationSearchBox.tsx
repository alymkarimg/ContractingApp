import { useEffect, useRef, useState } from 'react';
import ReactSearchBox from 'alymkarimg-react-search-box';

type GeoLocation = { latitude: number; longitude: number };

const GeoBanner = (props: any) => {
  const { geoLocation, geoError, searchResults } = props;
  if (geoError) {
    return <p className="banner warn">{geoError.message} </p>;
  } else if (geoLocation.latitude) {
    return (
      <p className="banner success">
        Lat:
        <strong>{geoLocation.latitude.toFixed(4)} </strong>, Long:
        <strong>{geoLocation.longitude.toFixed(4)} </strong>
      </p>
    );
  } else {
    return null;
  }
};

class Placefinder {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getNearbyPlaces(query: any, lat: any, long: any, limit = 10, radius = 10000) {
    let baseUrl = 'https://api.tomtom.com/search/2/search';

    let queryString = `key=${this.apiKey}&typeahead=true&extendedPostalCodesFor=PAD,Addr,POI&language=en-US&limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&countrySet=GB/GBR&resultSet=category,brand`;

    let response = await fetch(`${baseUrl}/${query}.json?${queryString}`);
    return response.json();
  }
}

export const LocationSearchBox = (props: any) => {
  const { apiKey, name } = props;

  const [state, setState] = useState({
    geoLocation: {} as any,
    geoError: null,
    searchResults: [] as any,
    query: '',
  });

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
        setState({ ...state, geoError: err as any });
      }
    );
  }, []);

  const onSearchChange = async (query: any) => {
    if (query.length > 0 && apiKey) {
      let placeFinder = new Placefinder(apiKey);

      let results = await placeFinder.getNearbyPlaces(query, state.geoLocation.latitude, state.geoLocation.longitude);

      setState({ ...state, searchResults: results as any, query });
    }
  };

  const results = state.searchResults.results ?? [];

  const getValue = (result: any) => {
    if (result.poi?.name) return result.poi?.name + ' ' + result.address.freeformAddress;
    else return result.address.freeformAddress;
  };

  return (
    <div id="frm-location" className="no-margin-front">
      <ReactSearchBox
        name={name}
        data={results
          ?.map((result: { address: { freeformAddress: string }; id: any; poi: { name: any }; dist: any }) => ({
            key: result.id,
            name: getValue(result),
            dist: result.dist,
            value: getValue(result),
          }))
          .sort((a: { dist: number }, b: { dist: number }) => a.dist - b.dist)}
        matchedRecords={results
          ?.map((result: { address: { freeformAddress: string }; id: any; poi: { name: any }; dist: number }) => ({
            key: result.id,
            name: getValue(result),
            dist: result.dist,
            value: ` ${getValue(result)} | ${(result.dist / 1000).toFixed(2)} km `,
          }))
          .sort((a: { dist: number }, b: { dist: number }) => a.dist - b.dist)}
        autoFocus={false}
        onChange={(query: any) => onSearchChange(query)}
        fuseConfigs={{
          minMatchCharLength: 0,

          threshold: 1,

          distance: 100000,

          sort: false,
        }}
        keys={['name']}
        clearInput={false}
      />
    </div>
  );
};
