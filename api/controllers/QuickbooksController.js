/**
 * QuickbooksController
 *
 * @description :: Server-side logic for managing quickbooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	manage: function(req,res){
	return res.view('quickbooks',{users:"none"})
}
};

