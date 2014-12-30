Meteor.publish("professores", function(){
  return Professores.find({});
});

Meteor.publish("turmas", function(){
  return Turmas.find({});
});
