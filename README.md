# markdown-to-pdf

`markdown-to-pdf` is a simple server that converts markdown documents to pdf.

## Features

* convert markdown to pdf using [marked](https://github.com/chjj/marked) and [wkhtmltopdf](http://wkhtmltopdf.org/)
* with a beautiful [style](https://github.com/mixu/markdown-styles)
* [syntax highlighting](https://highlightjs.org/) for code blocks
* online editor: [Ace](http://ace.c9.io/)

## Run / Deploy
```
npm install
npm start
```
You can specify the port to run the server on by setting the environment variable `PORT` (defaults to 3000).
You need to have wkhtmltopdf installed. If it is not in your PATH, you should set the environment variable
WKHTMLTOPDF_BIN to the path to the wkhtmltopdf binary.

## License
BSD

## Demo
A demo is available on heroku: [markdown-to-pdf.herokuapp.com](http://markdown-to-pdf.herokuapp.com).
