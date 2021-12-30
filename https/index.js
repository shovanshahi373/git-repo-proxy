const { githubStatic, github } = require("./githubClient");

module.exports = {
  githubAPIClient: github,
  githubStaticClient: githubStatic,
};
