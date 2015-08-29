
var apikeys = require('../api/controllers/apikeys.js');
var http = require('http');

module.exports = {
    run : function(req,res){
        console.log('do something very cool here');
		Client.find().populate('bands')
		.exec(function(e,r){
			if(e){console.log(e)};
			// console.log(r);
function getConcerts(city,artist){
	var options = {
		host: 'api.songkick.com',
		path: '/api/3.0/events.json?apikey='+apikey+'&location='+city+'&artist_name='+artist
	};
	console.log('getting concerts for '+options.host+options.path)

	var callback = function(response){
		var str = '';

		response.on('data',function(chunk){
			str += chunk;
		});

		response.on('end', function(){
			console.log('response = end');
			var json = JSON.parse(str);
			if(json.resultsPage.totalEntries>0){
				var conString = JSON.stringify(json.resultsPage.results.event);
				var events = json.resultsPage.results.event;
				for (var i = events.length - 1; i >= 0; i--) {
					Concerts.create({
						location:events[i].venue.metroArea.displayName,
						venue:events[i].venue.displayName,
						songkickID:events[i].id,
						songkickPage:events[i].uri,
						date:events[i].start.date,
						time:events[i].start.time,
						artist:events[i].performance[0].artist.displayName,
						performance:events[i].displayName
					}, function(err, concert){
      					if (err){
        					console.log(err);
      					}else{
      						console.log(concert);
      					}
       			});
			}//if totalEntries > 0

		};
	});//end response.on
};//end callback
	http.request(options, callback).end();
}//getConcerts
		var apikey = apikeys.songkickkeys[0].apikey;
		var newYork = "sk:7644";
		var losAngeles = "sk:17835"; 
		var nashville = "sk:11104";
		var tucson = "sk:10046";
		var phoenix = "sk:23068";
		for (var i = r.length - 1; i >= 0; i--) {
			// concerts.newYork.push(r[i]);
			getConcerts(newYork,encodeURI(r[i].performsas));
		}
		 // return res.view('concerts',{concerts:concerts})
		})//end exec
    }//end run
};//end module.exports