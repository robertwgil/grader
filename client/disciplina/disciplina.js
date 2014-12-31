//
// HELPERS
//

Template.disciplinaList.helpers({
  listar: function(){
    return Disciplinas.find({});
  },

  fieldsTable: function(){
    return [
  { key: 'name', label: 'Nome' },
{ label: '', tmpl: Template.editButtonInTable },
{ label: '', tmpl: Template.removeButtonInTable }
]
}

});

Template.disciplinaFormEdit.helpers({
  getToEdit: function(){
    return Disciplinas.findOne({_id: Iron.controller().params._id});
  }
});

//
// EVENTS
//


Template.disciplinaList.events({
  'click .edit': function(){
    Router.go('disciplinaFormEdit', {_id: this._id});
  },
  'click .remove': function(){
    Meteor.call("deleteDisciplina", this._id, function(error, result){
      if(error){
        Flash.danger("Falha ao remover registro!");
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

AutoForm.addHooks(['disciplinaForm', 'disciplinaFormEdit'], {
  after: {
    insert: function(error, result) {
      if (error) {
        Flash.danger("Falha ao salvar registro");
      } else {
        Flash.success("Registro salvo com sucesso!");
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
