var mongodb = require('mongodb');
var db = require('monk')('localhost/graphql');

module.exports.getAllUsers = function(){
	let users = db.get('users');
	users.find({}, {});
}

module.exports.getUserById = function(id){
	let users = db.get('users');
	return users.findOne({id}, {});
}

module.exports.getCompanyById = function(id){
	let companies = db.get('companies');
	return companies.findOne({id}, {});
}

module.exports.getAllUsersOfCompany = function(companyId){
	let users = db.get('users');
	return users.find({companyId}, {});
}

module.exports.addUser = function(user){
	const users = db.get('users');
	return users.insert({id: Date.now().toString(), ...user});
}

module.exports.deleteUser = function(id){
	let users = db.get('users');
	return users.remove({id}, {multi: false});
}

module.exports.updateUser = function(user){
	let users = db.get('users');
	return users.update({id: user.id}, {$set: user});
}
