Professores = new Mongo.Collection('professores');


DisponibilidadeSchema = new SimpleSchema({
  dia: {
    type: Number
  },
  periodo: {
    type: Number
  }
});

SchemaProfessor = new SimpleSchema({
  name: {
    type: String,
    label: 'Nome',
    max: 50
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  sexo: {
    type: String,
    allowedValues: [ "M", "F" ]
  },
  disponibilidade : {
    type: [DisponibilidadeSchema]
  }
});

Professores.attachSchema(SchemaProfessor);

Professores.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  createdBy: 'createdBy',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
});

Professores.allow({
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
