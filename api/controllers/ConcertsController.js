/**
 * ConcertsController
 *
 * @description :: Server-side logic for managing concerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var apikeys = require('apikeys.js');

module.exports = {
	view: function(req,res){
		Client.find.populate('band')
		.exec(function(e,r){
			if(e){console.log(e)};
function getConcerts(city,artist){
	var options = {
		host: 'api.songkick.com',
		path: '/api/3.0/events.json?apikey='+apikey+'&location='+city+'&artist_name='+artist
	};
	console.log('getting concerts for '+options.path)

	var callback = function(response){
		var str = '';

		response.on('data',function(chunk){
			str += chunk;
		});

		response.on('end', function(){
			var json = JSON.parse(str);
			if(json.resultsPage.totalEntries>0){
				var conString = JSON.stringify(json.resultsPage.results.event);
			if(city==phoenix){
			// concerts.phoenix.push(details);
			Concerts.create({location:'phoenix'},{string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==newYork){
			concerts.newYork.push(details);
			Concerts.create({location:'newYork',string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==losAngeles){
			// concerts.losAngeles.push(details);
			Concerts.create({location:'losAngeles',string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==nashville){
			// concerts.nashville.push(details);
			Concerts.create({location:'nashville',string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }
    });
		}else if(city==tucson){
			// concerts.tucson.push(details);
			Concerts.create({location:'tucson',string:conString}, function(err, concert){
      if (err){
        console.log(err);
      }
      else{
        console.log(artist+" in "+city)
      }// else
    });//Concerts.create
		}// if tucson
			}//if totalEntries > 0

		});
	}
	http.request(options, callback).end();
}//getConcerts
		var concerts = {};
		concerts.newYork = [];
		concerts.losAngeles = [];
		concerts.nashville = [];
		concerts.tucson = [];
		concerts.phoenix = [];
		var apikey = apikeys.songkickkeys[0].apikey;
		var newYork = "sk:7644";
		var losAngeles = "sk:17835"; 
		var nashville = "sk:11104";
		var tucson = "sk:10046";
		var phoenix = "sk:23068";
		for (var i = r.length - 1; i >= 0; i--) {
			getConcerts(newYork,r[i].performsas);
		};
		return res.view('concerts',{concerts:concerts})
		})
	}
};

