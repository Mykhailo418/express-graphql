var mongodb = require('mongodb');
var db = require('monk')('localhost/graphql');

module.exports.getUserById = function(_id){
	let users = db.get('users');
	return users.findOne({_id}, {});
}

module.exports.getCompanyById = function(id){
	let companies = db.get('companies');
	return companies.findOne({id}, {});
}

module.exports.getAllUsersOfCompany = function(companyId){
	let users = db.get('users');
	return users.find({companyId}, {});
}

module.exports.getAllUsers = function(){
	let users = db.get('users');
	return users.find({}, {});
}

module.exports.getAllCompanies = function(){
	let users = db.get('companies');
	return users.find({}, {});
}

module.exports.addUser = function(user){
	const users = db.get('users');
	return users.insert({id: Date.now().toString(), ...user});
}

module.exports.addCompany = function(company){
	const companies = db.get('companies');
	return companies.insert({id: Date.now().toString(), ...company, likes: 0});
}

module.exports.likeCompany = function(id){
	const companies = db.get('companies');
	return companies.findOne({id: id}, {}).then((company) => {
		const data = {...company, likes: company.likes + 1};
		companies.update({id: id}, {$set: data});
		return data;
	});
}

module.exports.deleteUser = function(id){
	let users = db.get('users');
	return users.remove({_id: id}, {multi: false});
}

module.exports.updateUser = function(user){
	let users = db.get('users');
	return users.update({id: user.id}, {$set: user});
}
