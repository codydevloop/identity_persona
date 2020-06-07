
const express = require("express");
const router = express.Router();

router.get("/jobsearch", async (req, res) => {
    res.render("jobsearchandresults");
});

  module.exports = router;