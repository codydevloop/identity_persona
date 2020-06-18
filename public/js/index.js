



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

    // perform genre search for given movie title
    GETmovies: function (name) {
      window.location.href = `/api/movies?name=${name}`;
    },
    // make call to TMDB to get full details then post results to moviedb
    postMovies: function (action, movie){

      $.ajax("/api/email/", {
        type: "GET"
      }).then(function (email) {


        $.ajax("/api/fullmovie/" +movie ,{
          type: "GET"
        }).then(function (response) {

          let data = {
            movieId: response.id,
            poster: `http://image.tmdb.org/t/p/w154${response.posterPath}`,
            overview: response.overview,
            title: response.title,
            homepage: response.homepage,
            email: email,
            action: action
          }

            $.ajax("/api/moviesdb/", {
              type: "POST",
              data: data
            }).then(
              //console.log("posted to Movie DB")
            )
        })  
      });

      
    },

    // post movie information to movie Table, after completing API call
    postLikes: function (table, movie) {

      
      $.ajax("/api/email/", {
        type: "GET"
      }).then(function (response) {

        let data = {
          action: table,
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

    showLikesList: function(value){

      $.ajax("/api/email/", {
        type: "GET"
      }).then(function (response) {


        window.location.href = `/api/userlikes?email=${response}`;
        // console.log(response);
        // $.ajax("/api/userlikes/", {
        //   type: "GET",
        //   data : data
        // }).then( function(res) {
        //   console.log(res)
        // })
      }) 
    }
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
    API.postLikes(tableIdentifier, movieIdentifier)
    API.postMovies(tableIdentifier, movieIdentifier)



    // switch (tableIdentifier) {
    //   case "thumbsup":
    //     API.postLikes(tableIdentifier, movieIdentifier)
    //     API.postMovies(movieIdentifier)
    //     break;

    //   case "watchlist":

    //     break;

    //   case "thumbsdown":

    //     break;
    // }
  }

  function sugarSearch() {
    event.preventDefault();
    let userSearchTerm = $("#movie-input").val();
    $("#movie-input").val('');  //clear field
    API.GETmovies(userSearchTerm);
  }

  

  // Group Project generated
  $findMovie.on("click", sugarSearch);
  $buttonTypeAndData.on("click", determineButton);
  $likesButton.on("click", function() {
    let value =1;
    API.showLikesList(value);
  }); 
    


});
