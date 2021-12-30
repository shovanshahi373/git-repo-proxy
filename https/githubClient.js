const { default: axios } = require("axios");

const github = axios.create({
  baseURL: process.env.GITHUB_API_URL,
  headers: {
    Accept: "application/vnd.GitHub.v3+json",
  },
});

const githubStatic = axios.create({
  baseURL: process.env.GITHUB_RAW,
  headers: {
    Accept: "text/plain",
  },
});

module.exports = {
  github,
  githubStatic,
};
