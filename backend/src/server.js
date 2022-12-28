import db from './db';
import routes from '../routes';
import path from "path";
import express from "express";
import cors from "cors";

db.connent();

const app = express();
if (process.env.NODE_ENV === "development") {
	app.use(cors());
}

app.get("/api", (req,res) => {
  console.log("GET / api");
  res.send({ message: "Hello from the server!"}).status(200)
})


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}


app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 4000;

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);