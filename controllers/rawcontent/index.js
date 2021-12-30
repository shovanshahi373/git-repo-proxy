const { githubStaticClient } = require("../../https");

const getReadMe = async (req, res) => {
  const { author, repo } = req.params;
  const { branch = "master" } = req.query;
  try {
    const mdFile = await githubStaticClient.get(
      `/${author}/${repo}/${branch}/README.md`
    );
    const data = await mdFile.data;
    console.log("file", data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getReadMe,
};
