import { useEffect, useState } from 'react';
import ReactSearchBox from 'alymkarimg-react-search-box';

type GeoLocation = { latitude: number; longitude: number };

const GeoBanner = (props: any) => {
  const { geoLocation, geoError } = props;
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

export const LocationSearchBox = (props: any) => {
  const { apiKey, setTargetGeoLocation, locationQuery, setLocationQuery } = props;

  const [state, setState] = useState({
    geoLocation: {} as any,
    geoError: null,
    searchResults: [] as any,
  });

  const getNearbyPlaces = async (apiKey: string, query: any, lat: any, long: any, limit = 10, radius = 1000000) => {
    let baseUrl = 'https://api.tomtom.com/search/2/search';

    let queryString = `key=${apiKey}&typeahead=true&extendedPostalCodesFor=PAD,Addr,POI&language=en-US&limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&countrySet=GB/GBR&resultSet=category,brand`;

    try {
      let response = await fetch(`${baseUrl}/${query}.json?${queryString}`);
      return response.json();
    } catch (e) {
      console.log(e)
    }
  }

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

  useEffect(() => {
    const updateSearch = async () => {
      if (locationQuery.length > 0 && apiKey) {
  
        let results = await getNearbyPlaces(apiKey, locationQuery, state.geoLocation.latitude, state.geoLocation.longitude);

        if(results) {
          if(results.summary) {
            setTargetGeoLocation({ latitude: results.summary.geoBias.lat, longitude: results.summary.geoBias.lon });
          }
  
          setState({ ...state, searchResults: results as any });
        }
      }
    }
    updateSearch()
    
  }, [locationQuery])

  const results = state.searchResults.results ?? [];

  const getValue = (result: any) => {
    if (result.poi?.name) return result.poi?.name + ' ' + result.address.freeformAddress;
    else return result.address.freeformAddress;
  };

  return (
    <div id="frm-location" className="no-margin-front">
      <ReactSearchBox
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
