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
				if(results[i].company) {results[i].company = results[i].company.name};
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
				if(data[i].pka==''){
					data[i].pka = data[i]['first name']+' '+data[i]['last name'];
				}
				if(data[i].band){
					Band.findOrCreate({name:data[i].band},{name:data[i].band}).exec(function(err,record){
						// data[i].band = record.id;
						console.log(data[i]);
					})
				}
				if(data[i].Controlled=="Yes"){data[i].Controlled=true}
				if(data[i].Controlled=="No"){data[i].Controlled=false}
				if(data[i].Held=="Y"){data[i].Held=true}
				if(data[i].Held=="N"){data[i].Held=false}
				if(data[i]['Contract Date']){
					data[i]['Contract Date']=new Date(data[i]['Contract Date'])
				}else{
					data[i]['Contract Date']=null
				}
				if(data[i]['Expiry Date']){
					data[i]['Expiry Date']=new Date(data[i]['Expiry Date'])
				}else{
					data[i]['Expiry Date']=null
				}
				console.log(i,data[i])
			Client.create({
				entity:data[i].entity,
				firstname:data[i]['first name'],
				middlename:data[i]['middle name'],
				lastname:data[i]['last name'],
				performsas:data[i].pka,
				controlled:data[i].Controlled,
				company:data[i].CompanyId,
				// finder:data[i].finder,
				bands:data[i].band,
				address1:data[i]['First Line'],
				address2:data[i]['Second Line'],
				city:data[i].City,
				state:data[i].State,
				zip:data[i].Zip,
				country:data[i].Country,
				email:data[i].Email,
				startdate:data[i]['Contract Date'],
				enddate:data[i]['Expiry Date'],
				mmcode:data[i].Code,
				held:data[i].Held,
				Rrate:String(data[i]['[R]']).toLowerCase == "true",
				SRrate:String(data[i]['[SR]']).toLowerCase == "true"
			},function(err,record){
				console.log(err,record,i);
			})
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

