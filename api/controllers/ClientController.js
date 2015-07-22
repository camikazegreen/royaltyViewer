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
	}
};

