const dotenv = require("dotenv");
dotenv.config();

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_SCRETE_KEY
});
module.exports = nexmo;