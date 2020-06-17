



$(document).ready(function () {

  // Get references to page elements
  let $exampleText = $("#example-text");
  let $exampleDescription = $("#example-description");
  let $submitBtn = $("#submit");
  let $exampleList = $("#example-list");
  let $findMovie = $("#find-movie");

  let $buttonTypeAndData = $(".buttontype");


  // object to hold current search results, for running functions on
  let genreTopTenThouObj = {};
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
        // console.log(response);
        //response.homepage
        //response.id
        //response.title
        //response.poster_path$
        //response.vote_average
        //respnse.overview
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
    saveExample: function (example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function () {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
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

  // refreshExamples gets new examples from the db and repopulates the list
  // let refreshExamples = function () {
  //   API.getExamples().then(function (data) {
  //     var $examples = data.map(function (example) {
  //       var $a = $("<a>")
  //         .text(example.text)
  //         .attr("href", "/example/" + example.id);

  //       var $li = $("<li>")
  //         .attr({
  //           class: "list-group-item",
  //           "data-id": example.id
  //         })
  //         .append($a);

  //       var $button = $("<button>")
  //         .addClass("btn btn-danger float-right delete")
  //         .text("ｘ");

  //       $li.append($button);

  //       return $li;
  //     });

  //     $exampleList.empty();
  //     $exampleList.append($examples);
  //   });
  // };

  // Instructor Code
  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list

  // let handleFormSubmit = function(event) {
  //   event.preventDefault();

  //   var example = {
  //     text: $exampleText.val().trim(),
  //     description: $exampleDescription.val().trim()
  //   };

  //   if (!(example.text && example.description)) {
  //     alert("You must enter an example text and description!");
  //     return;
  //   }

  //   API.saveExample(example).then(function() {
  //     refreshExamples();
  //   });

  //   $exampleText.val("");
  //   $exampleDescription.val("");
  // };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  let handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
      refreshExamples();
    });
  };


  // Add event listeners to the submit and delete buttons
  // Instructor Code
  // $submitBtn.on("click", handleFormSubmit);  
  //$exampleList.on("click", ".delete", handleDeleteBtnClick);


  // Group Project generated
  $findMovie.on("click", sugarSearch);
  $buttonTypeAndData.on("click", determineButton)


});
