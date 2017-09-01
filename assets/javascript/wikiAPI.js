var queryGET = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=Spanish_language";
// var queryGET = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&titles="+currentLanguage+"Spanish_language";
//https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch= 
//https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&titles=Spanish_language


$.ajax({
		url: queryGET,
		method: "GET"
}).done(function(response) {
	console.log(response.query.pages);
	console.log(JSON.parse(response.query));

});