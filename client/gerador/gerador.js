//
//  HELPERS
//

Template.geradorSide.helpers({
  professores: function(){
    return Professores.find({});
  },
  disciplinas: function(){
    return Disciplinas.find({});
  },
  turmas: function(){
    return Turmas.find({});
  }
});

Template.gerador.helpers({
  grade: function(){
    return Grades.findOne({_id: Iron.controller().params._id});
  },
  aulasGradeGrouped: function(){
    var aulas = AulasGrade.find({}).fetch();
    var grouped = _.groupBy(aulas, function(item){
      return item.id_professor;
    });
    return _.keys(grouped);
  }
});

Template.panelByProfessor.helpers({
  nomeProfessor: function(id){
    return Professores.findOne({_id: id}).name;
  },
  aulasGradeByProfessor: function(id){
    return AulasGrade.find({id_professor: id});
  }
});

Template.aula.helpers({
  nomeDisciplina: function(_id){
    var n = Disciplinas.findOne({_id: _id});
    return n != null ? n.name : '_';
  },
  nomeTurma: function(_id){
    var n = Turmas.findOne({_id: _id});
    return n != null ? n.name : '_';
  }
});


//
//  EVENTS
//
Template.geradorSide.events({
  "click .addAula": function(event, template){
      var aula = {
        id_grade: Iron.controller().params._id,
        id_professor: this._id,
        qtd_aulas: 1
      }
      AulasGrade.insert(aula);
  },
  "dragstart .liDisciplina": function(event, template){
    event.originalEvent.dataTransfer.setData('id_disciplina', this._id);
  },
  "dragstart .liTurma": function(event, template){
    event.originalEvent.dataTransfer.setData('id_turma', this._id);
  }
});

Template.aula.events({
  "click .badge": function(event, template){
    var qtd = this.qtd_aulas == 1 ? 2 : 1;
    AulasGrade.update({_id: this._id}, {$set: {qtd_aulas: qtd}});
  },
  'click .removerAula': function(){
    AulasGrade.remove({_id: this._id});
  },
  "dragover .ulAula": function(event, template){
    event.preventDefault();
  },
  "drop .ulAula": function(event, template){
    var id = event.originalEvent.dataTransfer.getData('id_disciplina');
    if(id != ''){
      AulasGrade.update({_id: this._id}, {$set: {id_disciplina: id}});
    } else {
      id = event.originalEvent.dataTransfer.getData('id_turma');
      AulasGrade.update({_id: this._id}, {$set: {id_turma: id}});
    }
  }

});
