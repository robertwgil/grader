//
// HELPERS
//

Template.turmaList.helpers({
  listarTurmas: function(){
    return Turmas.find({});
  },

  fieldsTable: function(){
    return [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { label: '', tmpl: Template.editButtonInTable },
      { label: '', tmpl: Template.removeButtonInTable }
    ]
  }

});

Template.turmaFormEdit.helpers({
  getTurmaToEdit: function(){
    return Turmas.findOne({_id: Iron.controller().params._id});
  }
});

//
// EVENTS
//


Template.turmaList.events({
  'click .edit': function(){
    Router.go('turmaFormEdit', {_id: this._id});
  },
  'click .remove': function(){
    Meteor.call("deleteTurma", this._id, function(error, result){
      if(error){
        Flash.success("Falha ao remover registro!");
      }
      if(result){
        Flash.success("Registro removido com sucesso!");
      }
    });
  }
});

//
// FORM HOOKS
//

AutoForm.addHooks(['insertTurmaForm', 'insertTurmaFormEdit'], {
  after: {
    insert: function(error, result) {
      if (error) {
        Flash.danger("Falha ao salvar registro");
      } else {
        Flash.success("Registro salvo com sucesso!");
        Router.go('turmaFormEdit', {_id: result})
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
