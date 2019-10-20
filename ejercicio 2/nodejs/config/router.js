const ApiSpec = require("../specs/apiSpec");
const ApiSpecLocal = require("../specs/apiSpecLocal"); // si se quiere usar los mocks
const StaticSpec = require("../specs/staticSpec");

module.exports = (url, response) => {
  const params = { url, response };
  const apiSpec = ApiSpecLocal(params);
  const staticSpec = StaticSpec(params);

  staticSpec.isSatisfied()
    .then(() => staticSpec.action())
    .catch(() => apiSpec.isSatisfied()
      .then(() => apiSpec.action())
      .catch(() => {
        response.writeHead(404);
        response.end();
      })
    );
};
