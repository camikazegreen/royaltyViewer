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
			if(err){console.log(err)};
			for (var i = results.length - 1; i >= 0; i--) {
				results[i].address = "<div><div>"+results[i].address1+"</div><div>"+results[i].address2+"</div><span>"+results[i].city+",</span><span>"+results[i].state+"</span><span>"+results[i].zip+"<span></div"
			};
			console.log("No error in",results);
			return res.view('client/manage',{clients:results})
		})
	}
};

