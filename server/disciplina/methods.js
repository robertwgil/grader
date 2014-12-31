Meteor.methods({
  deleteDisciplina:function(id){
    return Disciplinas.remove({_id: id});
  }
});
