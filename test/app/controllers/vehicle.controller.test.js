"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');
require('sinon-mongoose');
var VehicleModel = require('../../../app/models/vehicle.model');
describe('VehicleController testing', function () {
	describe('Vehicle Post test', function () {
		
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Book(){
				this.save = saveStub
			}
			var req = {
				body: {
					vehicle: "Test vehicle from mock"
				}
			}
			var res = {}, next = {};
			var VehicleController = require('../../../app/controllers/vehicle.controller')(Book);
			VehicleController.PostVehicle(req, res, next);
			sinon.assert.calledOnce(saveStub);
		});
		it('Should save vehicle', function (done) {
			var vehicleMock = sinon.mock(new VehicleModel({ vehicle: 'Save new vehicle from mock'}));
			var vehicle = vehicleMock.object;
			vehicleMock
			.expects('save')
			.yields(null, 'SAVED');
			vehicle.save(function(err, result) {
				vehicleMock.verify();
				vehicleMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});
	});
	describe('Get all Vehicle test', function () {
		it('Should call find once', function (done) {
			var VehicleMock = sinon.mock(VehicleModel);
			VehicleMock
			.expects('find')
			.yields(null, 'VEHICLES');
			VehicleModel.find(function (err, result) {
				VehicleMock.verify();
				VehicleMock.restore();
				should.equal('VEHICLES', result, "Test fails due to unexpected result")
				done();
			});
		});
	});
	describe('Delete vehicle test', function () {
		it('Should delete vehicle of gived id', function (done) {
			var VehicleMock = sinon.mock(VehicleModel);
			VehicleMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');
			VehicleModel.remove({_id: 12345}, function(err, result){
				VehicleMock.verify();
				VehicleMock.restore();
				done();
			})
		});
	});
	describe('Update a vehicle', function () {
		it('Should update the vehicle with new value', function (done) {
			var vehicleMock = sinon.mock(new VehicleModel({ vehicle: 'Save new vehicle from mock'}));
			var vehicle = vehicleMock.object;
			vehicleMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');
			vehicle.save({_id: 12345}, function(err, result){
				vehicleMock.verify();
				vehicleMock.restore();
				done();
			})
		});
	});
});