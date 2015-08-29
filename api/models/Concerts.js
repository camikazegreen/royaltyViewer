/**
* Concerts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	string:{
  		type:'string'
  	},
  	location:{
  		type:'string'
  	},
  	songkickID:{
  		type:'string',
  		unique:true
  	},
  	venue:{
  		type:'string'
  	},
  	songkickPage:{
  		type:'string'
  	},
  	date:{
  		type:'string'
  	},
  	time:{
  		type:'string'
  	},
  	artist:{
  		type:'string'
  	}
  }
};

