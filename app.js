const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./db');

require('dotenv').config()

const userRouters = require('./routers/user')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS);
  res.setHeader('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS);
  next();
})

app.use('/user', userRouters)

sequelize.sync().then(result => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}).catch(err => {
  console.log(err)
})