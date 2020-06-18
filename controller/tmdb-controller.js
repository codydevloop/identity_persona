
const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const db = require("../models");
// const passport = require("passport");

router.get("/api/email", (req, res)=>{
    res.send(req.user.email);
});

router.get("/api/fullmovie/:movie", async (req, res)=>{
    let movie = req.params.movie;
    // let searchTerm = 80;

    const fulldetails = await
        axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY_TMDB}&language=en-US`

        });
    // console.log(fulldetails.data);
    res.json(fulldetails.data);
    // res.json(fulldetails);
});

// two calls to TMDB - one list of genres sent to handbars for display
router.get("/api/movies", async (req, res) => {
    // console.log(req.user.dataValues.email);
    const searchTerm = req.query.name;

    const data = await
        axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&query=${searchTerm}&page=1&include_adult=false`

        });

    let genre = data.data.results[0].genre_ids[0];

    // console.log(genre);

    const genres = await
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`

        });
    // console.log(genres);
    //call the genre search
    //
    // reduces the result to managable size and adds poster path prefix
    let tenResults = [];
    for (let i = 0; i < 6; i++) {

        tenResults.push(genres.data.results[i]);
        tenResults[i].poster_path ="http://image.tmdb.org/t/p/w154"+tenResults[i].poster_path;
    }

    // create groups of four,  logic needed for Carousel slides
    let sortFour1 = [0, 1, 2, 3];

    // combine  (results & logic) into a readable Handlebars object
    let tenResultsObj = {
        sample: tenResults,
        test1: sortFour1
    };


    // console.log(tenResults);
    //console.log("User info: " +req.user);

    res.render("index", { results: tenResultsObj });  // ajax hijacks render
});

router.post("/api/moviesdb", async (req, res)=>{
    const data = await db.moviesdbs.create(req.body);
  
    res.json(data);
});

router.get("/api/userlikes/:email", async (req, res)=>{
    let email = req.params.email;
    // const query = {
    //   userEmail: email
    // };

    const data = await db.likes.findAll({
        where: {
            userEmail: email
        },
        include: [db.moviesdbs]
      });
  
     res.json(data);
  });

module.exports = router;