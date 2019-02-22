var config = {
	port: process.env.PORT || 7002,
	db: process.env.MONGOLAB_URI || "mongodb://mongodb/vehicle",
	test_port: 8002,
	test_db: "mongodb://mongodb/vehicleapi_test"
}
module.exports = config;