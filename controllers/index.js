const router = require('express').Router;

const apiRoutes = require('./api');


router.use('/api', apiRoutes);

router.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>")
  });

module.exports = router;