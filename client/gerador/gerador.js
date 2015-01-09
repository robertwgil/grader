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
  aulasGradeGrouped: function(idGrade){
    var aulas = AulasGrade.find({id_grade: idGrade}).fetch();
    var grouped = _.groupBy(aulas, function(item){
      return item.id_professor;
    });
    return _.keys(grouped);
  }
});

Template.panelByProfessor.helpers({
  aulasGradeByProfessor: function(idProfessor, idGrade){
    return AulasGrade.find({id_professor: idProfessor, id_grade: idGrade});
  },
  printCapacity: function(idProfessor, idGrade){
    var countTotal = _.size(Professores.findOne({_id: idProfessor}).disponibilidade);
    return countUsado(idProfessor, idGrade) + " / " + countTotal;
  }
});

Template.aula.helpers({
  nomeTurma: function(_id){
    var n = Turmas.findOne({_id: _id});
    return n != null ? n.name : '_';
  }
});

function countUsado(idProfessor, idGrade){
  var aulas = AulasGrade.find({id_professor: idProfessor, id_grade: idGrade}).fetch();
  var countUsado = 0;
  _.each(aulas, function(aula){
    countUsado += aula.qtd_aulas;
  });
  return countUsado;
}

function countTotalDisponivel(idProfessor){
  return _.size(Professores.findOne({_id: idProfessor}).disponibilidade);
}

//
//  EVENTS
//
Template.geradorSide.events({
  "click .addAula": function(event, template){

    var idGrade = Iron.controller().params._id;

    if(countTotalDisponivel(this._id) == countUsado(this._id, idGrade) ){
      Flash.danger("Todas aulas já alocadas para este professor");
      return;
    }

      var aula = {
        id_grade: idGrade,
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

    // Se estiver aumentando o numero de aulas
    if(qtd == 2){

      if(countTotalDisponivel(this.id_professor) == countUsado(this.id_professor, this.id_grade) ){
        Flash.danger("Todas aulas já alocadas para este professor.");
        return;
      }

      var aulaGrade = AulasGrade.findOne({_id: this._id});
      if(!checaStotDisponivel(aulaGrade._id, aulaGrade.id_turma, 2)){
        return;
      }

    }

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

    if(id != ''){ // Setar a disciplina
      AulasGrade.update({_id: this._id}, {$set: {id_disciplina: id}});

    } else {  // Setar a Truma
      idTurma = event.originalEvent.dataTransfer.getData('id_turma');

      if(checaStotDisponivel(this._id, idTurma)){
        AulasGrade.update({_id: this._id}, {$set: {id_turma: idTurma}});
      }

    }
  }

});

function checaStotDisponivel(idAulaGrade, idTurma, nMoreAulas){

  var aulaGrade = AulasGrade.findOne({_id: idAulaGrade});

  // Inicia com o professor que estou querendo adicionar
  var professoresToTurma = [aulaGrade.id_professor];

  var idGrade = aulaGrade.id_grade;
  var usedSlotsByTurma = AulasGrade.find({id_grade: idGrade, id_turma: idTurma}).fetch();
  var usedSlotsByTurma = _.reduce(usedSlotsByTurma, function(last, curr){
    professoresToTurma.push(curr.id_professor);

    // Para a mesma aula nao conta
    if(curr._id == aulaGrade._id){
      return last;
    }

    return last + curr.qtd_aulas;
  }, 0);


  professoresToTurma = _.uniq(professoresToTurma);
  professoresToTurma = Professores.find({_id: {$in: professoresToTurma}}).fetch();

  var count = _.chain(professoresToTurma)
  .map(function(obj){ return obj.disponibilidade; })
  .flatten()
  .uniq(function(obj){ return obj.dia + '' + obj.periodo; })
  .value();

  var moreAulas = nMoreAulas !== undefined ? nMoreAulas : aulaGrade.qtd_aulas;

  if(usedSlotsByTurma > 0 && (usedSlotsByTurma + moreAulas) > count.length) {
    Flash.danger("Sem slots disponíveis.");
    return false;
  }

  return true;
}

Template.gerador.events({
  "click #gerarGrade": function(event, template){

    var idGrade = $(event.target).attr('grade');

    Meteor.call("processarGrade", idGrade, function(error, idGradeProcessada){
      Router.go('viewGrade', {_id: idGradeProcessada});
    });

  }
});
