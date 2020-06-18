const express = require("express");
const router = express.Router();
const db = require("../models");
require("dotenv").config();



router.post("/api/likes", async (req, res) =>{

    // passport.authenticate("jwt", { session: false }),
    // console.log(req.body);
    const data = await db.likes.create(req.body);
  
    res.json(data);

});
 


module.exports = router;