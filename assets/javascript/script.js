
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
  
  var queryGET = "https://en.wikipedia.org/w/api.php?action=opensearch&search=french_language&format=json&origin=*";
$.ajax({
    url: queryGET,
    type: "GET"
}).done(function(response) {
  $("#wikiTitle").text(capitalize_Words(response[1][0]));
  $("#infoTable").append(response[2]);
  $("#infoTable").append("<br/><a href=\""+response[3][0]+"\">"+response[3][0]+"</a>");
});
function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

  var queryGET = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:6&LAN=625";
$.ajax({
    url: queryGET,
    type: "GET"
}).done(function(response) {
  console.log("The amount of people that speak Spanish in California is: "+response[1][0]);
});