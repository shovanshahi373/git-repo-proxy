const { githubAPIClient } = require("../../https");

const allowed_sort = ["stars", "forks", "updated"];
const allowed_per_page = [10, 25, 50];

// "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",

// sort can be stars, forks or updated:

//get readme contents
//https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md

const getAll = async (req, res) => {
  let { search, page = 1, per_page = 10, sort } = req.query;
  if (!allowed_per_page.some((n) => n == per_page)) {
    per_page = 10;
  }
  const params = { q: search, per_page: per_page, page: page };
  if (sort && allowed_sort.some((s) => s === sort)) {
    params.sort = sort;
  }
  try {
    console.log(githubAPIClient.defaults);
    const response = await githubAPIClient.get("/search/repositories", {
      params: params,
    });
    const data = await response.data;
    const total = data.total_count;
    const items = data.items.map(
      ({
        name,
        owner: { login, repos_url },
        stargazers_count,
        watchers_count,
        forks,
        description,
        updated_at,
      }) => {
        return {
          repo: {
            name: name,
            url: repos_url,
          },
          author: {
            name: login,
          },
          stars: stargazers_count,
          watchers: watchers_count,
          forks: forks,
          description: description,
          last_updated: updated_at,
        };
      }
    );
    res.status(200).json({ data: { total, items } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOne = async (req, res) => {
  const { author, repo } = req.params;
  try {
    if (!author || !repo) {
      throw new Error("insufficient data provided!");
    }
    const response = await githubAPIClient.get(`/repos/${author}/${repo}`);
    const data = await response.data;
    const { full_name, name, open_issues_count, default_branch } = data;
    const responseData = {
      full_name: full_name,
      name,
      open_issues_count,
      default_branch,
    };
    res.status(200).json({ data: responseData });
  } catch (err) {
    res.json(400).json({ err: err.message });
  }
};

module.exports = {
  getAll,
  getOne,
};
