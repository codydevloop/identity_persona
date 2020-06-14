
const express = require("express");
const router = express.Router();
const db = require("../models");
require("dotenv").config();
const axios = require("axios").default;


router.get("/movies", async (req, res) => {
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

    let tenResults = [];
    for (let i = 0; i < 4; i++) {
        tenResults.push(genres.data.results[i]);
    }
    //console.log(tenResults);

    res.render("index", { results: tenResults });  // ajax hijacks render
});

module.exports = router;







// router.get("/api/searchTMDB/:name", async (req, res) => {
//     // make userSearchTearm search
//     let searchTerm = req.params.name;


//     const data = await
//         axios({
//             method: "GET",
//             url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&query=${searchTerm}&page=1&include_adult=false`

//         });





//     let genre = data.data.results[0].genre_ids[0];

//     // console.log(genre);

//     const genres = await
//         axios({
//             method: 'GET',
//             url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`

//         });
    // console.log(genres);
    //call the genre search
    //

    // let tenResults = [];
    // for (let i = 0; i < 4; i++) {
    //     tenResults.push(genres.data.results[i]);
    // }
    // console.log(tenResults);

    // res.render("moviedefault", { data: tenResults });  // ajax hijacks render




    // send ten Results to /

    // send all results to jenreDBobj
    //console.log(fiveResults);
    // console.log(rows.data);

// });

//module.exports = genreDBObj;

