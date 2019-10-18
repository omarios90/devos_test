const http = require("http");
const fs = require("fs");
const path = require("path");

const mainPath = "public";
const indexPath = "/index.html";

const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json"
};

const app = http.createServer((request, response) => {
    const { method, url } = request;

    const newUrl = url === "/" ? indexPath : url;
    const extName = path.extname(newUrl).toString().toLowerCase();
    const contentType = mimeTypes[extName];

    if (method === "GET" && contentType) {
        const fileName = `${mainPath}${newUrl}`;
        fs.readFile(fileName, (error, content) => {
            if (error) {
                response.writeHead(500);
                response.end("Error");
            } else {
                response.writeHead(200, { "Content-Type": contentType });
                response.end(content, "utf-8");
            }
        });
    }
});

const port = 8080;
app.listen(port, "localhost");
console.log(`Node server running on port ${port}`);