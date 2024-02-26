import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("this is the setup");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
