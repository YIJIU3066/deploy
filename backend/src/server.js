// import cors from 'cors';
// import db from './db';
// import express from 'express';
// import routes from '../routes';


// const app = express();
// app.use(cors());
// app.use(express.json());


// db.connent();


// const port = process.env.PORT || 4000;
// app.listen(port, () =>
//   console.log(`Example app listening on port ${port}!`),
// );


// app.use('/', routes);


import path from "path";

import express from "express";
import cors from "cors";

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


const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

