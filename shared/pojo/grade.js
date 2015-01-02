Grades = new Mongo.Collection('grades');

SchemaGrade = new SimpleSchema({
  name: {
    type: String,
    label: 'Nome',
    max: 50
  },
  year: {
    type: Number,
    label: 'Ano'
  },
  semester: {
    type: Number,
    label: 'Semestre'
  }
});

Grades.attachSchema(SchemaGrade);

Grades.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  createdBy: 'createdBy',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
});

Grades.allow({
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
