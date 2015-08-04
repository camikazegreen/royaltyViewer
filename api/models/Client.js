/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	firstname:{
  		type:'string'
  	},
  	lastname:{
  		type:'string'
  	},
  	performsas:{
  		type:'string'
  	},
  	controlled:{
  		type:'boolean'
  	},
  	syncapproval:{
  		type:'boolean'
  	},
  	managerok:{
  		type:'boolean'
  	},
  	fullcatalog:{
  		type:'boolean'
  	},
  	company:{
  		model:'company'
  	},
  	inband:{
  		type:'boolean'
  	},
  	bands:{
  		collection:'band',
  		via:'members'
  	},
    address1:{
      type:'string'
    },
    address2:{
      type:'string'
    },
    city:{
      type:'string'
    },
    state:{
      type:'string'
    },
    zip:{
      type:'string'
    },
    country:{
      type:'string'
    },
    email:{
      type:'string'
    },
    phone:{
      type:'string'
    },
    clientrep:{
      type:'string'
    }

  }
};

