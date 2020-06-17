



$(document).ready(function () {

  // Get references to page elements
  let $exampleText = $("#example-text");
  let $exampleDescription = $("#example-description");
  let $submitBtn = $("#submit");
  let $exampleList = $("#example-list");
  let $findMovie = $("#find-movie");

  let $homeButton = $("#homebutton");
  let $dislikesButton = $("#dislikesbutton");
  let $likesButton = $("#likesbutton");
  let $watchListButton = $("#watchlistbutton");

  let $buttonTypeAndData = $(".buttontype");



  // The API object contains methods for each kind of request we'll make
  var API = {

    //Esme -- performs call to controller to perfrm tmdb search and returns movie object


    GETmovies: function (name) {
      window.location.href = `/api/movies?name=${name}`;
    },
    // make call to TMDB to get full details
    postMovies: function (movie){
      $.ajax("/api/fullmovie/" +movie ,{
        type: "GET"
      }).then(function (response) {

        let data = {
          movieId: response.id,
          poster: `http://image.tmdb.org/t/p/w154${response.posterPath}`,
          overview: response.overview,
          title: response.title,
          homepage: response.homepage
        }

          $.ajax("/api/moviesdb/", {
            type: "POST",
            data: data
          }).then(
            console.log("posted to Movie DB")
          )
      })  

      
    },

    postLikes: function (table, movie) {

      // ## get the user name, then post information to Like Table
      $.ajax("/api/email/", {
        type: "GET"
      }).then(function (response) {

        let data = {
          table: table,
          movieId: movie,
          userEmail: response
        };
        // post to likes table
          $.ajax("/api/likes/", {
            type: "POST",
            data: data
          }).then(
            console.log("posted to Likes table")
          )
      })  
    },

    // saveLikes: function ()

    // Start Danyal expamples
    // 
  };
  //##################################
  //############### Project #2 class defined
  //##################################
  function determineButton() {
    event.preventDefault();
    let tableIdentifier = $(this).attr("data-buttontype");
    let movieIdentifier = $(this).attr("data-movieid");
    // console.log(tableIdentifier);
    // console.log(movieIdentifier);


    switch (tableIdentifier) {
      case "thumbsup":
        API.postLikes(tableIdentifier, movieIdentifier)
        API.postMovies(movieIdentifier)
        break;

      case "watchlist":
        // console.log(tableIdentifier);
        // console.log(movieIdentifier);
        break;

      case "thumbsdown":
        // console.log(tableIdentifier);
        // console.log(movieIdentifier);
        break;
    }
  }

  function sugarSearch() {
    event.preventDefault();
    let userSearchTerm = $("#movie-input").val();
    $("#movie-input").val('');  //clear field
    API.GETmovies(userSearchTerm);
  }

  

  // Group Project generated
  $findMovie.on("click", sugarSearch);
  $buttonTypeAndData.on("click", determineButton)


});
