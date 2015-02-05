Template.gradesSolicitadas.helpers({

  listarGradesSolicitadas: function(){
    return GradesProcessadas.find({});
  },

  fieldsTable: function(){
    return [
    { key: 'createdAt', label: 'Data Solicitação', sortByValue: true, fn: function(v){return moment(v).format('DD/MM/YYYY');}, sort: -1 },
    { key: 'id_grade', label: 'Nome', fn: function(v){
      return Grades.findOne({_id: v}).name;
      }
    },
    { key: 'createdBy', label: 'Criado por', fn: function(v){
      return Meteor.users.findOne({_id: v}).profile.name;
      }
    },
    { label: '', tmpl: Template.statusGeracao },
  { label: '', tmpl: Template.removeButtonInTable }
    ]
  }
});

Template.viewGrade.helpers({
  getGrade: function(){
    var gp = GradesProcessadas.findOne({_id: Iron.controller().params._id });
    return Grades.findOne({_id: gp.id_grade });
  },
  getGradeProcessada: function(){
    return GradesProcessadas.findOne({_id: Iron.controller().params._id });
  },
  getTurmas: function(){
    var gp = GradesProcessadas.findOne({_id: Iron.controller().params._id });

    if(gp.result) {
      var turmas = _.uniq(gp.result.aulas, function(item){
        return item.id_turma;
      }).map(function(obj){
        return obj.id_turma;
      }).sort();
      
      return turmas;
    }

    return false;
  }
});

Template.montaAula.helpers({
  getAula: function(id_turma, periodo, dia){
    var gp = GradesProcessadas.findOne({_id: Iron.controller().params._id });
    var aula = _.filter(gp.result.aulas, function(obj){
      return obj.id_turma === id_turma && obj.periodo === periodo && obj.dia_semana === dia;
    });
    return _.first(aula);
  }
});

Template.gradesSolicitadas.events({
  'click .remove': function(){
    Meteor.call("deleteGradeProcessada", this._id, function(error, result){
      if(error){
        Flash.danger("Falha ao remover registro!");
      }
      if(result){
        Flash.success("Registro removido com sucesso!");
      }
    });
  }
});
