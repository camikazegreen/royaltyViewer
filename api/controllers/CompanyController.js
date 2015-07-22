/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	manage: function(req,res){
		Company.find().populate('clients')
		.exec(function(err,results){
			return res.view('company/manage',{companies:results})
		})
	}
};

