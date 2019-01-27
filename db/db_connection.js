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
	return users.find({}, {}).then((data) => {
		return users.insert({id: (data.length + 1).toString(), ...user});
	});
}
