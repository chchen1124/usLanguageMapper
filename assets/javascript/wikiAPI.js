var queryGET = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&titles=Spanish_language";
// var queryGET = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&titles="+currentLanguage+"Spanish_language";

$.ajax({
		url: queryGET,
		method: "GET"
}).done(function(response) {
	console.log(response.query.pages);
	console.log(JSON.parse(response.query));

});