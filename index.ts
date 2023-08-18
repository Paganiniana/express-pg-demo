import Express from "express";
import { getConnection, PersonalInformation } from "./db";

const app = Express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});