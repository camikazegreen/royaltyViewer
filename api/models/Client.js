/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	firstName:{
  		type:'string'
  	},
  	lastName:{
  		type:'string'
  	},
  	performsAs:{
  		type:'array'
  	},
  	controlled:{
  		type:'boolean'
  	},
  	syncApproval:{
  		type:'boolean'
  	},
  	managerOK:{
  		type:'boolean'
  	},
  	fullCatalog:{
  		type:'boolean'
  	},
  	company:{
  		model:'company'
  	},
  	inBand:{
  		type:'boolean'
  	},
  	bands:{
  		collection:'band',
  		via:'members'
  	}
  }
};

