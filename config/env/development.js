/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Sensitive env variables should go in local.js. They are:
   *
   * CENSUS_API_KEY : '',
   * CENSUS_API_ENDPOINT: '',
   * CENSUS_YEAR: 2015,
   * MAPBOX_API_KEY : '',
   * MAPBOX_DATASET_ID : '',
   ***************************************************************************/

   connections: {
     postgres: {
       adapter: 'sails-postgresql',
       host: 'localhost'
     }
   },

  redis: {
    server: {
      host: 'localhost',
      port: '6379'
    },
    rsmq: {
      qname: 'uploadQueue'
    }
  },

};
