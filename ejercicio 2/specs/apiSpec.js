const https = require("https");
const http = require("http");

const apiRoute = "/api";
const internalMockRoute = "/mocks";
const httpModule = https;

const apiRoutes = [{
  path: `${apiRoute}/v1/source/1`,
  url: "https://s3.amazonaws.com/logtrust-static/test/test/data1.json",
  mock: "https://next.json-generator.com/api/templates/NyIFlgmFD",
  local: `${internalMockRoute}/serie1.json`,
  contentType: "application/json"
}, {
  path: `${apiRoute}/v1/source/2`,
  url: "https://s3.amazonaws.com/logtrust-static/test/test/data2.json",
  mock: "https://next.json-generator.com/api/templates/VkfFWxQtP",
  local: `${internalMockRoute}/serie2.json`,
  contentType: "application/json"
}, {
  path: `${apiRoute}/v1/source/3`,
  url: "https://s3.amazonaws.com/logtrust-static/test/test/data3.json",
  mock: "https://next.json-generator.com/api/templates/4ystfemFw",
  local: `${internalMockRoute}/serie3.json`,
  contentType: "application/json"
}];

const apiRoutesMapping = apiRoutes.reduce((mapping, route) => {
  mapping[route.path] = route;
  return mapping;
}, {});

function makeGetRequest(url) {
  return new Promise((resolve, reject) => {
    httpModule.get(url, (resp) => {
      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        resolve(JSON.parse(data));
      });

    }).on("error", (err) => {
      reject(err.message);
    });
  })
}


module.exports = ({ url, response }) => {
  const self = {
    route: null,
    url: url
  };

  return {
    self,
    isSatisfied: () => new Promise((resolve, reject) => {
      self.route = apiRoutesMapping[self.url];
      const ok = !!self.route;
      if (ok) resolve();
      else reject();
    }),
    action: () => {
      makeGetRequest(self.route.mock)
        .then((content) => {
          response.writeHead(200, { "Content-Type": self.route.contentType });
          response.end(content.generateJSON, "utf-8");
        });
    }
  };
};
