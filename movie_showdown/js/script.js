const api = {
  key: "11a6ff1b&",
  baseurl: "http://www.omdbapi.com/?apikey=",
};

$(".moviesearch").keypress(function (e) {
  if (e.which === 13) {
    clearMovies();
    let p1entry = $(this).val();
    getMovie(p1entry);
    console.log(p1entry);
  }
});

function getMovie(userinput) {
  axios
    .get(api.baseurl + api.key + "s=" + userinput)
    .then((response) => {
      let output = "";
      for (let i = 0; i < response.data.Search.length; i++) {
        if (response.data.Search[i].Type == "movie") {
          output += `<div class="moviebox">
          
          <button class= moviebutton onclick="movieSelected('${response.data.Search[i].imdbID}')"><img src="${response.data.Search[i].Poster}" alt="" />
        <h5>${response.data.Search[i].Title}</h5></button></div>
        `;
        }
      }
      $(".moviecontainer").append(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Set Selected MovieID in Session Storage
function movieSelected(id) {
  sessionStorage.setItem("movieID", id);
  // window.location = "index.html";
  return false;
}

// Retreive more info of movie on click
$(document).on("click", ".moviebutton", function () {
  getMovieRatings();
  clearMovies();
});

// Function to get additional movie info my using the movieID instead of s=Title
function getMovieRatings() {
  let movieID = sessionStorage.getItem("movieID");
  console.log(movieID);
  axios
    .get(api.baseurl + api.key + "i=" + movieID)
    .then((response) => {
      console.log(response);
      output = `<div class="moviebox">
          
      <img src="${response.data.Poster}" alt="" />
    <h5>${response.data.Title}</h5>
    <p>${response.data.Plot}</p>
    <p>IMDB Rating: ${response.data.imdbRating}</p>
    <p>Metascore: ${response.data.Metascore}</p>
    </div>
    `;
      $(".moviecontainer").append(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function clearMovies() {
  $(".moviecontainer").empty();
}
