var subs = new SubsManager({
  // maximum number of cache subscriptions
  cacheLimit: 10,
  // any subscription will be expire after 5 minute, if it's not subscribed again
  expireIn: 5
});

Router.configure({
  layoutTemplate: 'layout',
  progressDelay : 100
});

Router.map(function(){

  var requireLogin = function() {
    if (! Meteor.user()) {
      Router.go("login")
    } else {
      this.next();
    }
  }

  Router.onBeforeAction(requireLogin, {except: ['enroll', 'forgotPassword', 'login', 'reset', 'verify']});

  this.route('login', {
    path: '/login',
    layoutTemplate: 'login',
    onBeforeAction: function(){
      if (Meteor.user()) {
        Router.go("home")
      } else {
        this.next();
      }
    }
  });

  this.route('home', {path: '/', data: {title: 'Home'} });


  // ################
  // PROFESSOR
  // ################
  this.route('professorForm', {path: 'professor/novo', data: {title: 'Adicionar Professor'}});

  this.route('professorFormEdit', {
    path: 'professor/editar/:_id',
    data: {title: 'Editar Professor'}
  });

  this.route('professorList', {
    path: 'professor/listar',
    data: {title: 'Listagem de Professores'},
    waitOn: function(){
      subs.subscribe('professores');
    }
  });


  // ################
  // TURMA
  // ################
  this.route('turmaForm', {path: 'turma/nova', data: {title: 'Adicionar Turma'}});

  this.route('turmaFormEdit', {
    path: 'turma/editar/:_id',
    data: {title: 'Editar Turma'}
  });

  this.route('turmaList', {
    path: 'turma/listar',
    data: {title: 'Listagem de Turmas'},
    waitOn: function(){
      subs.subscribe('turmas');
    }
  });

  // ################
  // DISCIPLINA
  // ################
  this.route('disciplinaForm', {path: 'disciplina/nova', data: {title: 'Adicionar Disciplina'}});

  this.route('disciplinaFormEdit', {
    path: 'disciplina/editar/:_id',
    data: {title: 'Editar Disciplina'}
  });

  this.route('disciplinaList', {
    path: 'disciplina/listar',
    data: {title: 'Listagem de Disciplina'},
    waitOn: function(){
      subs.subscribe('disciplinas');
    }
  });


});
