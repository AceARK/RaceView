$(document).ready(function() {
	 $.ajax({
      url: "/candidates/all",
      method: "GET"
    }).done(function(candidateList) {
	    console.log(candidateList);
	    candidateList.forEach((candidateObject) => {
	    	var candidateImage = candidateObject.photoSrc;
	    	var candidateName = candidateObject.name;
	    	var candidateId = candidateObject.id;
	      	var voteTile = $("<div>");
	      	voteTile.addClass("voteTile col-xs-6");
	      	voteTile.html("<div class='row'><div class='col-xs-5'><div class='row'><div class='col-xs-12'><img class='voteImage' src='/assets/images/" + candidateImage + "'/></div></div><div class='row'><div class='col-xs-12'><h4 class='candidateName'>" + candidateName + "</h4></div></div></div><div class='col-xs-7'><button id='" + candidateId + "' class='vote btn btn-lg btn-danger'>Vote</button></div></div>");
	      	$("#candidateList").append(voteTile);
      	});
    });

    $("#candidateList").on("click", ".vote", function() {
    	var candidateId = $(this).attr("id");
    	console.log(candidateId);
	 	$.post("/open/vote", {candidateId: candidateId}, function(data) {
          	console.log(data);
   		}).done(function(data) {

   		});
    });
});