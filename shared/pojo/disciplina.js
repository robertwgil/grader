Disciplinas = new Mongo.Collection('disciplinas');

SchemaDisciplina = new SimpleSchema({
  name: {
    type: String,
    label: 'Nome',
    max: 50
  }
});

Disciplinas.attachSchema(SchemaDisciplina);

Disciplinas.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  createdBy: 'createdBy',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
});

Disciplinas.allow({
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
