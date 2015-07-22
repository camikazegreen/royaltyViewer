/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req,res){
		Company.find()
		.exec(function(err,results){
			if(err){console.log(err)};
				return res.view('client/new',{companies:results})
		})
	}
};

