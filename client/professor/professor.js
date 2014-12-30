//
// HELPERS
//

Template.professorList.helpers({
  listarProfessores: function(){
    return Professores.find({});
  },

  fieldsTable: function(){
    return [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'sexo', label: 'Sexo' },
      { label: '', tmpl: Template.editButtonInTable },
      { label: '', tmpl: Template.removeButtonInTable }
    ]
  }

});

Template.professorFormEdit.helpers({
  getProfessorToEdit: function(){
    return Professores.findOne({_id: Iron.controller().params._id});
  }
});


Template.professorHorario.helpers({
  isChecked: function(dia, periodo){
    var p = Professores.findOne({_id: Iron.controller().params._id});
    var disp = p.disponibilidade;
    return _.findWhere(disp, {dia: dia, periodo: periodo});
  }
});


//
// EVENTS
//


Template.professorList.events({
  'click .edit': function(){
    Router.go('professorFormEdit', {_id: this._id});
  },
  'click .remove': function(){
    Meteor.call("deleteProfessor", this._id, function(error, result){
      if(error){
        Flash.danger("Falha ao remover registro!");
      }
      if(result){
        Flash.success("Registro removido com sucesso!");
      }
    });
  }
});


Template.professorHorario.events({
  "submit form": function(event, template){
     event.preventDefault();

     var disps = [];
     var varx =  template.findAll(':checkbox:checked');
     _.each(varx, function(check){
       disps.push({dia: check.value, periodo: $(check).attr('p')});
     });

     var where = {_id: Iron.controller().params._id};
     Professores.update(where, { $set: { "disponibilidade" : disps } });
     Flash.success('flashHorarios', "Registro salvo com sucesso!");

     return false;
  }
});


//
// FORM HOOKS
//

AutoForm.addHooks(['insertProfessorForm', 'insertProfessorFormEdit'], {
  before: {
    insert: function(doc){

      var periodos = [1,2];
      var all = [];
      _.each(diasSemana, function(diaSemana){
        _.each(periodos, function(periodo){
          all.push({dia: diaSemana.key, periodo: periodo})
        })
      });

      doc.disponibilidade = all;

      return doc;
    }
  },
  after: {
    insert: function(error, result) {
      if (error) {
        Flash.danger("Falha ao salvar registro");
      } else {
        Flash.success("Registro salvo com sucesso!");
        Router.go('professorFormEdit', {_id: result})
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
