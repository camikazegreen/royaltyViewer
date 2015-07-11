// api/controllers/RoleController.js

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/RoleController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  update: function(req,res){
    var params = req.body;
    var username = params.username;
    var add = JSON.parse(params.add);
    var remove = JSON.parse(params.remove);
    for(i=0;i<add.length;i++){
    PermissionService.addUsersToRole(username,add[i])
    .then(function(){
      sails.log('added '+username+' to role '+add[i])
    })
  }
    for(i=0;i<remove.length;i++){
    PermissionService.removeUsersFromRole(username,remove[i])
    .then(function(){
      sails.log('removed '+username+' from role '+remove[i])
    })
  }
    res.status(201);
    res.json("did it");

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
