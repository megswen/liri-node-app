require("dotenv/config");
var keys = require("./keys.js");
//var spotifyKeys = new spotify(keys.spotify);
//var spotify = require('node-spotify-api');
var axios = require('axios');
//var figlet = require('figlet');
var moment = require('moment');
moment().format();
var fs = require('fs');

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
    //console.log(artist);

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
// function spotify(parameter){
//     var songName = "";
// 	for (var i = 3; i < process.argv.length; i++){
// 		songName += process.argv[i];
//     }

//     if(!songName){
//         songName = "the sign";
//     }

//     spotifyKeys.search({type: 'track', query: songName})
//     .then(function(response) {
//         console.log(response);
//         for (var i = 0; i < 5; i++) {
//             var spotifyResults = 
//                 "--------------------------------------------------------------------" +
//                     "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
//                     "\nSong Name: " + response.tracks.items[i].name +
//                     "\nAlbum Name: " + response.tracks.items[i].album.name +
//                     "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
//             //console.log(spotifyResults);
//         }
//     })
//     .catch(function(err) {
//         console.log(err);
//     });
// }

// Create a function that will pull info from the OMDB API and give info (see homework) when user types in movie name
    // "node liri.js movie-this <movie name>"
function ombd(parameter) {
    var movieName = "";
	for (var i = 3; i < process.argv.length; i++){
		movieName += process.argv[i];
    }
    //console.log(movieName);

    if(!movieName){
        movieName = "mr nobody";
    }

    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL)
    .then(function(response) {
        //console.log(response);
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nDirector: " + response.data.Director +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
}

// Create a function using the fs node package that will take the text inside of random.txt and use it to call one of liri's commands
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt
    // "node liri.js do-what-it-says"
function random(parameter){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
}