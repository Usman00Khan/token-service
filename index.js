'use strict';

var Config = require("./hack-mindpalace.js");
const fs = require('fs');
// var Config = {};

// const setup = async () => {
//   let rawdata = fs.readFileSync('.\\hack-mindpalace.json');
//   Config = JSON.parse(rawdata);
//   console.log(Config);
// }

var express = require('express')
const googleAuth = require('google-oauth-jwt');
const cors = require('cors');

const getToken = async () => {
  return new Promise((resolve) => {
    googleAuth.authenticate(
      {
        email: Config.client_email,
        key: Config.private_key,
        scopes: ['https://www.googleapis.com/auth/cloud-platform',
          'https://www.googleapis.com/auth/dialogflow'],
      },
      (err, token) => {
        resolve(token);
      },
    );
  });
}
const app = express();
app.all('/token', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 app.get('/token',  async (req, res,next) => {
    // await setup();
    let token = await getToken();
    res.send({ token });
})

app.listen(8080, () => console.log("listening on port 8080"));