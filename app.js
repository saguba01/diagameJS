var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var expresshbs = require('express-handlebars');
var hbsHelper = require('./utils/hbs-hepler');
var firestore = require('./configs/firebase-config').firestore; //test firebase

var app = express();

//const firestore = require('./configs/firebase-config').firestore;

// set application global config
var configString = {
  'en': {
    general: require('./string/general.en'),
    element: {
      general: require('./element/element.en'),
      variable: require('./element/element-variable.en'),
      io: require('./element/element-io.en'),
      decision: require('./element/element-decision.en')
    },
    question:{
      operator: require('./string/question-operator'),
      logic: require('./string/question-logic.en')
    },
    error: require('./string/error-message.en'),
    lesson: require('./string/lesson.en'),
    intro: require('./string/intro-message.en'),
    achievement: require('./string/achievement.en'),
    recipe: require('./string/recipe.en')
  },
  'th': {
    general: require('./string/general.th'),
    element: {
      general: require('./element/element.th'),
      variable: require('./element/element-variable.th'),
      io: require('./element/element-io.th'),
      decision: require('./element/element-decision.th')
    },
    question:{
      operator: require('./string/question-operator'),
      logic: require('./string/question-logic.th')
    },
    error: require('./string/error-message.th'),
    lesson: require('./string/lesson.th'),
    intro: require('./string/intro-message.th'),
    achievement: require('./string/achievement.th'),
    recipe: require('./string/recipe.th')
  }
};
exports.configString = configString;

app.use(favicon(path.join(__dirname, 'public', 'images', 'diagame.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', expresshbs({
  extname: 'html',
  defaultView: 'default',
  layoutsDir: path.join(__dirname, 'views', 'shared'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'html');

app.use(logger('dev'));
// compress all requests
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// express session
app.set('trust proxy', 1);
app.use(session({
  secret: 'diagame',
  resave: true,
  saveUninitialized: true
}));
// set static path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'configs')));

// register route config
app.use('/', require('./routes/route-login'));
app.use('/api', require('./routes/route-api'));
app.use('/home', require('./routes/route-home'));
app.use('/admin', require('./routes/route-admin'));
app.use('/lesson/decision', require('./routes/route-decision'));
app.use('/lesson/io', require('./routes/route-io'));
app.use('/lesson/logic', require('./routes/route-logic'));
app.use('/lesson/loop', require('./routes/route-loop'));
app.use('/lesson/operator', require('./routes/route-operator'));
app.use('/lesson/variable', require('./routes/route-variable'));
app.use('/report', require('./routes/route-report'));
app.use('/add/logic', require('./routes/route-logicQuestion'));
app.use('/MDQ', require('./routes/route-diagram-question'));
app.use('/show_feedback', require('./routes/route-feedback'));
app.use('/leaderboard',require('./routes/route-leaderboard'));
//app.use('/report', require('./routes/route-report'));
app.use('/add/diagram', require('./routes/route-diagram-question'));
app.use('/tutorial', require('./routes/route-tutorial'));
app.use('/report', require('./routes/route-report'));

app.use('/lang', function (req, res, next) {
  var lang = req.query.lang;
  if (lang) {
    req.session.lang = lang;
  } else {
    req.session.lang = 'en';
  }
  res.redirect('/home');
});

app.get('/api-service', function (req, res, next) {
  let data = firestore.collection('Logic')
  // let subdata = data.doc(data.listDocuments(0)).collection('Answers')
  data.get().then((doc)=>{
    let arr = []
      doc.forEach(element => {
          arr.push({
            id : element.id,
            data : element.data()
          })
      });
      res.send(arr);
    });
  });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('shared/error');
});



module.exports = app;
app.listen(5000);