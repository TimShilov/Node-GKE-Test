const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();
app.use(morgan('tiny'));

app.get('*', (req, res) => {
  res.send('Hello Kube');
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
