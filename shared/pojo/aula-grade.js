AulasGrade = new Mongo.Collection('aulas_grade');

SchemaAulaGrade = new SimpleSchema({
  id_grade: {
    type: String
  },
  id_professor: {
    type: String
  },
  id_disciplina: {
    type: String,
    optional: true
  },
  id_turma: {
    type: String,
    optional: true
  },
  qtd_aulas: {
    type: Number
  }
});

AulasGrade.attachSchema(SchemaAulaGrade);

AulasGrade.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  createdBy: 'createdBy',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
});

AulasGrade.allow({
  insert: function(){
    return Meteor.user() !== null;
  },
  update: function(){
    return Meteor.user() !== null;
  },
  remove: function(){
    return Meteor.user() !== null;
  }
});
