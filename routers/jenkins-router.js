var express     = require('express');
var router      = express.Router();
var worker      = require(__base + 'workers/jenkins-worker');


router.post('/', function (req, res, next) {
    worker.build(req.body, function(data) {
        res.status(200).send(data);
    });
});

module.exports = router;