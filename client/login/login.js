Template.navigation.events({
  "click #logout": function(event, template){
     Meteor.logout(function(err){
        Router.go('/');
     });
  }
});


Template.login.events({
  'submit #login-form' : function(e, t){
    e.preventDefault();

    var email = t.find('#login-email').value;
    var password = t.find('#login-password').value;

    Meteor.loginWithPassword(email, password, function(err){

      if (err) {
        Flash.danger(i18n('invalid.username'));
      } else {
        Router.go("home");
      }

    });

    return false;

  }
});
