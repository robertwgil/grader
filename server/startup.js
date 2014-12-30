Meteor.startup(function(){

  var rgil = Meteor.users.findOne(({emails: [ {address: 'robertwgil@gmail.com', verified: false}] }));

  if(rgil == null){
    var user = {
      email: 'robertwgil@gmail.com',
      password: '102030',
      profile: {
        name: 'Robert Gil'
      }
    };

    var userNew = Accounts.createUser(user);
    Roles.addUsersToRoles(userNew, ['admin'])
  }


});
