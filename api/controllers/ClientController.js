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
				results[i].company = results[i].company.name;
				if(results[i].address1){
					var address = results[i].address1;
					if(results[i].address2){address += "<br>"+results[i].address2};
					results[i].address = "<div class='smallAddress'><div>"+address+"</div><span>"+results[i].city+", </span><span>"+results[i].state+" </span><span>"+results[i].zip+"<span></div"
				};
			};
			console.log("No error in",results);
			return res.view('client/manage',{clients:results})
		})
	},
	import: function(req,res){
		var fs = require('fs');
		var parse = require('csv/node_modules/csv-parse');
		var output = [];
		var parser = parse({columns:true},function(err,data){
			// console.log(data);
			for (var i = data.length - 1; i >= 0; i--) {
				console.log(i,data[i])
				if(data[i].pka==''){
					data[i].pka = data[i]['first name']+' '+data[i]['last name'];
				}
			};
			return res.view('client/import',{clients:data});
		});

		req.file('csvFile').upload({maxBytes:10000000},function whenDone(err, uploadedFiles){
			if(err){return res.negotiate(err);
			}
			if (uploadedFiles.length === 0){
				return res.badRequest('No file was uploaded');
			}
			console.log(uploadedFiles)
			fs.createReadStream(uploadedFiles[0].fd).pipe(parser);
		})
	}
};

