let dataset = sails.config.MAPBOX_DATASET_ID;
let username = sails.config.MAPBOX_USERNAME;
let apiKey = sails.config.MAPBOX_API_KEY;
let redisConfig = sails.config.redis;
let RedisSMQ = require('rsmq');
let RSMQWorker = require('rsmq-worker');
let Mapbox = require('mapbox');
let mapboxClient = new Mapbox(apiKey);
let rsmq = new RedisSMQ(redisConfig.server);

// Create a queue
//rsmq.createQueue(redisConfig.rsmq);
let queue = new RSMQWorker(redisConfig.rsmq.qname, {
  maxReceiveCount: 1500,
  timeout: 30000
});

function insertFeature(feature) {
  return mapboxClient.insertFeature(feature, dataset)
  .catch(function(err) {
    console.log(err);
  });
}

// TODO: https://github.com/mapbox/mapbox-sdk-js/blob/master/API.md#listfeatures
function listFeatures() {
  //return mapboxClient.listFeatures()
}

function queueFeatures(featureColleciton) {
	for (tract of featureColleciton.features) {

    // TODO: make this part of MapBoxService
		// clean up the data
		let income = tract.properties.DP03_0062E
		if(income === "250,000+") {
			income = "300000";
		}
		tract.properties.income = Number(income);
		tract.id = tract.properties.GEOID;

    // start the upload and add it to the batch
    queue.send(JSON.stringify(tract));
	}
}

let uploadQueue = []; // batch updates to speed up request time
async function uploadFeature(feature) {
  if(uploadQueue.length < 25) {
    let upload = MapBoxService.insertFeature(feature);
    uploadQueue.push(upload);
  }
  else {
    await Promise.all(uploadQueue)
    uploadQueue.splice(0, uploadQueue.length);

    await uploadFeature(feature);
  }
}

queue.on('message', (msg, next, id) => {
  let tract = JSON.parse(msg);

  uploadFeature(tract)
  .then(next)
  .catch((err, msg) => {
    next(err);
  });
});
queue.on('error', (err, msg) => {
  console.log(`RSMQ ERROR`, err);
});
queue.on('exceeded', (msg) => {
  console.log(`RSMQ SIZE EXCEEDED`);
});
queue.on('timeout', (msg) => {
  console.log(`RSMQ MESSAGE TIMEOUT`);
});

queue.start();

module.exports = {
  insertFeature : insertFeature,
  queueFeatures: queueFeatures
};
