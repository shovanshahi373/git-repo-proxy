const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
const { RepositoryRouter, RawContentRouter } = require("./routes");

app.use(express.json());

app.use("/api/repositories", RepositoryRouter);
app.use("/api/raw", RawContentRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`> listening on port ${PORT}`));
