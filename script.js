$(document).ready(function() {

var temperatureScale = "metric";
$("#info-panel").hide();


// main ajax lookup function
function ajaxLookup() {

  // Look up the user's location and store response
  var findLocation =  $.ajax({
      url: "http://ip-api.com/json",
      type: "GET",
      dataType: "JSON"
  });



  // Promise on completion of findLocation
  findLocation.then(function() {

    // store responseJSON object for later queries
    var location = findLocation.responseJSON;
    console.log('IP API Response below');
    console.table(location);


    // apply user's location to look up weather and store response
    var findWeather = $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q="${location.city}&units=${temperatureScale}&appid=8a5857d37dbce43c92adf59081a87b9b`,
      type: "GET",
      dataType: "JSON"
    });

    // promise on completion of findWeather
    findWeather.then(function() {

      // store responseJSON object
      var weather = findWeather.responseJSON;
      console.log('Weather API Response below');
      console.table(weather);
      var temperatureSymbol = (temperatureScale === "metric") ? "&deg;C" : "&deg;F";
      var icon = (weather.weather[0].icon[2] === "d") ? "day" : "night";
      // populate HTML markup with JSON data
      $("#temperature").html(weather.main.temp.toFixed(0) + temperatureSymbol);
      $("#description").html(weather.weather[0].description);
      $("#icon i").removeClass();
      $("#icon i").addClass("wi wi-owm-" + icon + "-" + weather.weather[0].id);
      $("#city").html(location.city + ", " + location.countryCode);
      $("#info-panel").fadeIn(1000);
    });
  });
}

ajaxLookup();

// Switch the temperature scale
$("#switch").on("click", function() {
  temperatureScale = (temperatureScale === "metric") ? "imperial" : "metric";
  ajaxLookup();
});

});
