import Express from "express";
import crud from "./endpoints/crud";
import path from "node:path";

const app = Express();
const port = 8000;

app.use(Express.json()); // use json body middleware
app.use('/api', crud);
app.use('/awesome/applicant', Express.static(path.join(__dirname, 'frontend/dist')));
app.use('/', Express.static(path.join(__dirname, 'frontend/dist')));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});