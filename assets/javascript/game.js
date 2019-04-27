var topics = ["Huskies", "Cats", "Gold Fish", "Boardgames",];




function displayGifs() {

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=HT6SwO59aGj113uijt623dftR6o7lRRt&limit=5";
  var topics = $(this).attr("data-name");
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    console.log(response);
    $("#gify-view").empty();

    if (results === "") {
      alert("There isn't a gif associated with this search");
    }

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      var gifDiv = $("<div> class 'gifDiv");
      var gifRating = $("<p>").text("Rating: " + results[i].rating);
      gifDiv.append(gifRating);
      // pulling gif
      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
      gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
      gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
      gifImage.attr("data-state", "still"); // set the image state
      gifImage.addClass("image");
      gifDiv.append(gifImage);
      // pulling still image of gif
      // adding div of gifs to gifsView div
      $("#gify-view").prepend(gifDiv);
  
    }
  });
}


// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
 

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var buttonGif = $("<button>");
    // Adding a class of movie-btn to our button
    buttonGif.addClass("gify-btn");
    
    buttonGif.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(buttonGif);
  }

}

        $("#add-gify").on("click", function (event) {
          event.preventDefault();
          // This line grabs the input from the textbox
          var topic = $("#gify-input").val().trim();
        
          // Adding movie from the textbox to our array
          topics.push(topic);
        
          // Calling renderButtons which handles the processing of our movie array
          renderButtons();
});

// This function handles events where a movie button is clicked

//$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  //var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  //if (state === "still") {
   // $(this).attr("src", $(this).attr("data-animate"));
   // $(this).attr("data-state", "animate");
  //} else {
  //  $(this).attr("src", $(this).attr("data-still"));
  //  $(this).attr("data-state", "still");
  //}
//});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gify-btn", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();
