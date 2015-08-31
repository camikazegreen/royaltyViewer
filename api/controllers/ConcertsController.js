/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	view: function(req,res){
		var counter = 0;
		var oneMonth = new Date();
		oneMonth.setMonth(oneMonth.getMonth() + 1);
		var concerts = {};
		concerts.newyork = [];
		concerts.losAngeles = [];
		concerts.nashville = [];
		concerts.arizona = [];
		Concerts.find({ where: { location: 'New York' },date:{'>':new Date(),'<':oneMonth}, sort: 'date DESC'})
		.exec(function(e,r){
			if(e){console.log(e)};
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.newyork.push(r[i]);
			};
			counter++;console.log("NY="+counter);
			checkDone();
		})
		Concerts.find({ where: { location: 'Los Angeles' },date:{'>':new Date(),'<':oneMonth}, sort: 'date DESC'})
		.exec(function(e,r){
			if(e){console.log(e)};
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.losAngeles.push(r[i]);
			};
			counter++;console.log("LA="+counter);
			checkDone();
		})
		Concerts.find({ where: { location: 'Nashville' },date:{'>':new Date(),'<':oneMonth}, sort: 'date DESC'})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.nashville.push(r[i]);
			};
			counter++;console.log("NV="+counter);
			checkDone();
		})
		Concerts.find({ where: { location: 'Tucson' },date:{'>':new Date(),'<':oneMonth}, sort: 'date DESC'})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.arizona.push(r[i]);
			};
			counter++;console.log("Tucson="+counter);
			checkDone();
		})
		Concerts.find({ where: { location: 'Phoenix' },date:{'>':new Date(),'<':oneMonth}, sort: 'date DESC'})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.arizona.push(r[i]);
			};
			counter++;console.log("AZ="+counter);
			checkDone();
		})

		function checkDone(){
			if(counter==5){	
		 		return res.view('concerts',{concerts:concerts})
			}
		}


	}
};

