require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var axios = require('axios');
//var figlet = require('figlet');
var moment = require('moment');
moment().format();

var command = process.argv[2];
var parameter = process.argv[3];

// Switch case function to determine which function to run
switch (command) {
case "concert-this":
    bandsInTown(parameter);
    break;

case "spotify-this-song":
    spotify(parameter);
    break;

case "movie-this":
    ombd(parameter);
    break;

case "do-what-it-says":
    random(parameter);
    break;
}

// Create a function that will pull info from the Bands in Town API and give the venue name, venue location, and date of event when a user searches for a band
    // "node liri.js concert-this <artist/band name>"
function bandsInTown(parameter) {
    var artist = "";
	for (var i = 3; i < process.argv.length; i++){
		artist += process.argv[i];
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
    .then(function(response) {   
        for (var i = 0; i < 5; i++) {

            var datetime = response.data[i].datetime;

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.location +
                    "\nDate of the Event: " + moment(datetime).format("MM/DD/YYYY");
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

// Create a function that will pull info from the Spotify API and give the artist name, song name, a preview link of the song in spotify, and the album the song is from when the user searches for a song
    // "node liri.js spotify-this-song <song name>"
// function spotify(){

//     var songName = value;
//     var queryURL = ;
// }

// Create a function that will pull info from the OMDB API and give info (see homework) when user types in movie name
    // "node liri.js movie-this <movie name>"
// function ombd(){

//     var movieName = value;
//     var queryURL = ;
// }

// Create a function using the fs node package that will take the text inside of random.txt and use it to call one of liri's commands
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt
    // "node liri.js do-what-it-says"
// function random(){

// }