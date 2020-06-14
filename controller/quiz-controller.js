const express = require("express");
const router = express.Router();
const db = require("../models");
require("dotenv").config();
const axios = require("axios").default;

// Quiz
router.get("/api/quiz", async (req, res) => {
    // quiz page
});

router.get("/api/quiz-l&d", async (req, res) => {
    // Quiz likes and dislikes
    // inspect post body
});

router.get("/api/quiz-l&d/:id", async (req, res) => {
    // Quiz likes and dislikes by id
    // inspect post body
});

router.get("/api/quiz-recommendations", async (req, res) => {
    // Quiz recommendations
    // call to api with quiz results
});


// on movie search button click

router.get("/test/searchTMDB/:name", function (req, res) {
  let cody = {
      code1: "works great",
      code2: "makes me happy"
  };

  res.render("moviedefault", cody);
  return "Success";
});

router.get("/api/searchTMDB/:name", async (req, res) => {
    // make userSearchTearm search
    let searchTerm = req.params.name;


    const rows = await  
        axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        }).then(function (res) {

   
            // ******************************************** */
            // ** now get a list of movies in the same genre
            // genre id from search
            let genre = res.data.results[0];
           // console.log(genre);

            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
    
            }).then(function (response) {
                return response;
            });  

         return res;

        });   
        //call the genre search
        //
        let tenResults = [{rocks: "yes"}];
        // for (let i =0; i<10; i++){
        //     fiveResults.push(rows.data.results[i]);
        // }
        //console.log(fiveResults);
        res.render("moviedefault" , { cody: tenResults });
        
        // console.log(rows.data);

  
});

// Delete quiz likes and dislikes
router.delete("/api/likes&dislikes/:id", async (req, res) => {
   // delete from db
});
 


module.exports = router;