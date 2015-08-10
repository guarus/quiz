var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con quizId
router.param('quizId', quizController.load); // autoload :quizId

// Definición de las rutas /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz' });
});

module.exports = router;
