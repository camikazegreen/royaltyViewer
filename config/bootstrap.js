/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
var roles= [
{name:'customer'},
{name:'client'},
{name:'musicAdmin'},
{name:'creativeLicensing'},
{name:'musicSupervisor'},
{name:'staff'}
]
  i=0;
while(i<roles.length){
  Role.findOrCreate(
    roles[i]
    )
    .exec(function createRolesCB(err,record){
      if(err){console.log(err)};
      console.log('Created Role '+record.name);
  });
  i++;
}
var staff=[
{username:'jenny',email:'jenny.johnson@modernworkspub.com'},
{username:'melissa',email:'melissa.martin@modernworkspub.com'},
{username:'erin',email:'erin.grover@modernworkspub.com'},
{username:'alex',email:'alex.allen@modernworkspub.com'},
{username:'adam',email:'adam.tully@modernworkspub.com'},
{username:'bob',email:'bob.donnelly@modernworkspub.com'},
{username:'dan',email:'dan.coleman@modernworkspub.com'},
{username:'cameron',email:'cameron.green@modernworkspub.com'}
]
i=0;
while(i<staff.length){
  User.findOrCreate(staff[i])
    .exec(function createStaffCB(err,record){
      if(err){console.log(err)};
      console.log('Created Staff '+record.username);
      if(record.username == 'cameron'){
        PermissionService.addUsersToRole('cameron','admin');
      }
PermissionService.addUsersToRole(record.username,'staff')
    .then(function(){
      sails.log('added '+record.username+' to role staff');
    });
    });
  i++;
}
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
