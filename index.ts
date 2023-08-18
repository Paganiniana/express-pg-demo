import Express from "express";
import frontend from "./endpoints/app";
import crud from "./endpoints/crud";

const app = Express();
const port = 8000;

app.use('/app', frontend);
app.use('/api', crud);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});