const fs = require("fs");
const path = require("path");

const prefixPath = "..";
const mainPath = "/public";
const indexPath = "/index.html";

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json"
};

module.exports = ({ url, response, basePath }) => {
  const base = basePath !== undefined ? basePath : mainPath;
  const newUrl = path.join(__dirname, prefixPath, base, (url === "/" ? indexPath : url));
  const extName = path.extname(newUrl).toString().toLowerCase();
  const self = {
    url: newUrl,
    fileName: newUrl,
    contentType: mimeTypes[extName]
  };

  return {
    self,
    isSatisfied: () => new Promise((resolve, reject) => {
      const ok = fs.existsSync(self.fileName) && !!self.contentType;
      if (ok) resolve();
      else reject();
    }),
    action: () => {
      fs.readFile(self.fileName, (error, content) => {
        if (error) {
          response.writeHead(500);
          response.end("Error");
        } else {
          response.writeHead(200, { "Content-Type": self.contentType });
          response.end(content, "utf-8");
        }
      });
    }
  };
};