const router = require("express").Router();
const { RawContentController } = require("../controllers");

router.get("/readme/:author/:repo", RawContentController.getReadMe);

module.exports = router;
