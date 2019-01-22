var mongodb = require('mongodb');
var db = require('monk')('localhost/graphql');

module.exports.getAllUsers = function(callback){
	let users = db.get('users');
	users.find({}, {}, callback);
}

module.exports.getUserById = function(id){
	let users = db.get('users');
	return users.findOne({id}, {});
}
