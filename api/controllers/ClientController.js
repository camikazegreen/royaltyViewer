/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req,res){
		Company.find().populate('clients')
		.exec(function(err,results){
				return res.view('client/new',{companies:results})
		})
	},
	manage: function(req,res){
		Client.find().populate('company')
		.exec(function(err,results){
			return res.view('client/manage',{clients:results})
		})
	}
};

