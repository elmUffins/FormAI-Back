import express from "express";
const app = express();
const port = 3000;

import users from "./controllers/users.js"

app.use(express.json());

app.get("/", (_, res) => {
    res.send("1");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});