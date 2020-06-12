const express = require("express");
const router = express.Router();
const axios = require('axios').default;
require('dotenv').config();



//hardcoded search term  - eliminated user input for now

router.get("/testmoviesearch", async (req, res) => {
    const rows = await  

        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`

        }).then(function (response) {

            return response;
        });   

    let fiveResults = [];
    for (let i =0; i<5; i++){
        fiveResults.push(rows.data.results[i]);
    }
    //console.log(fiveResults);
    res.render("moviehomepage" , { movies: fiveResults });

});



module.exports = router;