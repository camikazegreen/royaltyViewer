// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  manage: function(req,res){
    User.find().populate('roles')
  .exec(function(e,r){
    var i=0;
    while(i<r.length){
      var roles = r[i].roles;
      r[i].admin=false;
      r[i].client=false;
      r[i].creativeLicensing=false;
      r[i].customer=false;
      r[i].musicAdmin=false;
      r[i].musicSupervisor=false;
      r[i].registered=false;
      r[i].staff=false;
      var j=0;
      while(j<roles.length){
          var role = roles[j].name;
          if(role=="admin"){r[i].admin=true;}
          if(role=="client"){r[i].client=true;}
          if(role=="creativeLicensing"){r[i].creativeLicensing=true;}
          if(role=="customer"){r[i].customer=true;}
          if(role=="musicAdmin"){r[i].musicAdmin=true;}
          if(role=="musicSupervisor"){r[i].musicSupervisor=true;}
          if(role=="registered"){r[i].registered=true;}
          if(role=="staff"){r[i].staff=true;}
        j++;}
    i++;}
return res.view('user/manage',{users:r})
  });
  }
  /**
   * For example:
   *
   * foo: function (bar) {
   *   bar.x = 1;
   *   bar.y = 2;
   *   return _super.foo(bar);
   * }
   */
});
