const http = require("http");
const router = require("./config/router");

const app = http.createServer((request, response) => {
    const { method, url } = request;

    if (method === "GET") {
        router(url, response);
    } else {
        response.writeHead(500);
        response.end("Error");
    }
});

const port = 8080;
app.listen(port, "localhost");
console.log(`Node server running on port ${port}`);