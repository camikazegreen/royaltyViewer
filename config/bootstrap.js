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
for(var i=0;i<roles.length;i++){
  Role.findOrCreate(
    roles[i]
    )
    .exec(function createRolesCB(err,record){
      if(err){console.log(err)};
      console.log('Created Role '+record.name);
  });

}
var companies=[
{name:'Modern Works (A Side)'},
{name:'Artist Share'},
{name:'Crowded Air'},
{name:'Goodnight Records'},
{name:'Light In The Attic'},
{name:'Second Floor Music'},
{name:'Shlomo Diego'},
{name:'Superior Music'},
{name:'United For Opportunity'},
{name:'Fanatic Records'},
{name:'1630'},
{name:'Gallops Music'},
{name:'TRIBO'}
]
for(var i=0;i<companies.length;i++){
  Company.findOrCreate(
    companies[i]
    )
  .exec(function createCompaniesCB(err,record){
    if(err){console.log(err)};
    // console.log('Created Company '+record.name);
  });
}

  var schedule = require('node-schedule');
  Object.keys(sails.config.crontab).forEach(function(key) {
      var val = sails.config.crontab[key];
      schedule.scheduleJob(key, val);
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
