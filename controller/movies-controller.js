const express = require("express");
const router = express.Router();
const db = require("../models");
const axios=require("axios")

router.post("/api/movies", async (req, res) => {
   var name=req.body.name
   var APIkey="53c033113c3ac5340800893d77220531"
   var data=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=53c033113c3ac5340800893d77220531&language=en-US&query=${name}&page=1&include_adult=false`)
  console.log(data)
});

  module.exports = router;