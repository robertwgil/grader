Meteor.methods({
  deleteGrade:function(id){
    return Grades.remove({_id: id});
  },

  processarGrade: function(idGrade){

    var aulas = AulasGrade.find({'id_grade': idGrade}).fetch();

    var rq = {
      aulas : [],
      professores: []
    }

    // Aulas
    _.each(aulas, function(aula){

      if(! _.contains(rq.professores, aula.id_professor)){
        rq.professores.push(aula.id_professor);
      }

      _.times(aula.qtd_aulas, function(){
        rq.aulas.push({
          "disciplina": aula.id_disciplina,
          "professor": aula.id_professor,
          "turma": aula.id_turma
        });
      });


    });


    // Professores
    rq.professores = _.map(rq.professores, function(obj){
      var p = Professores.findOne({_id: obj});

      var r = {
        "id": p._id
      }

      r.periodos = _.map(p.disponibilidade, function(obj){
        return {
          "diaSemana": obj.dia,
          "periodo": obj.periodo
        }
      });

      return r;
    });

    try {

      var idGradeProcessada = GradesProcessadas.insert({id_grade: idGrade});

      rq.idgradeprocessada = idGradeProcessada;

      this.unblock();

      HTTP.post('http://localhost:8080/grader-server/api/grader/process', {data: rq}, function(){
        console.log("Finished process");
      });

      return idGradeProcessada;
    } catch (e) {
      return false;
    }

  }
});
