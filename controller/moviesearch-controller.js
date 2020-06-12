
const express = require("express");
const router = express.Router();
const axios = require('axios').default;
require('dotenv').config();


//entry into test area

// a route to display homepage and kick off front end testing
router.get("/moviesearch", (req, res) => {
    res.render("moviedefault");
});

// 1st call from user,  we need the genre id from this to performa a genre api search

router.get("/api/similarmovies/:movie", async (req, res) => {


    let searchTerm = req.params.movie;


    const rows = await  
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        }).then(function (response) {

    //         //******************************************** */
    //         // ** now get a list of movies in the same genre
    //         // genre id from search
    //         // let genre = response.data.results[0];
    //         // let genre1 = response.data.results[1];
    //         // console.log(genre);
    //         // console.log(genre1);
    //         // axios({
    //         //     method: 'GET',
    //         //     url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
    
    //         // }).then(function (response) {
    //         //     return response;
    //         // });  
    //         console.log("api good");
         //return response;
         res.render("moviedefault");
        });   


    //console.log(rows.data);
   
    
});
 






// router.get("/displaysearchresults", async (req, res) => {

//     res.render("moviehomepage");
// });


// const getGenre = (searchTerm) =>{
//     axios({
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
//     }).then(function (response) {
//         console.log("Genre");
//         return response.data.results[0].genre_ids[0];
//     });
// };

// const getDiscover = (genre) => {
//     axios({
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`

//     }).then(function (response) {
//         return response;
//     });  
// }

module.exports = router;
