/*
 * Write your server code in this file.  Don't forget to add your name and
 * @oregonstate.edu email address below, so we know whose code we're grading.
 *
 * name: Michael Kopcho
 * email: mkopcho12521@gmail.com
 */

// Import the packages required for file and http operations
var fs = require('fs')
var http = require('http')

// Read in the files in public.html
console.log("== Reading in 404.html...")
var notFound = fs.readFileSync("./public/404.html", "utf8")

console.log("== Reading in index.html...")
var indexHTML = fs.readFileSync("./public/index.html", "utf8")

console.log("== Reading in index.js...")
var indexJS = fs.readFileSync("./public/index.js", "utf8")

console.log("== Reading in style.css...")
var style = fs.readFileSync("./public/style.css", "utf8")

var portNum = 3000

function testPort() {
	if(process.env.PORT !== "undefined") {
		portNum = parseInt(process.env.PORT)
	}
}

// Set up the server
var server = http.createServer(function(req, res) {
	
	// Case for index page
	if(req.url === "/" || req.url === "/index.html") {
		res.statusCode = 200
		res.setHeader("Content-Type", "text/html")
		res.write(indexHTML)
	}
	// Case for css file
	else if(req.url === "/style.css") {
		res.statusCode = 200
		res.setHeader("Content-Type", "text/css")
		res.write(style)
	}
	// Case for js file
	else if(req.url === "/index.js") {
		res.statusCode = 200
		res.setHeader("Content-Type", "application/javascript")
		res.write(indexJS)
	}
	// Case for intentionally accessing 404 page
	else if(req.url === "/404.html") {
		res.statusCode = 200
		res.setHeader("Content-Type", "text/html")
		res.write(notFound)
	}
	// Case for redirecting to 404 after an invalid request
	else {
		res.statusCode = 404
		res.setHeader("Content-Type", "text/html")
		res.write(notFound)
	}
	res.end()
})

//Check whether a port was specified in the environment varibales
testPort(portNum)

server.listen(portNum, function() {
	console.log("== Server is listening on port", portNum)
})
