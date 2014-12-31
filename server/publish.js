Meteor.publish("professores", function(){
  return Professores.find({});
});

Meteor.publish("turmas", function(){
  return Turmas.find({});
});

Meteor.publish("disciplinas", function(){
  return Disciplinas.find({});
});
