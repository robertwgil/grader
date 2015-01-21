Meteor.methods({
  deleteGradeProcessada:function(id){
     return GradesProcessadas.remove({_id: id});
  },
  deleteTurma:function(id){
    return Turmas.remove({_id: id});
  },
  deleteProfessor:function(id){
    return Professores.remove({_id: id});
  },
  deleteDisciplina:function(id){
    return Disciplinas.remove({_id: id});
  }
});
