"use strict";
var VehicleCtrl = function(Vehicle){
	var VehicleObj = {};
	VehicleObj.PostVehicle = function(req, res, next){
		console.log(req);
		var newVehicle = new Vehicle(req.body);
		newVehicle.save(function(err, vehicle){
			if(err){
				console.log("=============")
				console.log(err)
				console.log("=============")
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, number: req.body});
		});
	}
	VehicleObj.GetVehicle = function(req, res, next){
		Vehicle.find(function(err, vehicle){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, vehicle: vehicle});
		});
	}
	VehicleObj.UpdateVehicle = function(req, res, next){
		var completed = req.body.completed;
		Vehicle.findById(req.params.number, function(err, vehicle){
			vehicle.completed = completed;
			vehicle.save(function(err, vehicle){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}
				res.json({status: true, message: "Status updated successfully"});
			});
		});
	}
	VehicleObj.DeleteVehicle = function(req, res, next){
		Vehicle.remove({number : req.params.number }, function(err, vehicle){
			if(err) {
				res.json({status: false, error: "Deleting vehicle is not successfull"});
			}
			res.json({status: true, message: "Vehicle deleted successfully"});
		});
	}
	return VehicleObj;
}
module.exports = VehicleCtrl;
