import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var numLetters = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if (input) {
    res.render(`There are letters in your name.`);
  }
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  numLetters = req.body["fname"].length + req.body["lname"].length;
  res.render("index.ejs", { numOfLetters: numLetters });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
