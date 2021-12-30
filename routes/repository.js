const router = require("express").Router();
const { RepositoryController } = require("../controllers");

router.get("/search", RepositoryController.getAll);
router.get("/:author/:repo", RepositoryController.getOne);

module.exports = router;
