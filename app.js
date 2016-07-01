$(function(){
  //declare global variables
  var superTroopers = {};
  var officeSpace = {};
  var eternalSunshineOfTheSpotlessMind = {};
  var shawshankRedemption = {};
  var moviesArray = [];

  //assign key/value pairs to specified object from API JSON
  function assignData(object, url) {
    $.get(url).then(function(data) {
      object.poster = data.Poster;
      object.title = data.Title;
      object.genre = data.Genre;
      object.year = data.Year;
      object.duration = data.Runtime;
      object.rating = data.imdbRating;
      object.id = data.imdbID;

      moviesArray.push(object);
      //checks if movie already exists, if not creates new DOM element. Otherwise does nothing
      if ($('.movies').find('.'+object.id).length === 0) {
      $('.movies').append('<ul class="' + object.id + '"></ul>');
      $('.' + object.id).append('<li><img src="' + object.poster + '"</li>');
      $('.' + object.id).append('<li class="movie-title"> <span class="key">Title</span><br /> ' + object.title + '</li>');
      $('.' + object.id).append('<li class="movie-genre"> <span class="key">Genre</span><br /> ' + object.genre + '</li>');
      $('.' + object.id).append('<li class="movie-year"> <span class="key">Year</span><br /> ' + object.year + '</li>');
      $('.' + object.id).append('<li class="movie-duration"> <span class="key">Runtime</span><br /> ' + object.duration + '</li>');
      $('.' + object.id).append('<li class="movie-rating"> <span class="key">Rating</span><br /> ' + object.rating + '</li>');
    }else{console.log('already added');}}, function() {
        console.log('fail');
      });

    }

 //Search movie function, append search list to DOM
  function searchMovie(url) {
   var tempSearchArray = [];
   $.get(url).then(function(data) {
     var searchResult = data.Search;
     if (searchResult === undefined) {
       $('.search-results').append('<div class="search-error">Uh oh! Something went wrong with the search. Please recheck the title and try again!');
       return;
     }
     for (var i = 0; i < searchResult.length; i++) {
       tempSearchArray.push({});
       tempSearchArray[i].poster = searchResult[i].Poster;
       tempSearchArray[i].title = searchResult[i].Title;
       tempSearchArray[i].id = searchResult[i].imdbID;
       $('.search-results').append('<ul class="search-results-list" id="' + tempSearchArray[i].id + '"></ul>')
       $('#'+tempSearchArray[i].id).append('<li><img src="' + tempSearchArray[i].poster + '" alt="' + tempSearchArray[i].title + ' Poster"/></li>');
       $('#'+tempSearchArray[i].id).append('<li><span class="key">Title</span>' + tempSearchArray[i].title + '</li>');
     }
    }, function() {
      console.log('fail');
    });
  }

  //search function to query API, called in search even listeners
  function getSearch() {
    var searchReq = $('#search').val();
    $('.search-results').find('ul').remove();
    $('.search-results').find('.search-error').remove();
    $('.search-container').show();
    searchMovie('http://www.omdbapi.com/?s='+searchReq);
  }

  //manually add movies locally
  assignData(shawshankRedemption, 'http://www.omdbapi.com/?t=Shawshank&y=&plot=short&r=json');
  assignData(eternalSunshineOfTheSpotlessMind, 'http://www.omdbapi.com/?t=eternal+sunshine&y=&plot=short&r=json');
  assignData(officeSpace, 'http://www.omdbapi.com/?t=office+space&y=&plot=short&r=json');
  assignData(superTroopers, 'http://www.omdbapi.com/?t=super+troopers&y=&plot=short&r=json');

  //search API for movie in search box by click or enter
  $('.search').on('click','button',function(){
   getSearch();
  });
  $('.search').on('keyup', function(event) {
    if(event.keyCode === 13) {
    getSearch();
    }
  });

  //add movies from search to movies list by clicking
  $('.search-results').on('click','ul',function() {
    var newMovie = {};
    assignData(newMovie, 'http://www.omdbapi.com/?i=' + $(this).attr('id'));
  })

  //close search pop-up window
  $('.search-container').on('click','.close button',function(){
    $(this).closest('.search-container').hide();
  })

 //log moviesArray for testing purposes by clicking on header
  $('.header h1').on('click',function() {
   for (var i = 0; i < moviesArray.length; i++) {
     console.log(moviesArray[i].title);
   }
  })


});
