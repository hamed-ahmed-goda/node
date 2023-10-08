const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const users = {
    id: 1,
    name: "hamed",
    age: 23
};

const content = `
  <head>
    <link rel="stylesheet" href='style.css'/>
  </head>
  <body>
    <h1>Hello IOT</h1>
     <img src="R.jpg" />
  </body>
`;


const server = http.createServer((req, res) => {

    const resHeader = (status, content, data) => {
        res.statusCode = status;
        res.setHeader("Content-Type", content);
        res.end(data);
    };

    switch (req.url) {
        case "/":
            resHeader(200, "text/html", content);
            break;
        case "/users":
            resHeader(200, "application/json", JSON.stringify(users));
            break;
        case "/style.css":
            resHeader(200, "text/css", fs.readFileSync("style.css"));
            break;
        case "/R.jpg":
            resHeader(200, "image/jpeg", fs.readFileSync("R.jpg"));
            break;
        default:
            resHeader(404, "text/plain", "Page not found");
    }
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});