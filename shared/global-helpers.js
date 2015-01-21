UI.registerHelper("setTitle", function() {
  var title = "";
  for (var i = 0; i < arguments.length - 1; ++i) {
    title += arguments[i];
  }
  document.title = title;
});

UI.registerHelper("nomeProfessor", function(id){
  return Professores.findOne({_id: id},{name: 1}).name;
});

UI.registerHelper("nomeDisciplina", function(_id){
  var n = Disciplinas.findOne({_id: _id},{name: 1});
  return n != null ? n.name : '_';
});

UI.registerHelper("nomeTurma", function(id){
  return Turmas.findOne({_id: id},{name: 1}).name;
});

UI.registerHelper("dateTime", function(date){
  if(date){
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
});

UI.registerHelper("date", function(date){
  if(date) {
    return moment(date).format('DD/MM/YYYY');
  }
});
