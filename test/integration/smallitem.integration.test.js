"use strict";

var should = require('should'),
	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
	Vehicle = mongoose.model('Vehicle'),
	agent = request.agent(app);

describe('Vehicle CRUD integration testing', function () {

	describe('Get all vehicle', function () {

		before(function (done) {
			var newVehicle = { vehicle: "Vehicle from hooks" };
			agent
			.post('/api/vehicles')
			.end(function(){
				done();
			})
		});

		it('Should get status equal success and array of vehicle', function (done) {
			agent
			.get('/api/vehicles')
			.expect(200)
			.end(function(err, results){
				results.body.status.should.equal(true);
				done();
			});
		});
		
	});
	
	describe('Post a vehicle', function () {
		it('Should allow post to post a vehicle and return _id', function (done) {
			var params = { vehicle: "Vehicle fro testing" };
			agent
			.post('/api/vehicles')
			.send(params)
			.expect(200)
			.end(function(err, results){
				results.body.vehicle.completed.should.equal(false);
				results.body.vehicle.should.have.property('_id');
				done();
			});
		});
	});
	
	describe('Delete a vehicle', function () {
		var id;
		before(function (done) {
			var params = { vehicle: "Vehicle from hooks to delete" };
			agent
			.post('/api/vehicles')
			.send(params)
			.end(function(err, result){
				id = result.body.vehicle._id;
				done();
			})
		});

		it('Should delete the vehicle by _id', function (done) {
			agent
			.delete('/api/vehicles/'+id)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});

	});

	describe('Update a vehicle', function () {
		var id;
		before(function (done) {
			var newVehicle = { vehicle: "Vehicle from hooks to update" };
			agent
			.post('/api/vehicles')
			.send(newVehicle)
			.end(function(err, result){
				id = result.body.vehicle._id;
				done();
			})
		});

		it('Should update the completed status of vehicle by _id to true', function (done) {
			var params = { completed: true };
			agent
			.put('/api/vehicles/'+id)
			.send(params)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});
	});

});

