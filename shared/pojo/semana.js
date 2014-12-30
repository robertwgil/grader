diasSemana = [
  {key: 1, value: i18n('semana.segunda')},
  {key: 2, value: i18n('semana.terca')},
  {key: 3, value: i18n('semana.quarta')},
  {key: 4, value: i18n('semana.quinta')},
  {key: 5, value: i18n('semana.sexta')}
]

if(Meteor.isClient){
  Template.registerHelper('diasSemana', function(){
    return diasSemana;
  });
}
