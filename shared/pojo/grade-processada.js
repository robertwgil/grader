GradesProcessadas = new Mongo.Collection('grades_processadas');

SchemaGradesProcessadas = new SimpleSchema({
  id_grade: {
    type: String
  },
  steps: {
    type: Number,
    optional: true
  },
  processedAt: {
    type: Date,
    optional: true
  },
  startProcessAt: {
    type: Date,
    optional: true
  },
  bestScore: {
    type: String,
    optional: true
  },
  result: {
    type: Object,
    optional: true
  }
});

GradesProcessadas.attachSchema(SchemaGradesProcessadas);

GradesProcessadas.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  createdBy: 'createdBy',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
});

GradesProcessadas.allow({
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
