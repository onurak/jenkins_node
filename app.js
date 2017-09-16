var express         = require("express");
var session         = require('express-session');
var bodyParser      = require("body-parser");
var cookieParser    = require("cookie-parser");
var morgan          = require('morgan');
var helmet          = require("helmet");
var path            = require("path");
var csrf            = require('csurf');
var mongoose        = require('mongoose');

global.__base       = __dirname + '/';
global.conf         = require('./config/local.json');	
//global.conf = require('./config/' + process.env.PRANAGEO_ENV + '.json');   
global.jenkins      = require('jenkins')({ baseUrl: global.conf.jenkins, crumbIssuer: true });


mongoose.connect(global.conf.mongo);


var applicationRouter     = require(__base + 'routers/application-router');	
var deployRouter          = require(__base + 'routers/deploy-router');	
var serverRouter          = require(__base + 'routers/server-router'); 
var userRouter            = require(__base + 'routers/user-router');
var authenticationRouter  = require(__base + 'routers/authentication-router'); 
var jenkinsRouter         = require(__base + 'routers/jenkins-router'); 

//mongoose.connect(database.url);

var app = express();
app.use(express.static(__dirname + "/public"));

app.use(morgan(':req[x-forwarded-for] - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

app.use(helmet());
app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(helmet.frameguard('deny'));
app.use(helmet.hsts({maxAge: 7776000000, includeSubdomains: true}));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.noCache());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var authenticationWorker  = require(__base + 'workers/authentication-worker');
function isAuthenticated(req, res, next) {

  var token = req.headers['x-access-token'];
  if(token) {

    authenticationWorker.verifyToken(token, function(data) {
      if(data.success) {
        req.user = data;
        return next();
      } else {
        return res.status(403).send({ 
                  success: false, 
                  data: {},
                  message: data.message 
              });
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        data: {},
        message: 'No token provided.' 
    });
  }
}

// removes XSS header since nginx puts it as default.
app.use(function (req, res, next) {
    res.removeHeader('X-XSS-Protection');
    next();
});

//app.use('/', authRouter);
app.use('/api/users', isAuthenticated, userRouter);
app.use('/api/servers', isAuthenticated, serverRouter);
app.use('/api/deploys', isAuthenticated, deployRouter);
app.use('/api/applications', isAuthenticated, applicationRouter);
app.use('/api/jenkins', isAuthenticated, jenkinsRouter);
/*
app.use('/api/users', userRouter);
app.use('/api/servers', serverRouter);
app.use('/api/deploys', deployRouter);
app.use('/api/applications', applicationRouter);
*/

app.use('/api/authenticate', authenticationRouter);


app.get('/*', function (req, res) {
    console.log(req.path)
    var p = path.join(__dirname, "public/views", 'index.html');
    res.sendFile(p);
});
    

app.listen(8888);
console.log('app started');


// var log = global.jenkins.build.logStream('example', 1);

// log.on('data', function(text) {
//   process.stdout.write(text);
// });

// log.on('error', function(err) {
//   console.log('error', err);
// });

// log.on('end', function() {
//   console.log('end');
// });

