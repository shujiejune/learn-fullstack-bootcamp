import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "shujie_C/0630",
  port: "5432"
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function handleVisited() {
  const visited = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  visited.rows.forEach(row => {
    countries.push(row.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await handleVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const new_country = req.body["country"];
  const ret_table = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [new_country]);
  const new_country_code = ret_table.rows[0].country_code;
  await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [new_country_code]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
