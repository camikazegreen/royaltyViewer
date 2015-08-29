/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	view: function(req,res){
		Concert.find()
		.exec(function(e,r){
			if(e){console.log(e)};
			console.log(r);
		 // return res.view('concerts',{concerts:concerts})
		})
	}
};

