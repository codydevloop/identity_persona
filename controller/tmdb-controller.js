
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
            url: `https://api.themoviedb.org/3/movie/${movie}?api_key=030e18c98f251ca915449d70a8c436cf&language=en-US`

        });
    // console.log(fulldetails.data);
    res.json(fulldetails.data);
    // res.json(fulldetails);
});

router.get("/api/movies", async (req, res) => {
    // console.log(req.user.dataValues.email);
    const searchTerm = req.query.name;

    const data = await
        axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?api_key=030e18c98f251ca915449d70a8c436cf&language=en-US&query=${searchTerm}&page=1&include_adult=false`

        });
    //updated to targed movie id
    let movieid = data.data.results[0].id;
    // console.log(movieid);
   

    // console.log(movieid);

    const recomemndations = await
        axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${movieid}/recommendations?api_key=030e18c98f251ca915449d70a8c436cf&language=en-US&page=1`

        });
    // console.log(genres);
    //call the genre search
    console.log(recomemndations);

    //
    // reduces the result to managable size and adds poster path prefix
    let tenResults = [];
    for (let i = 0; i < 8; i++) {

        tenResults.push(recomemndations.data.results[i]);
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

router.get("/api/userlikes", async (req, res)=>{

 
    // console.log(req.query.email);


    const data = await db.moviesdbs.findAll({
        where: {
            email: req.query.email
        },
        include: [db.likes]
      });


    // for (let i = 0; i < data.length; i++){
    
    //     console.log(data[i].action);
    // }



  
     res.render("displaylike", { movie: data } );
  });

module.exports = router;









 

