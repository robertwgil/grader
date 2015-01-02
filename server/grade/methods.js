Meteor.methods({
  deleteGrade:function(id){
    return Grades.remove({_id: id});
  }
});
