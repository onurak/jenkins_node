global.conf         = require('./config/local.json');	
//global.conf = require('./config/' + process.env.PRANAGEO_ENV + '.json');   
global.jenkins      = require('jenkins')({ baseUrl: global.conf.jenkins, crumbIssuer: true });

global.jenkins.job.build('TestJob', function(err, data) {
  if (err){ 
    console.log(err); 
  } else {
      console.log(data);
  }
}); 