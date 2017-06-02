let request = require('request-promise');
let endpoint = sails.config.CENSUS_API_ENDPOINT;
const apiKey = sails.config.CENSUS_API_KEY;
const censusYear = sails.config.CENSUS_YEAR;

/**
 * Helper function for calling the CitySDK API; returns a promise
 *
 * @param body the request body in json format
 * @returns a promise object representing the result of the query
 */
function query(body) {
  let auth = {
    user: apiKey,
    pass: '',
  };

  let opts = {
    url: endpoint,
    auth: auth,
    json: true,
    body: body
  };

  return request.post(opts);
}

/**
 * Queries the county containing the given zipcode
 * for the specified variables
 *
 * @param zip a zipcode in the county you want to query (e.g. downtown)
 * @param variables the array of variables you wish to query for
 * @returns a promise representing the result of the query
 */
function queryTractsForVariablesByZip(zip, variables) {
  let body = {
    zip: zip,
    level: "county",
    sublevel: true,
    api: "acs5/profile",
    year: censusYear,
    variables: ["NAME"].concat(variables)
  }

  return query(body);
}

/**
 * Queries the county containing the given point
 * for the specified variables
 *
 * @param coordinate a lat/long pair in the county you want to query (e.g. downtown)
 * @param variables the array of variables you wish to query for
 * @returns a promise representing the result of the query
 */
function queryTractsForVariablesByCoordinates(coordinates, variables) {
  let body = {
    lat: coordinates.lat,
    lng: coordinates.lng,
    level: "county",
    sublevel: true,
    api: "acs5/profile",
    year: censusYear,
    variables: ["NAME"].concat(variables)
  }

  return query(body);
}

/**
 * Queries the given state for its counties
 *
 * @param state the state whose the counties you want to return (e.g. downtown)
 * @returns a promise representing a list of each county's unique coordinates in the state
 */
function queryStateForCounties(stateCode) {
  let body = {
    level: "state",
    state: stateCode,
    variables: [],
    api: "acs5/profile",
    year: "2015",
    sublevel: true
  }

  return query(body)
  .then((countyList) => {
    let countyGeoIds = countyList.features.map((county) => {
      const lat = county.properties.CENTLAT;
      const lng = county.properties.CENTLON;

      return {lat: lat, lng: lng};
    });

    return countyGeoIds;
  });
}

module.exports = {
  queryTractsForVariables: queryTractsForVariablesByZip,
  queryTractsForVariablesByCoordinates : queryTractsForVariablesByCoordinates,
  queryStateForCounties: queryStateForCounties
};
