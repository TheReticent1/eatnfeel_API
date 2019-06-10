const mongoose = require("mongoose");

const table = mongoose.Schema({
  tableNo: { type: Number, unique: true, required: true },
  totalSeat: { type: Number, required: true },
  status: { type: String, default: null },
  allocateTime: { type: String, default: null },
  userId: { type: String, default: null },
  name: { type: String, default: null },
  mobile: { type: Number, default: null },
  bookSeat:{ type: Number, default:null}
});

module.exports = mongoose.model("table", table);