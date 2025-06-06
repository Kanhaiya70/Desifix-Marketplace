import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("Hello World!");
});


app.listen(5050, () => {
  console.log(`Server is running on port http://localhost:5050`);
});
