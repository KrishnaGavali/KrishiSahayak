// index.js
import express from "express";
import type { Request, Response } from "express";
const app = express();
const port = "5000";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
