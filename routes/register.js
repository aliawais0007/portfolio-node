var express = require("express");
var router = express.Router();

router.post('/', function (req, res) {
    res.send('register router');
});
router.post('/', function (req, res) {
    res.send('register Get router');
});

module.exports = router;