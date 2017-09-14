var express     = require('express');
var router      = express.Router();
var worker      = require(__base + 'workers/user-worker');


router.get('/', function (req, res, next) {
    worker.getAll(function(data) {
        res.status(200).send(data);
    });
});


router.get('/:key', function (req, res, next) {
    worker.get(req.params.key, function(data) {
        res.status(200).send(data);
    });
});


router.post('/', function (req, res, next) {
    worker.save(true, req.body, function(data) {
        res.status(200).send(data);
    });
});


router.put('/', function (req, res, next) {
    worker.save(false, req.body, function(data) {
        res.status(200).send(data);
    });
});


router.delete('/:key', function (req, res, next) {
    worker.delete(req.params.key, function(data) {
        res.status(200).send(data);
    });
});

module.exports = router;