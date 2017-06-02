/**
 * MapController
 *
 * @description :: Server-side logic for managing Maps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

async function uploadIncomeData(req, res) {
	// query for income by geographic area
	let zip = req.body.zip;
	if(!zip) {
		let state = req.body.state;
		if(!state) {
			res.badRequest();
		}
		console.log(`Querying ${state} for income data...`);
		let counties = await CensusService.queryStateForCounties(state);
		let count = 0;
		for(countyCoordinates of counties) {
			count++;
			console.log(`Querying county ${count} for tracts...`);
			try {
				let tracts = await CensusService.queryTractsForVariablesByCoordinates(countyCoordinates, ['DP03_0062E']);

				console.log("Queuing tracts for upload...");
				MapBoxService.queueFeatures(tracts);
			} catch(e) {
				console.log(e);
			}
		}
	}
	else {
		console.log(`Querying ${zip} for income data...`);
		let tracts = await CensusService.queryTractsForVariables(zip, ['DP03_0062E']);

		// upload the results
		console.log('Queing tracts for upload...');
		MapBoxService.queueFeatures(tracts);

	}

	console.log('Done queuing data!');
	res.ok();
}

async function getCounties(req,res) {
	let state = req.body.state;
	if(!state) res.badRequest();

	console.log(`Querying ${state} for counties data...`);
	let counties = await CensusService.queryStateForCounties(state);

	console.log('Done querying state!');

	res.send(counties);
}


module.exports = {
	uploadIncomeData: uploadIncomeData,
	getCounties: getCounties
};
