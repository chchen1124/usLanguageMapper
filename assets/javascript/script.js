//Variables for API Calls
var censusDataArr = [];
var languageChosen = "";
var languageCode = 0;

var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);

    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

});

//Wiki API calls are done in here
function wikiAPI() {
  var queryGET = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+languageChosen+"_language&format=json&origin=*";
  $.ajax({
      url: queryGET,
      type: "GET"
  }).done(function(response) {
    $("#wikiTitle").text(capitalize_Words(response[1][0]));
    $("#infoTable").append(response[2]+"<br/><a href=\""+response[3][0]+"\">"+response[3][0]+"</a>");
  });
  function capitalize_Words(str)
  {
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}

//Database Stuff is Below
//Databse Config
var config = {
    apiKey: "AIzaSyBHljGJyonFx72WZpBnC4u46FErCsUw8mo",
    authDomain: "first-project-cbc-ccc91.firebaseapp.com",
    databaseURL: "https://first-project-cbc-ccc91.firebaseio.com",
    projectId: "first-project-cbc-ccc91",
    storageBucket: "first-project-cbc-ccc91.appspot.com",
    messagingSenderId: "828827239913"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//Census API calls are done in here
function censusAPI() {
  //This currently only queries for California.. we will need to setup a for loop and loop it through the states
  database.ref("/stateCodes").once("value",function(data){
    for(var i = 0; i < data.val().stateCode.length; i++){
      var queryGET = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:"+data.val().stateNum[i]+"&LAN="+languageCode;
      $.ajax({
          url: queryGET,
          type: "GET"
      }).done(function(response) {
        console.log("The amount of people that speak"+languageChosen+" in California is: "+response[1][0]);
        censusDataArr.push(parseInt(response[1][0]));
        console.log(censusDataArr);
      });
    }
  });
}

//Database Calls for Language Data to populate dropdown
database.ref("/languageData").on("value", function(snapshot) {
  for(var i = 0; i < snapshot.val().languageName.length; i++){
    //Outputs to the page for testing/review purposes
    // $("#output").append(snapshot.val().languageCode[i] +":"+snapshot.val().languageName[i]+"<br/>");

    $(".dropdown-menu.scrollable-menu").append("<li id=\"lang-select\" lang-code="+snapshot.val().languageCode[i]+"><a href=\"#\">"+snapshot.val().languageName[i]+"</a></li>");

  }
});

function getValues () {
  $("#infoTable").text("");
  censusDataArr.length = 0; //resetting the Array for every run through
  console.log("Inside getValues");
  console.log("This " + $(this).text());
  languageChosen = $(this).text();
  languageCode = parseInt($(this).attr("lang-code"));
  censusAPI();
  wikiAPI();
}

$(document).on("click", "#lang-select", getValues);



//Heatmap generator
//Uses d3.js
//Parameter: 50-element text 
//Parameters: 50-element integer or float array indicating population count for each state

