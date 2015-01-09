//
// HELPERS
//

Template.gradeList.helpers({
  listarGrades: function(){
    return Grades.find({});
  },

  fieldsTable: function(){
    return [
  { key: 'name', label: 'Nome' },
{ key: 'year', label: 'Ano' },
{ key: 'semester', label: 'Semestre' },
{ label: '', tmpl: Template.geradorButtonInTable },
{ label: '', tmpl: Template.editButtonInTable },
{ label: '', tmpl: Template.removeButtonInTable }
]
}

});

Template.gradeFormEdit.helpers({
  getGradeToEdit: function(){
    return Grades.findOne({_id: Iron.controller().params._id});
  }
});


//
// EVENTS
//

Template.gradeList.events({
  'click .edit': function(){
    Router.go('gradeFormEdit', {_id: this._id});
  },
  'click .remove': function(){
    Meteor.call("deleteGrade", this._id, function(error, result){
      if(error){
        Flash.danger("Falha ao remover registro!");
      }
      if(result){
        Flash.success("Registro removido com sucesso!");
      }
    });
  },
  'click .openGerador': function(){
    Router.go('gerador', {_id: this._id});
  }
});


//
// FORM HOOKS
//

AutoForm.addHooks(['insertGradeForm', 'insertGradeFormEdit'], {
  after: {
    insert: function(error, result) {
      if (error) {
        Flash.danger("Falha ao salvar registro");
      } else {
        Flash.success("Registro salvo com sucesso!");
        Router.go('gerador', {_id: result});
      }
    },
    update: function(error) {
      if (error) {
        Flash.danger("Falha ao salvar registro");
      } else {
        Flash.success("Registro salvo com sucesso!");
      }
    }
  }
});
