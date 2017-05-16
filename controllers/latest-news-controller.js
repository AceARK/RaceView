// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {
	// Routing to scrape news 
	app.post("/scrape/latest", function(req, res) {
		
		var newsArray = [];
		// Initialize promise array to hold all request/cheerio promises
		var promiseArray = [];
		var candidatesArray = req.body;
		// Loop through candidateArray and get data for each
		for(var i=0; i<candidatesArray.length; i++) {
			// Object to store each candidate's newsArray
			var candidateObject = {};
			// Get current candidate
			var candidateID = candidatesArray[i].id;
			var candidateName = candidatesArray[i].name;
			var queryName = candidateName.split(" ").join("+");
			// Prepare Onion url using candidate as search query
			var queryURL = "http://www.theonion.com/search?q=" + queryName;
			console.log(queryURL);
			var candidateNewsArray = [];
			// First, we grab the body of the html with request
			request(queryURL, function(error, response, html) {
				
			    // Then, we load that into cheerio and save it to $ for a shorthand selector
			    var $ = cheerio.load(html);
				
			    // Iterating over each required element
			    $(".summary>.info>.inner>.share-container>.share-tools.share-widget").each(function(i, element) {
			    	// Capturing required properties of each element into variables
			    	// var link = $(element).attr("href");
			    	if(i <= 5) {
			    		var headline = $(element).attr("data-share-title").trim();
			    		console.log(headline);

				    	var summary = $(element).attr("data-share-description").trim();
				    	console.log(summary);

				    	var image = $(element).attr("data-share-image").trim();
				    	console.log(image);

					    // Initialize result object
					    var news = {};
		
					    // Add the headline, link, summary and byline of each to result object
					    news.headline = headline;
					    news.summary = summary;
					    news.image = image;

					    candidateNewsArray.push(news);

					 	console.log("Within cheerio");
					 	console.log(candidateNewsArray);
			    	} 
			    });
			});
			candidateObject = {"id": candidateID, "latestNewsArray": candidateNewsArray};
			newsArray.push(candidateObject);
		} // end of candidate looping
		console.log(newsArray);
		res.json(newsArray);
	}); // end of express call
}
