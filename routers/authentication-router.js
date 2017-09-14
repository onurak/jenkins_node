var express 	= require('express');
var router 		= express.Router();
var worker 		= require(__base + 'workers/authentication-worker');


router.post('/', function (req, res) {
    worker.authenticate(req.body.username, req.body.password, function(data) {
        res.status(200).send(data);
    });
});

module.exports = router;