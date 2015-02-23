"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var wkhtmltopdf = require("wkhtmltopdf");
var wkhtmltopdf_bin = process.env.WKHTMLTOPDF_BIN;
if (wkhtmltopdf_bin) {
  wkhtmltopdf.command = wkhtmltopdf_bin;
}

var marked = require("marked");
marked.setOptions({
  highlight: function (code) {
    return require("highlight.js").highlightAuto(code).value
  }
});

// Set up the body parser
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files
app.use("/", express.static(__dirname + "/public"));

app.post("/", function (req, res) {
  var data = req.body.data;
  if (!data) {
    res.status(400).send({error: "Bad Request"});
  } else {
    var html = "<!DOCTYPE html>" +
      "<html lang=\"en\">" +
        "<head>" +
          "<meta charset=\"utf-8\">" +
          "<title>markdown to pdf</title>" +
        "</head>" +
        "<body>";

    html += marked(data);

    html += "</body>" +
      "</html>";

    // set the download file name
    res.setHeader("Content-disposition", "attachment; filename=document.pdf");

    wkhtmltopdf(html, {
      footerHtml: "static/footer.html",
      userStyleSheet: "static/markdown.css",
      marginBottom: 15,
      marginTop: 20,
      encoding: "utf-8"})
    .pipe(res);
  }
});


// Start server
var port = Number(process.env.PORT || 3000);
var server = app.listen(port, function () {
  var host = server.address().address;
  console.log("Node server listening at %s:%s", host, port);
});
