/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	view: function(req,res){
		var concerts = {};
		concerts.newyork = [];
		concerts.losAngeles = [];
		concerts.nashville = [];
		concerts.arizona = [];
		Concerts.find({ where: { location: 'New York' },date:{'>':new Date()}})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.newyork.push(r[i]);
			};
		Concerts.find({ where: { location: 'Los Angeles' },date:{'>':new Date()}})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.losAngeles.push(r[i]);
			};
		Concerts.find({ where: { location: 'Nashville' },date:{'>':new Date()}})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.nashville.push(r[i]);
			};
		Concerts.find({ where: { location: 'Tucson' },date:{'>':new Date()}})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.arizona.push(r[i]);
			};
		Concerts.find({ where: { location: 'Phoenix' },date:{'>':new Date()}})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.arizona.push(r[i]);
			};




		 return res.view('concerts',{concerts:concerts})
		})
	}
};

