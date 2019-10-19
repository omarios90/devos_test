const ApiSpec = require("../specs/apiSpecLocal");
const StaticSpec = require("../specs/staticSpec");

module.exports = (url, response) => {
  const params = { url, response };
  const apiSpec = ApiSpec(params);
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
