Meteor.methods({
  deleteProfessor:function(id){
    return Professores.remove({_id: id});
  }
});
