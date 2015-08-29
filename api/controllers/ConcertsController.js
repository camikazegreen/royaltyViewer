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
		Concerts.find({ where: { location: 'New York' },date:{'>':new Date()}})
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
			for (var i = r.length - 1; i >= 0; i--) {
				concerts.newyork.push(r[i]);
			};
		 return res.view('concerts',{concerts:concerts})
		})
	}
};

