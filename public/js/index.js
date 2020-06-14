



$(document).ready(function () {
  
  // Get references to page elements
  let $exampleText = $("#example-text");
  let $exampleDescription = $("#example-description");
  let $submitBtn = $("#submit");
  let $exampleList = $("#example-list");
  let $findMovie = $("#find-movie");


  // object to hold current search results, for running functions on
  let genreTopTenThouObj = {};
  // The API object contains methods for each kind of request we'll make
  var API = {

    //Esme -- performs call to controller to perfrm tmdb search and returns movie object


    GETmovies: function (name) {

      window.location.href = `/movies?name=${name}`;
 
    },

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
  function sugarSearch(event) {
    event.preventDefault();
    let userSearchTerm = $("#movie-input").val();
    $("#movie-input").val('');  //clear field
    API.GETmovies(userSearchTerm);
  }

  // refreshExamples gets new examples from the db and repopulates the list
  let refreshExamples = function () {
    API.getExamples().then(function (data) {
      var $examples = data.map(function (example) {
        var $a = $("<a>")
          .text(example.text)
          .attr("href", "/example/" + example.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": example.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $exampleList.empty();
      $exampleList.append($examples);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  let handleFormSubmit = function(event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(example).then(function() {
      refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
  };

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
  // $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);

  $findMovie.on("click", sugarSearch);

});
