const request = require('request');
var http = require('http');
var fs = require('fs');
var url = require('url');
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.TEST;
module.exports = API_KEY;

const weatherURL = "https://api.darksky.net/forecast/a83136801a47dedb3771801008039bdf/37.8267,-122.4233";

request({ url: weatherURL }, (err, res) => {
    const data = JSON.parse(res.body)
    console.log(data.currently)
})

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (filename == "./") {filename = "./index"}

    filename = filename + ".html";

    

    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, {'content-type':'text/html'});
            return res.end("404 Not found");
        }
        res.writeHead(200, {'content-type':'text/html'});
        res.write(data);
        console.log("Incoming request... " + req.url);
        res.end();
    })
}).listen(PORT);

console.log("Server listening on port 8080...")