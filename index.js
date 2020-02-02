const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  const lines = [
    'Hello Kubernetes! :-]',
    `Hostname: ${process.env.HOSTNAME}`,
  ];

  fs.writeFileSync(path.join('./', 'storage', `${new Date().toISOString().split('T')}-${process.env.HOSTNAME}`), '');

  fs.readdirSync(path.join(__dirname, 'storage')).forEach((file) => {
    lines.push(file);
  });
  res.send(
    `<pre>${lines.join('\n')}</pre>`,
  );
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
