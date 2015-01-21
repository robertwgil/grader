Meteor.publish("professores", function(){
  return Professores.find({});
});

Meteor.publish("turmas", function(){
  return Turmas.find({});
});

Meteor.publish("disciplinas", function(){
  return Disciplinas.find({});
});

Meteor.publish("grades", function(){
  return Grades.find({});
});

Meteor.publish("aulas_grade", function(){
  return AulasGrade.find({});
});

Meteor.publish("grades_processadas", function(){
  return GradesProcessadas.find({}, {sort: {'createdAt': -1}});
});
