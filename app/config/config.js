var config = {
	port: process.env.PORT || 2000,
	db: process.env.MONGOLAB_URI || "mongodb://mongodb/vehicle",
	test_port: 8001,
	test_db: "mongodb://mongodb/vehicleapi_test"
}
module.exports = config;