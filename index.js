require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3000

const {auth: login, verify: verifyToken} = require('./middlewares')

// using middlewares
app.use(bodyParser.json())
app.use(cookieParser());

// initial get path
app.get('/', verifyToken, (req, res) => {
  res.send('Hello World!')
})

// get date info path
app.post('/Get_date_info', verifyToken, (req, res) => {
  console.log('req params : ', req.body);
  res.send('Get_date_info path called ');
})

// get state info path
app.post('/Get_state_info', verifyToken, (req, res) => {
  console.log('req params : ', req.body);
  res.send('Get_date_info path called ');
})

// Pinpoint state info path
app.post('/Pinpoint_state', verifyToken, (req, res) => {
  console.log('req params : ', req.body);
  res.send('Get_date_info path called ');
})

// user login path
app.post('/login', login);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})