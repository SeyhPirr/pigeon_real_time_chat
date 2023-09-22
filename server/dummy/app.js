const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());

app.post("/login", (req, res) => {
  res.set("Set-cookie", `sesssssssion=123sssss123`);
  res.send("succes");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
