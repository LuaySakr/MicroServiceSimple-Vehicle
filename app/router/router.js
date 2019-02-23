var Vehicle = require('../models/vehicle.model');
var VehicleController = require('../controllers/vehicle.controller')(Vehicle);

module.exports = function(app){

	app.get('/api/vehicles', VehicleController.GetVehicle);
	
	app.post('/api/vehicles', VehicleController.PostVehicle);

	app.put('/api/vehicles/:number', VehicleController.UpdateVehicle);

	app.delete('/api/vehicles/:number', VehicleController.DeleteVehicle);

}