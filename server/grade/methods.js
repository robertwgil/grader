Meteor.methods({
  deleteGrade:function(id){
    return Grades.remove({_id: id});
  },

  processarGrade: function(idGrade){
    this.unblock();

    try {
      //HTTP.post('http://www.mocky.io/v2/54a6fabda6e7cace07d36ae8');
      return true;
    } catch (e) {
      return false;
    }

  }
});
