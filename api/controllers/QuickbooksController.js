/**
 * QuickbooksController
 *
 * @description :: Server-side logic for managing quickbooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var apikeys = require('./apikeys.js');
var request = require('request');
var qs = require('querystring');
var QuickBooks = require('node-quickbooks');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var consumerKey	= apikeys.quickbooks[0].consumerKey;
var consumerSecret = apikeys.quickbooks[0].consumerSecret;


app.use(cookieParser('brad'));
app.use(session({secret: 'smith'}));

module.exports = {
	manage: function(req,res){
	response.status(200).set('Content-Type', 'text/plain');;
	for(var i = 0; i < 10, i++){
	 	response.write(i);
 	}
 	return response.end();
	// return res.view('quickbooks',{vendors:"none"})
},
RequestTokenServlet: function(req,res){
	var postBody = {
		url: 'https://oauth.intuit.com/oauth/v1/get_request_token',
		oauth: {
			callback:'http://royaltyviewer.com:1337/quickbooks/callback',
			consumer_key: consumerKey,
			consumer_secret: consumerSecret
		}
	}
	request.post(postBody,function(e,r,data){
		var requestToken = qs.parse(data)
		req.session.oauth_token_secret = requestToken.oauth_token_secret;
		res.redirect(QuickBooks.APP_CENTER_URL + requestToken.oauth_token)
	})
},
callback: function(req, res){
	var postBody = {
		url: QuickBooks.ACCESS_TOKEN_URL,
		oauth: {
			consumer_key: consumerKey,
			consumer_secret: consumerSecret,
			token: req.query.oauth_token,
			token_secret: req.session.oauth_token_secret,
			verifier: req.query.oauth_verifier,
			realmId: req.query.realmId
		}
	}
	request.post(postBody,function(e,r,data){
		var accessToken = qs.parse(data);
		console.log(postBody.oauth.realmId);

		qbo = new QuickBooks(
			consumerKey,
			consumerSecret,
			accessToken.oauth_token,
			accessToken.oauth_token_secret,
			postBody.oauth.realmId,
			false,//sandbox
			true);//debugging

		qbo.findVendors(function(vendors){
			console.log(vendors);
	return res.view('quickbooks',{vendors:vendors})
		})

		// res.send('<!DOCTYPE html><html lang="en"><head></head><body><script>window.opener.location.reload(); window.close();</script></body></html>')
	})
}
};

