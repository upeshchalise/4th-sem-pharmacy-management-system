import express, { Request, Response } from "express";
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("this is the setup");
});

app.use("/users", require("./routes/user.route"));
// app.use("/users", alluser);
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
