// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {
	// Routing to scrape news 
	app.post("/scrape/latest", function(req, res) {
		
		// var array = {"patti": "naaye", "candidateAId": req.body};
		var candidateName = Object.keys(req.body)[0];
		// console.log(Object.keys(req.body)[0]);
		var queryName = candidateName.split(" ").join("+");
		// Prepare Onion url using candidate as search query
		var queryURL = "http://www.theonion.com/search?q=" + queryName;
    	// Setting request to promise
		request(queryURL, function(error, response, html) {
		    // Load that into cheerio and save it to $ for a shorthand selector
		    var $ = cheerio.load(html);
		    var newsArray =[];
			
		    // Iterating over each required element
		    $(".summary>.info>.inner>.share-container>.share-tools.share-widget").each(function(j, element) {
		    	// Capturing required properties of each element into variables
		    	if(newsArray.length < 5) {
		    		var headline = $(element).attr("data-share-title").trim();
			    	var summary = $(element).attr("data-share-description").trim();
			    	// var image = $(element).attr("data-share-image").trim();

				    // Initialize result object
				    var news = {};
					if(headline !== "" && summary !== "" && !headline.includes("Built-In Search Engine Just Pathetic")) {
						 // Add the headline, link, summary and byline of each to result object
					    news.headline = headline;
					    news.summary = summary;
					    // news.image = image;

					 	newsArray.push(news);  
					}
				    
		    	} 
		    });	
		    res.json(newsArray);
		
		}); // end of request call
	});

}
