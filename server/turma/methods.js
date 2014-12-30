Meteor.methods({
  deleteTurma:function(id){
    return Turmas.remove({_id: id});
  }
});
