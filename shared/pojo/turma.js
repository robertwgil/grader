Turmas = new Mongo.Collection('turmas');

SchemaTurma = new SimpleSchema({
  name: {
    type: String,
    label: 'Nome',
    max: 50
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});

Turmas.attachSchema(SchemaTurma);

Turmas.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  createdBy: 'createdBy',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
});

Turmas.allow({
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
