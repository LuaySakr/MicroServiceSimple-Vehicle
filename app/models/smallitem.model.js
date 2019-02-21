var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Vehicle schema
var VehicleSchema = new Schema({
	vehicle: String,
	completed: { type:Boolean, default: false },
	created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
VehicleSchema.pre('save', function(next, done) {
	if(!this.vehicle){
		next(new Error("vehicle should not be null"));
	}
  	next();
});

var VehicleModel = mongoose.model('Vehicle', VehicleSchema);

module.exports = VehicleModel;