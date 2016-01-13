/**
 * QuickbooksController
 *
 * @description :: Server-side logic for managing quickbooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var apikeys = require('./apikeys.js');
var request = require('request');
var qs = require('querystring');
var QB = require('node-quickbooks');
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
	console.log(req.session);
	// var currentUser = req.session.passport.user;
	//  Quickbooks.find({user:currentUser})
	//  .exec(function(err,results){
	//  	console.log(err);
	//  	console.log(results);
	//  	if (results == []){
			return res.view('quickbooks/unauthorized',{vendors:"none"})
	 // 	};

		// qbo = new QB(
		// 	consumerKey,
		// 	consumerSecret,
		// 	results[0].oauth_token,
		// 	results[0].oauth_token_secret,
		// 	results[0].realmId,
		// 	false,//sandbox
		// 	true);//debugging

		// qbo.findVendors(" where GivenName = 'Alison'",function(err,vendors){
		// 	if(err){
		// 	console.log("error:",err);
		// }
		// 	console.log(vendors);
		// 	return res.view('quickbooks/unauthorized',{vendors:vendors})
		// })

	 // })
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
		res.redirect(QB.APP_CENTER_URL + requestToken.oauth_token)
	})
	},
	callback: function(req, res){
	var postBody = {
		url: QB.ACCESS_TOKEN_URL,
		oauth: {
			consumer_key: consumerKey,
			consumer_secret: consumerSecret,
			token: req.query.oauth_token,
			token_secret: req.session.oauth_token_secret,
			verifier: req.query.oauth_verifier,
			realmId: req.query.realmId
		}
	}
	req.session.oauth_token = req.query.oauth_token;
	request.post(postBody,function(e,r,data){
		var accessToken = qs.parse(data);
		console.log(postBody.oauth.realmId);

	console.log('Hitting the request with this for oauth: ',data);

		qbo = new QB(
			consumerKey,
			consumerSecret,
			accessToken.oauth_token,
			accessToken.oauth_token_secret,
			postBody.oauth.realmId,
			false,//sandbox
			true);//debugging

		Quickbooks.update({user:req.session.passport.user},{
			user:req.session.passport.user,
			accessToken:accessToken.oauth_token,
			accessTokenSecret:accessToken.oauth_token_secret,
			realmId:postBody.oauth.realmId
		}).exec(function(err,data){
			if (err){console.log(err)};
			console.log(data)
		})
		var fs = require('fs');
		var stringify = require('csv/node_modules/csv-stringify');



		qbo.findVendors(" maxResults 1000",function(err,vendors){
			console.log(vendors);
			if(err){return res.view('quickbooks/manage')};
			stringify(vendors.QueryResponse.Vendor,function(err,output){
				fs.writeFile('Vendors.csv',output);
				if (err) return console.log(err);
				console.log('Hello World > Vendors.csv');
			});
			return res.view('quickbooks/manage',{vendors:vendors.QueryResponse.Vendor})
		})

		// res.send('<!DOCTYPE html><html lang="en"><head></head><body><script>window.opener.location.reload(); window.close();</script></body></html>')
	})
	},
	vendors: function(req,res){
		qbo.findVendors(function(vendors){
			console.log(vendors);
	// return res.view('quickbooks',{vendors:vendors})
		})
}
};

