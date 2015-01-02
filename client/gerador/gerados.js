Template.gradesSolicitadas.helpers({

  listarGradesSolicitadas: function(){
    return GradesProcessadas.find({});
  },

  fieldsTable: function(){
    return [
    { key: 'createdAt', label: 'Data Solicitação', fn: function(v){return moment(v).format('DD/MM/YYYY');} },
    { key: 'id_grade', label: 'Nome', fn: function(v){
      console.log(v);
      return Grades.findOne({_id: v}).name;
      }
    },
    { key: 'createdBy', label: 'Criado por', fn: function(v){
      return Meteor.users.findOne({_id: v}).profile.name;
      }
    },
    { label: '', tmpl: Template.statusGeracao }
    ]
  }
});
