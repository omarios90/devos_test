const StaticSpec = require("./staticSpec");
const ApiSpec = require("./apiSpec");

module.exports = ({ url, response }) => {
  const self = {
    apiSpec: ApiSpec({ url, response }),
    staticSpec: null
  };

  return {
    self,
    isSatisfied: () => new Promise((resolve, reject) => {
      self.apiSpec.isSatisfied()
        .then(() => {
          self.staticSpec = StaticSpec({
            url: self.apiSpec.self.route.local,
            basePath: "",
            response
          });
          self.staticSpec.isSatisfied()
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    }),
    action: () => {
      self.staticSpec.action();
    }
  };
};
