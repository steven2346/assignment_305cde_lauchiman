var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db("dataB", mongodbServer);
var usersssssss="";
var isTriedLogin = false, isLoginSuccessful = false; var canRegis = true;

var server = http.createServer(function(request, response) {
    if (request.method == "POST") {

		
			
			console.log("post call");
		// Switch msg into a JSON object
        var formData = "", msg = "", obj = "";
        return request.on("data", function(data) {
			formData += data;
					
					
			}).on('end', function(chunk) {
					var user;
				user = qs.parse(formData);
				msg = JSON.stringify(user);
				console.log("305cde="+msg);
					
					obj = JSON.parse(msg);
				  console.log("aa="+obj['act']);	
					if (request.url == "/index.html") {
						 console.log("login page comes");
						
						if(obj['act']=="add_song"){
			console.log("add song h");
			  if (request.url == "/addsong") {
					  console.log("add song here");
				}				
						}
						
						
						
	   if(obj['act']=="signup"){
				//if (obj.signup != null) {

					console.log("SIGNUP");
					// Send obj data to dataB
			 
					db.open(function() {
						
						db.collection("user", function(err, collection) {
							
							collection.insert({

								username: obj.ac,
								password: obj.pw
							}, function(err, data) {
								
								if (data) {
									console.log("Successfully Insert");
									 //response.end(200, {'success': "apple"});
									 response.end('{"success" : "Updated Successfully", "status" : 200}');
								} else {
									console.log("Failed to Insert");
								}
							});
						});
					});

	}else if(obj['act']=="login"){
				//if (obj.signup != null) {
//	response.end('{"success" : "Updated Successfully", "status" : 200}');
					console.log("LOGIN");
					// Send obj data to dataB
				//	db.open(function() {
						
				//		db.collection("user", function(err, collection) {
							
							//collection.find({

						//		username: obj.ac,
					//			password: obj.pw
					//		}, function(err, data) {
								
							//	if (data) {
									console.log("Successfullyfound");
	
		
		
		
									
									var username = obj.ac;
					        var password = obj.pw;
									
		console.log("input login="+obj.ac);
		console.log("input pass="+obj.pw);
									
									 MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db) {
						db.collection("user", function (err, collection) {
							collection.find().toArray(function(err, items) {
								if(err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								if (items != "") {
									// Check whether the user account exists
									for (var i=0; i<items.length; i++) {
										
									//	if (username == items[i].ac && password == items[i].pw) {
										console.log("user="+items[i].username);
										console.log("pass="+items[i].password);
										console.log("user1="+obj.ac);
										console.log("pass1="+obj.pw);
										if (items[i].username ==obj.ac && items[i].password == obj.pw) {
											usersssssss= items[i].username;
										
											console.log("user="+items[i].username);
										console.log("pass="+items[i].password);
											console.log("USER FOUND CONFIGURATION");
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isLoginSuccessful = true;
										}else{
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isLoginSuccessful = false;
										}
										
										
									}
									
								
								/*	  fs.readFile('./json.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
											console.log("end here");
                });*/
									
									if(isLoginSuccessful == false){
										  console.log("Fail to login");
											response.end('LOGIN FAIL');
									}else{
										 console.log("LOGIN OK");
											response.end('LOGIN OK');
									}
								}
							});
						});	
				});
							//	} else {
								//	console.log("Failed to Insert");
							//	}
						//	});
						//});
				//	});

	}
					}//if request.url = login.html
        
  })	
    }else if(request.url == "/search2"){
			fs.readFile('./search.html', function(error, content) {
				console.log("search page");
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
			});
		} else {
			
		// Get
		fs.readFile("./" + request.url, function (err, data) {
			var dotoffset = request.url.lastIndexOf(".");
			var mimetype = dotoffset == -1
				? "text/plain"
				: {
					".html": "text/html",
					".ico" : "photo/x-icon",
					".jpg" : "photo/jpeg",
					".png" : "photo/png",
					".gif" : "photo/gif",
					".css" : "text/css",
					".js"  : "text/javascript"
				}[request.url.substr(dotoffset)];
			if (!err) {
				response.setHeader("Content-Type", mimetype);
				response.end(data);
				console.log(request.url, mimetype);
			} else {
				response.writeHead(302, {"Location": "./index.html"});
				response.end();
			}
		});
    }
});

server.listen(5001);

console.log("Server running at http://127.0.0.1:5001/");

